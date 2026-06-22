const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const url = require('url');

const SOURCES = [
  { url: "https://iptv-org.github.io/iptv/countries/bd.m3u",   country: "Bangladesh",   flag: "🇧🇩", region: "asia" },
  { url: "https://iptv-org.github.io/iptv/countries/in.m3u",   country: "India",        flag: "🇮🇳", region: "asia" },
  { url: "https://iptv-org.github.io/iptv/countries/pk.m3u",   country: "Pakistan",     flag: "🇵🇰", region: "asia" },
  { url: "https://iptv-org.github.io/iptv/countries/ae.m3u",   country: "UAE",          flag: "🇦🇪", region: "middleeast" },
  { url: "https://iptv-org.github.io/iptv/countries/sa.m3u",   country: "Saudi Arabia", flag: "🇸🇦", region: "middleeast" },
  { url: "https://iptv-org.github.io/iptv/countries/qa.m3u",   country: "Qatar",        flag: "🇶🇦", region: "middleeast" },
  { url: "https://iptv-org.github.io/iptv/countries/eg.m3u",   country: "Egypt",        flag: "🇪🇬", region: "middleeast" },
  { url: "https://iptv-org.github.io/iptv/countries/tr.m3u",   country: "Turkey",       flag: "🇹🇷", region: "europe" },
  { url: "https://iptv-org.github.io/iptv/countries/ng.m3u",   country: "Nigeria",      flag: "🇳🇬", region: "africa" },
  { url: "https://iptv-org.github.io/iptv/countries/ke.m3u",   country: "Kenya",        flag: "🇰🇪", region: "africa" },
  { url: "https://iptv-org.github.io/iptv/countries/us.m3u",   country: "USA",          flag: "🇺🇸", region: "americas" },
  { url: "https://iptv-org.github.io/iptv/countries/mx.m3u",   country: "Mexico",       flag: "🇲🇽", region: "americas" },
  { url: "https://iptv-org.github.io/iptv/countries/br.m3u",   country: "Brazil",       flag: "🇧🇷", region: "americas" },
  { url: "https://iptv-org.github.io/iptv/categories/sports.m3u", country: "World",     flag: "🌍", region: "sports" }
];

const BAD_URL_PATTERNS = ["error.com", "localhost", "example.com", "default.url", "pro.com", "error.m3u8", "invalid", "192.168.", "127.0.0"];
const WC_KEYWORDS = ["beinsport", "bein sport", "supersport", "tsport", "gazi", "world cup", "fifa", "al jazeera", "aljazeera", "bbc", "itv", "fox sport", "globo", "btv"];

function parseM3U(text, source) {
  const lines = text.split(/\r?\n/);
  const channels = [];
  let infoLine = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("#EXTINF")) {
      infoLine = line;
    } else if (infoLine && line.length > 0 && !line.startsWith("#")) {
      const u = line.trim();
      if (BAD_URL_PATTERNS.some(p => u.toLowerCase().includes(p)) || !u.startsWith("http")) {
        infoLine = "";
        continue;
      }

      const nameMatch = infoLine.match(/,(.+)$/);
      const logoMatch = infoLine.match(/tvg-logo="([^"]+)"/);
      const groupMatch = infoLine.match(/group-title="([^"]+)"/);
      const idMatch = infoLine.match(/tvg-id="([^"]+)"/);

      const rawName = nameMatch ? nameMatch[1].trim() : "Unknown";
      const logo = logoMatch ? logoMatch[1] : undefined;
      const group = groupMatch ? groupMatch[1].toLowerCase() : "";
      const tvgId = idMatch ? idMatch[1] : "";

      let quality;
      if (rawName.includes("1080p") || rawName.includes("FHD")) quality = "1080p";
      else if (rawName.includes("720p") || rawName.includes("HD")) quality = "720p";
      else if (rawName.includes("480p") || rawName.includes("SD")) quality = "480p";

      const name = rawName.replace(/\s*\(?(?:1080|720|480|360|240)p\)?/gi, "").trim();
      const id = `dyn_${tvgId || name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase().substring(0, 30)}_${channels.length}`;
      let region = source.region;
      if (source.url.includes("categories/sports")) region = "sports";

      const lowerName = name.toLowerCase();
      const isWorldCup = WC_KEYWORDS.some(kw => lowerName.includes(kw));

      channels.push({
        id, name, flag: source.flag, country: source.country,
        region, url: u, logo, group, quality, isWorldCup: isWorldCup || undefined
      });
      infoLine = "";
    }
  }
  return channels;
}

function checkUrl(targetUrl) {
  return new Promise((resolve) => {
    try {
      const parsed = url.parse(targetUrl);
      const client = parsed.protocol === 'https:' ? https : http;
      
      const options = {
        method: 'GET', // Some servers block HEAD, GET with a small response stream is safer
        host: parsed.hostname,
        path: parsed.path,
        port: parsed.port,
        headers: {
          'Range': 'bytes=0-100', // Request only first few bytes to save bandwidth
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        timeout: 3000
      };

      const req = client.request(options, (res) => {
        req.destroy(); // Abort once headers are received
        resolve({ statusCode: res.statusCode, working: res.statusCode >= 200 && res.statusCode < 400 });
      });

      req.on('error', () => resolve({ statusCode: 0, working: false }));
      req.on('timeout', () => { req.destroy(); resolve({ statusCode: 0, working: false }); });
      req.end();
    } catch (e) {
      resolve({ statusCode: 0, working: false });
    }
  });
}

// Concurrency pool runner
async function checkInBatches(channels, batchSize = 100) {
  const working = [];
  console.log(`Checking ${channels.length} channels in batches of ${batchSize}...`);
  
  for (let i = 0; i < channels.length; i += batchSize) {
    const batch = channels.slice(i, i + batchSize);
    const promises = batch.map(async (ch) => {
      const res = await checkUrl(ch.url);
      if (res.working) {
        working.push(ch);
      }
    });
    
    await Promise.all(promises);
    console.log(`Progress: ${Math.min(i + batchSize, channels.length)}/${channels.length} checked. Found ${working.length} working.`);
  }
  
  return working;
}

async function run() {
  const allChannels = [];
  const seenUrls = new Set();
  
  console.log("Fetching M3U playlists...");
  for (const src of SOURCES) {
    try {
      const res = await new Promise((resolve, reject) => {
        const parsed = url.parse(src.url);
        const client = parsed.protocol === 'https:' ? https : http;
        client.get(src.url, (r) => {
          let data = "";
          r.on('data', chunk => data += chunk);
          r.on('end', () => resolve(data));
        }).on('error', reject);
      });
      const parsed = parseM3U(res, src);
      for (const ch of parsed) {
        if (!seenUrls.has(ch.url)) {
          seenUrls.add(ch.url);
          allChannels.push(ch);
        }
      }
    } catch (e) {
      console.error(`Failed to fetch ${src.country}: ${e.message}`);
    }
  }

  console.log(`Loaded ${allChannels.length} unique raw channels. Starting verification...`);
  const workingChannels = await checkInBatches(allChannels, 120);
  
  console.log(`Verification completed! Found ${workingChannels.length} working channels.`);
  
  const destDir = path.join(__dirname, '..', 'src', 'lib');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  const destPath = path.join(destDir, 'working_channels.json');
  fs.writeFileSync(destPath, JSON.stringify({
    channels: workingChannels,
    updatedAt: new Date().toISOString()
  }, null, 2));
  
  console.log(`Saved verified list to ${destPath}`);
}

run().catch(console.error);
