// Scrape GPTV website to find real channel ID mappings
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

async function get(url, ref) {
  const h = { 'User-Agent': UA, 'Accept': 'text/html,application/json,*/*' };
  if (ref) { h['Referer'] = ref; h['Origin'] = new URL(ref).origin; }
  const ctrl = new AbortController(); setTimeout(() => ctrl.abort(), 10000);
  const r = await fetch(url, { headers: h, signal: ctrl.signal });
  return { status: r.status, text: await r.text(), headers: Object.fromEntries(r.headers) };
}

async function testStream(id) {
  try {
    const ctrl = new AbortController(); setTimeout(() => ctrl.abort(), 5000);
    const r = await fetch(`https://owrcovcrpy.gpcdn.net/bpk-tv/${id}/output/index.m3u8`, {
      headers: { 'Referer': 'https://www.gptv.com.bd/', 'User-Agent': UA },
      signal: ctrl.signal
    });
    if (!r.ok) return null;
    const t = await r.text();
    const sub = t.split('\n').find(l => l.trim() && !l.startsWith('#'));
    if (!sub) return null;
    const subUrl = sub.startsWith('http') ? sub.trim() : `https://owrcovcrpy.gpcdn.net/bpk-tv/${id}/output/${sub.trim()}`;
    const ctrl2 = new AbortController(); setTimeout(() => ctrl2.abort(), 5000);
    const r2 = await fetch(subUrl, { headers: { 'Referer': 'https://www.gptv.com.bd/', 'User-Agent': UA }, signal: ctrl2.signal });
    const t2 = await r2.text();
    const drm = t2.includes('SAMPLE-AES') || t2.includes('irdeto') || t2.includes('skd://');
    return drm ? 'DRM' : 'OPEN';
  } catch { return null; }
}

(async () => {
  console.log('=== Scraping GPTV website for channel info ===\n');
  
  // Try the main page
  try {
    const main = await get('https://www.gptv.com.bd');
    console.log('Main page status:', main.status);
    const html = main.text;
    
    // Find any JSON data or channel references
    const bpkIds = [...html.matchAll(/bpk-tv\/(\d+)/g)].map(m => m[1]);
    console.log('bpk-tv IDs found in page:', [...new Set(bpkIds)]);
    
    // Look for channel name + number combos
    const snippets = [];
    const chNames = ['T Sports', 'BTV Sports', 'Gazi', 'GTV', 'BTV National', 'Channel I', 'Bangla Vision'];
    for (const name of chNames) {
      const idx = html.toLowerCase().indexOf(name.toLowerCase());
      if (idx >= 0) {
        snippets.push({ name, ctx: html.substring(Math.max(0,idx-50), idx+150).replace(/\s+/g, ' ') });
      }
    }
    snippets.forEach(s => console.log(`\n[${s.name}]: ${s.ctx}`));
    
    // Try to find JSON embedded in page
    const jsonMatch = html.match(/window\.__NEXT_DATA__\s*=\s*({.+?})\s*<\/script>/s) ||
                      html.match(/var\s+channels\s*=\s*(\[.+?\])\s*[;<]/s);
    if (jsonMatch) {
      console.log('\nFound embedded JSON data!');
      try {
        const data = JSON.parse(jsonMatch[1]);
        console.log(JSON.stringify(data).substring(0, 500));
      } catch {}
    }
  } catch (e) {
    console.log('Main page error:', e.message);
  }

  // Try API endpoints
  console.log('\n=== Testing GPTV API endpoints ===');
  const apis = [
    'https://www.gptv.com.bd/api/channels',
    'https://www.gptv.com.bd/api/v1/channels',
    'https://api.gptv.com.bd/channels',
    'https://www.gptv.com.bd/live-tv',
    'https://www.gptv.com.bd/channels',
    'https://panel.gptv.com.bd/api/channels',
    'https://admin.gptv.com.bd/api/channels',
  ];
  for (const api of apis) {
    try {
      const r = await get(api, 'https://www.gptv.com.bd/');
      if (r.status === 200) {
        console.log(`\n✅ ${api} => 200`);
        const ct = r.headers['content-type'] || '';
        if (ct.includes('json')) {
          console.log('JSON:', r.text.substring(0, 800));
        } else {
          // Look for channel IDs in HTML
          const ids = [...r.text.matchAll(/bpk-tv\/(\d+)/g)].map(m => m[1]);
          console.log('IDs found:', [...new Set(ids)]);
          // T Sports mentions
          const idx = r.text.toLowerCase().indexOf('t sport');
          if (idx >= 0) console.log('Context:', r.text.substring(idx-30, idx+120).replace(/\s+/g,' '));
        }
      } else {
        console.log(`${r.status} ${api}`);
      }
    } catch (e) {
      console.log(`ERR ${api}: ${e.message.substring(0,40)}`);
    }
  }
  
  // Now try fetching the GPTV Android/web app source or embed page
  console.log('\n=== Checking for T Sports embed page ===');
  const embeds = [
    'https://www.gptv.com.bd/tsports',
    'https://www.gptv.com.bd/t-sports',
    'https://www.gptv.com.bd/channel/tsports',
    'https://www.gptv.com.bd/watch/1719',
    'https://www.gptv.com.bd/watch/1726',
    'https://www.gptv.com.bd/watch/tsports',
  ];
  for (const url of embeds) {
    try {
      const r = await get(url);
      if (r.status < 400) {
        const ids = [...r.text.matchAll(/bpk-tv\/(\d+)/g)].map(m => m[1]);
        console.log(`✅ ${url} => ${r.status} | IDs: ${[...new Set(ids)]}`);
      } else {
        console.log(`${r.status} ${url}`);
      }
    } catch (e) {
      console.log(`ERR ${url}`);
    }
  }
})();
