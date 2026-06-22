// Test all discovered real channels including T Sports and GTV from aynaott
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

async function testFull(name, url, referer) {
  try {
    const h = { 'User-Agent': UA, 'Accept': '*/*' };
    if (referer) { h['Referer'] = referer; h['Origin'] = new URL(referer).origin; }
    const ctrl = new AbortController(); setTimeout(() => ctrl.abort(), 8000);
    const r = await fetch(url, { headers: h, signal: ctrl.signal });
    if (!r.ok) { console.log(`[${r.status}] ${name}`); return; }
    const t = await r.text();
    const valid = t.includes('#EXTM3U') || t.includes('#EXTINF') || t.includes('BANDWIDTH');
    const drm = t.includes('SAMPLE-AES') || t.includes('irdeto') || t.includes('skd://');
    if (!valid) { console.log(`[EMPTY] ${name}`); return; }
    if (drm) { console.log(`[🔒DRM] ${name}`); return; }
    
    const sub = t.split('\n').find(l => l.trim() && !l.startsWith('#'));
    const isMaster = sub && sub.includes('m3u8');
    
    if (isMaster) {
      // Check sub-playlist
      const subUrl = sub.startsWith('http') ? sub.trim() : new URL(sub.trim(), url).href;
      try {
        const ctrl2 = new AbortController(); setTimeout(() => ctrl2.abort(), 5000);
        const r2 = await fetch(subUrl, { headers: h, signal: ctrl2.signal });
        const t2 = await r2.text();
        const drm2 = t2.includes('SAMPLE-AES') || t2.includes('irdeto') || t2.includes('skd://');
        if (drm2) { console.log(`[DRM-sub] ${name}`); return; }
        const seg = t2.split('\n').find(l => l.trim() && !l.startsWith('#') && l.includes('.ts'));
        console.log(`[✅ WORKS] ${name}`);
        console.log(`   URL: ${url}`);
        if (seg) console.log(`   Seg: ${seg.substring(0,80)}`);
      } catch(e) { console.log(`[✅ OPEN] ${name} (sub-check failed but master ok)`); console.log(`   URL: ${url}`); }
    } else {
      // Direct segment playlist
      const seg = t.split('\n').find(l => l.trim() && !l.startsWith('#') && l.includes('.ts'));
      console.log(`[✅ WORKS] ${name} (direct segments)`);
      console.log(`   URL: ${url}`);
      if (seg) console.log(`   Seg: ${seg.substring(0,80)}`);
    }
  } catch(e) { console.log(`[TO] ${name}: ${e.message.substring(0,50)}`); }
}

(async () => {
  const ref = 'https://aynaott.com/';
  const ref2 = 'https://bozztv.com/';
  
  console.log('=== T SPORTS & GTV (from iptv-org verified sources) ===');
  await testFull('T Sports HD (aynaott tvsen7)', 'https://tvsen7.aynaott.com/tsports-hd/index.m3u8', ref);
  await testFull('T Sports FHD (aynaott tvsen7)', 'https://tvsen7.aynaott.com/tsportsfhd/index.m3u8', ref);
  await testFull('GTV (aynaott tvsen5)', 'https://tvsen5.aynaott.com/Ravc7gPCZpxk/index.m3u8', ref);
  
  console.log('\n=== BTV (Official govt stream from btvlive.gov.bd) ===');
  await testFull('BTV National (official govt)', 'https://www.btvlive.gov.bd/streams/ef8b8bbc-98b7-4ba7-a49d-a0adaf259d35/ES/355ba051-9a60-48aa-adcf-5a6c64da8c5c/355ba051-9a60-48aa-adcf-5a6c64da8c5c_3_playlist.m3u8');
  await testFull('BTV World (official govt)', 'https://www.btvlive.gov.bd/streams/ef8b8bbc-98b7-4ba7-a49d-a0adaf259d35/ES/d96eb7f4-83c2-4472-9597-3568390a8ebf/d96eb7f4-83c2-4472-9597-3568390a8ebf_3_playlist.m3u8');
  await testFull('BTV National (aynaott)', 'https://tvsen6.aynaott.com/btvhd/index.m3u8', ref);
  await testFull('BTV World (aynaott)', 'https://tvsen6.aynaott.com/btv_world/index.m3u8', ref);
  await testFull('BTV National (GPCDN 1709)', 'https://owrcovcrpy.gpcdn.net/bpk-tv/1709/output/index.m3u8', 'https://www.gptv.com.bd/');
  
  console.log('\n=== VERIFIED CORRECT GPCDN IDs (from iptv-org) ===');
  // Now we know the REAL IDs
  await testFull('News 24 (GPCDN 1708 - CORRECT)', 'https://owrcovcrpy.gpcdn.net/bpk-tv/1708/output/index.m3u8', 'https://www.gptv.com.bd/');
  await testFull('Somoy TV (GPCDN 1702)', 'https://owrcovcrpy.gpcdn.net/bpk-tv/1702/output/index.m3u8', 'https://www.gptv.com.bd/');
  await testFull('Channel 24 (GPCDN 1703)', 'https://owrcovcrpy.gpcdn.net/bpk-tv/1703/output/index.m3u8', 'https://www.gptv.com.bd/');
  await testFull('Independent TV (GPCDN 1704)', 'https://owrcovcrpy.gpcdn.net/bpk-tv/1704/output/index.m3u8', 'https://www.gptv.com.bd/');
  await testFull('Ekattor TV (GPCDN 1705)', 'https://owrcovcrpy.gpcdn.net/bpk-tv/1705/output/index.m3u8', 'https://www.gptv.com.bd/');
  await testFull('ATN News (GPCDN 1706)', 'https://owrcovcrpy.gpcdn.net/bpk-tv/1706/output/index.m3u8', 'https://www.gptv.com.bd/');
  await testFull('NTV (GPCDN 1716)', 'https://owrcovcrpy.gpcdn.net/bpk-tv/1716/output/index.m3u8', 'https://www.gptv.com.bd/');
  await testFull('Maasranga (GPCDN 1722 - previously called Jamuna TV incorrectly!)', 'https://owrcovcrpy.gpcdn.net/bpk-tv/1722/output/index.m3u8', 'https://www.gptv.com.bd/');
  
  console.log('\n=== bozztv.com verified channels ===');
  await testFull('Ananda TV (bozztv)', 'https://bozztv.com/rongo/rongo-AnandaTV/index.m3u8', ref2);
  await testFull('ATN News (bozztv)', 'https://bozztv.com/rongo/rongo-ATNNews/index.m3u8', ref2);
  await testFull('Channel 24 (bozztv)', 'https://bozztv.com/rongo/rongo-Channel24HD/index.m3u8', ref2);
  await testFull('Desh TV (bozztv)', 'https://bozztv.com/rongo/rongo-DeshTV/index.m3u8', ref2);
  await testFull('Jamuna TV (bozztv)', 'https://bozztv.com/rongo/rongo-JamunaTelevision/index.m3u8', ref2);
  await testFull('Somoy TV (bozztv)', 'https://bozztv.com/rongo/rongo-somoy/index.m3u8', ref2);
  await testFull('RTV (bozztv)', 'https://bozztv.com/rongo/rongo-RTV/index.m3u8', ref2);

  console.log('\nDone.');
})();
