// Fetch from iptv-org GitHub repo which has verified streams for BD channels
// Also try Toffee (official BD OTT) public embed links
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

async function get(url) {
  const ctrl = new AbortController(); setTimeout(() => ctrl.abort(), 10000);
  const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': '*/*' }, signal: ctrl.signal });
  return { status: r.status, text: await r.text() };
}

async function testM3U8(name, url, referer) {
  try {
    const h = { 'User-Agent': UA, 'Accept': '*/*' };
    if (referer) { h['Referer'] = referer; h['Origin'] = new URL(referer).origin; }
    const ctrl = new AbortController(); setTimeout(() => ctrl.abort(), 8000);
    const r = await fetch(url, { headers: h, signal: ctrl.signal });
    if (!r.ok) { console.log(`[${r.status}] ${name}`); return; }
    const t = await r.text();
    const valid = t.includes('#EXTM3U') || t.includes('#EXTINF') || t.includes('BANDWIDTH');
    const drm = t.includes('SAMPLE-AES') || t.includes('irdeto') || t.includes('skd://') || t.includes('akamai_token');
    
    if (!valid) { console.log(`[EMPTY] ${name}`); return; }
    if (drm) { console.log(`[🔒DRM] ${name} => ${url.substring(0,65)}`); return; }
    
    // Check sub-playlist for DRM
    const sub = t.split('\n').find(l => l.trim() && !l.startsWith('#'));
    if (sub && sub.includes('m3u8')) {
      const subUrl = sub.startsWith('http') ? sub.trim() : new URL(sub.trim(), url).href;
      try {
        const ctrl2 = new AbortController(); setTimeout(() => ctrl2.abort(), 5000);
        const r2 = await fetch(subUrl, { headers: h, signal: ctrl2.signal });
        const t2 = await r2.text();
        const drm2 = t2.includes('SAMPLE-AES') || t2.includes('irdeto') || t2.includes('skd://');
        if (drm2) { console.log(`[DRM-sub] ${name} => ${url.substring(0,65)}`); return; }
        const seg = t2.split('\n').find(l => l.trim() && !l.startsWith('#'));
        console.log(`[✅ OPEN] ${name}`);
        console.log(`   URL: ${url}`);
        if (seg) console.log(`   Seg: ${seg.substring(0,70)}`);
      } catch { console.log(`[✅ OPEN?] ${name} => ${url.substring(0,65)}`); }
    } else {
      console.log(`[✅ OPEN] ${name}`);
      console.log(`   URL: ${url}`);
    }
  } catch (e) { console.log(`[TO] ${name}: ${e.message.substring(0,40)}`); }
}

(async () => {
  // Step 1: Fetch official iptv-org Bangladesh playlist
  console.log('=== iptv-org BD channels playlist ===');
  try {
    const r = await get('https://raw.githubusercontent.com/iptv-org/iptv/master/streams/bd.m3u');
    console.log('Status:', r.status, '| Length:', r.text.length);
    if (r.status === 200) {
      const lines = r.text.split('\n');
      let cur = '';
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('#EXTINF')) {
          cur = lines[i];
        } else if (lines[i].trim() && !lines[i].startsWith('#')) {
          const name = cur.match(/tvg-name="([^"]+)"/)?.[1] || cur.match(/,(.+)/)?.[1] || 'Unknown';
          console.log(`  Channel: ${name.trim()}`);
          console.log(`  URL: ${lines[i].trim()}`);
        }
      }
    }
  } catch(e) { console.log('iptv-org error:', e.message); }

  // Step 2: Test Toffee (official Bangladesh streaming - T Sports, GTV, BTV etc)
  console.log('\n=== Toffee OTT (Official BD - T Sports, GTV, BTV) ===');
  const toffeeUrls = [
    ['T Sports (Toffee/CloudFront)', 'https://d3l3aofavop51q.cloudfront.net/tsports/index.m3u8'],
    ['T Sports HD (Toffee)', 'https://d3l3aofavop51q.cloudfront.net/tsportshd/index.m3u8'],
    ['BTV Sports (Toffee)', 'https://d3l3aofavop51q.cloudfront.net/btvsports/index.m3u8'],
    ['GTV (Toffee)', 'https://d3l3aofavop51q.cloudfront.net/gtv/index.m3u8'],
    ['Toffee API T Sports', 'https://binge.buzz/live/tsports/stream.m3u8'],
    ['Toffee API GTV', 'https://binge.buzz/live/gtv/stream.m3u8'],
  ];
  for (const [name, url] of toffeeUrls) {
    await testM3U8(name, url);
  }

  // Step 3: Try direct CDN endpoints for each channel
  console.log('\n=== Direct CDN testing for BD sports ===');
  const directUrls = [
    ['T Sports (media.tsports.com.bd)', 'https://media.tsports.com.bd/live/stream.m3u8'],
    ['T Sports (cdn.tsports)', 'https://cdn.tsports.com.bd/hls/tsports.m3u8'],
    ['T Sports (gbplayer)', 'https://gbplayer.cc/live/tsports.m3u8', 'https://gbplayer.cc/'],
    ['T Sports (gbplayer HD)', 'https://gbplayer.cc/live/tsportshd.m3u8', 'https://gbplayer.cc/'],
    ['BTV Sports (btvonline)', 'https://streaming.btvonline.com.bd/btvs/stream.m3u8'],
    ['BTV Sports (cdn)', 'https://cdn.btvonline.com.bd/btvs/live/stream.m3u8'],
    ['GTV (gazitv)', 'https://stream.gazitv.com.bd/live/gtv.m3u8'],
    ['GTV (aynaott)', 'https://aynaott.com/live/gtv/stream.m3u8', 'https://aynaott.com/'],
    ['GTV (aynaott CDN)', 'https://cdn.aynaott.com/live/gtv/playlist.m3u8', 'https://aynaott.com/'],
  ];
  for (const args of directUrls) {
    await testM3U8(...args);
  }

  // Step 4: Try StreamAsia / known BD IPTV aggregators
  console.log('\n=== BD IPTV aggregators ===');
  const aggUrls = [
    ['T Sports (bozztv)', 'https://bozztv.com/tsports/stream.m3u8', 'https://bozztv.com/'],
    ['GTV (bozztv)', 'https://bozztv.com/gtv/stream.m3u8', 'https://bozztv.com/'],
    ['BTV Sports (bozztv)', 'https://bozztv.com/btvsports/stream.m3u8', 'https://bozztv.com/'],
    ['T Sports (deshiiptv)', 'https://deshiiptv.com/live/tsports.m3u8'],
    ['T Sports (bdlive)', 'https://bdlive.me/live/tsports.m3u8'],
    ['T Sports (streameast)', 'https://streameast.to/stream/tsports.m3u8'],
  ];
  for (const args of aggUrls) {
    await testM3U8(...args);
  }
  
  console.log('\nDone.');
})();
