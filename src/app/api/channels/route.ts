import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// ─────────────────────────────────────────────────────────────────────────────
//  /api/channels  — Live channel loader from iptv-org GitHub playlists
//  Fetches multiple M3U playlists in parallel, parses them, returns JSON
//  Cached for 5 minutes via Cache-Control
// ─────────────────────────────────────────────────────────────────────────────

export const runtime = "nodejs";

interface ParsedChannel {
  id: string;
  name: string;
  flag: string;
  country: string;
  region: string;
  url: string;
  logo?: string;
  group?: string;
  quality?: string;
  isWorldCup?: boolean;
}

// Playlists to fetch — each entry maps to our region system
const SOURCES = [
  // Bangladesh
  { url: "https://iptv-org.github.io/iptv/countries/bd.m3u",   country: "Bangladesh",   flag: "🇧🇩", region: "asia" },
  // India
  { url: "https://iptv-org.github.io/iptv/countries/in.m3u",   country: "India",        flag: "🇮🇳", region: "asia" },
  // Pakistan
  { url: "https://iptv-org.github.io/iptv/countries/pk.m3u",   country: "Pakistan",     flag: "🇵🇰", region: "asia" },
  // UAE
  { url: "https://iptv-org.github.io/iptv/countries/ae.m3u",   country: "UAE",          flag: "🇦🇪", region: "middleeast" },
  // Saudi Arabia
  { url: "https://iptv-org.github.io/iptv/countries/sa.m3u",   country: "Saudi Arabia", flag: "🇸🇦", region: "middleeast" },
  // Qatar
  { url: "https://iptv-org.github.io/iptv/countries/qa.m3u",   country: "Qatar",        flag: "🇶🇦", region: "middleeast" },
  // Egypt
  { url: "https://iptv-org.github.io/iptv/countries/eg.m3u",   country: "Egypt",        flag: "🇪🇬", region: "middleeast" },
  // Turkey
  { url: "https://iptv-org.github.io/iptv/countries/tr.m3u",   country: "Turkey",       flag: "🇹🇷", region: "europe" },
  // Nigeria
  { url: "https://iptv-org.github.io/iptv/countries/ng.m3u",   country: "Nigeria",      flag: "🇳🇬", region: "africa" },
  // Kenya
  { url: "https://iptv-org.github.io/iptv/countries/ke.m3u",   country: "Kenya",        flag: "🇰🇪", region: "africa" },
  // USA (sports/news)
  { url: "https://iptv-org.github.io/iptv/countries/us.m3u",   country: "USA",          flag: "🇺🇸", region: "americas" },
  // Mexico
  { url: "https://iptv-org.github.io/iptv/countries/mx.m3u",   country: "Mexico",       flag: "🇲🇽", region: "americas" },
  // Brazil
  { url: "https://iptv-org.github.io/iptv/countries/br.m3u",   country: "Brazil",       flag: "🇧🇷", region: "americas" },
  // Sports category (worldwide sports channels)
  { url: "https://iptv-org.github.io/iptv/categories/sports.m3u", country: "World",     flag: "🌍", region: "sports" },
];

// Keywords that indicate FIFA/World Cup broadcast rights
const WC_KEYWORDS = ["beinsport", "bein sport", "supersport", "tsport", "gazi", "world cup",
  "fifa", "al jazeera", "aljazeera", "bbc", "itv", "fox sport", "globo"];

// Map group-title → region
const GROUP_REGION: Record<string, string> = {
  sports: "sports", sport: "sports", "football": "sports", "cricket": "sports",
  news: "asia", entertainment: "asia", general: "asia",
};

// Skip channels with bad URLs or placeholder text
const BAD_URL_PATTERNS = [
  "error.com", "localhost", "example.com", "default.url", "pro.com",
  "error.m3u8", "invalid", "192.168.", "127.0.0"
];

function parseM3U(text: string, source: typeof SOURCES[0]): ParsedChannel[] {
  const lines = text.split(/\r?\n/);
  const channels: ParsedChannel[] = [];
  let infoLine = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("#EXTINF")) {
      infoLine = line;
    } else if (infoLine && line.length > 0 && !line.startsWith("#")) {
      const url = line.trim();
      // Skip bad URLs
      if (BAD_URL_PATTERNS.some(p => url.toLowerCase().includes(p))) {
        infoLine = "";
        continue;
      }
      // Must be http/https
      if (!url.startsWith("http")) { infoLine = ""; continue; }

      // Parse EXTINF attributes
      const nameMatch = infoLine.match(/,(.+)$/);
      const logoMatch = infoLine.match(/tvg-logo="([^"]+)"/);
      const groupMatch = infoLine.match(/group-title="([^"]+)"/);
      const idMatch = infoLine.match(/tvg-id="([^"]+)"/);

      const rawName = nameMatch ? nameMatch[1].trim() : "Unknown";
      const logo = logoMatch ? logoMatch[1] : undefined;
      const group = groupMatch ? groupMatch[1].toLowerCase() : "";
      const tvgId = idMatch ? idMatch[1] : "";

      // Determine quality from name
      let quality: string | undefined;
      if (rawName.includes("1080p") || rawName.includes("FHD")) quality = "1080p";
      else if (rawName.includes("720p") || rawName.includes("HD")) quality = "720p";
      else if (rawName.includes("480p") || rawName.includes("SD")) quality = "480p";
      else if (rawName.includes("360p")) quality = "360p";

      // Clean name (remove quality suffix)
      const name = rawName.replace(/\s*\(?(?:1080|720|480|360|240)p\)?/gi, "").trim();

      // Generate stable ID
      const id = `dyn_${tvgId || name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase().substring(0, 30)}_${channels.length}`;

      // Determine region: sports category overrides country region
      let region = source.region;
      if (source.url.includes("categories/sports")) {
        region = "sports";
      } else if (group && GROUP_REGION[group]) {
        region = GROUP_REGION[group];
      }

      // Detect World Cup broadcasters
      const lowerName = name.toLowerCase();
      const isWorldCup = WC_KEYWORDS.some(kw => lowerName.includes(kw));

      channels.push({
        id,
        name,
        flag: source.flag,
        country: source.country,
        region,
        url,
        logo,
        group,
        quality,
        isWorldCup: isWorldCup || undefined,
      });

      infoLine = "";
    }
  }
  return channels;
}

// Simple in-memory cache (5 minutes)
let cacheData: ParsedChannel[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get("refresh") === "true";

    if (!forceRefresh) {
      const filePath = path.join(process.cwd(), "src", "lib", "working_channels.json");
      if (fs.existsSync(filePath)) {
        try {
          const fileContent = fs.readFileSync(filePath, "utf8");
          const parsed = JSON.parse(fileContent);
          return NextResponse.json({
            channels: parsed.channels,
            count: parsed.channels.length,
            cached: true,
            updatedAt: parsed.updatedAt,
            source: "verified_file"
          }, {
            headers: {
              "Cache-Control": "public, max-age=300, stale-while-revalidate=60",
              "Access-Control-Allow-Origin": "*",
            }
          });
        } catch (e) {
          console.error("Failed to read verified channels file:", e);
        }
      }
    }

    // Return from cache if fresh
    if (cacheData && Date.now() - cacheTime < CACHE_TTL) {
      return NextResponse.json({
        channels: cacheData,
        count: cacheData.length,
        cached: true,
        updatedAt: new Date(cacheTime).toISOString(),
      }, {
        headers: {
          "Cache-Control": "public, max-age=300, stale-while-revalidate=60",
          "Access-Control-Allow-Origin": "*",
        }
      });
    }

    // Fetch all playlists in parallel (with 8s timeout each)
    const results = await Promise.allSettled(
      SOURCES.map(async (src) => {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 8000);
        try {
          const res = await fetch(src.url, {
            signal: ctrl.signal,
            headers: { "User-Agent": "iptv-org/1.0" },
            next: { revalidate: 300 },
          });
          clearTimeout(timer);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const text = await res.text();
          return parseM3U(text, src);
        } catch (e) {
          clearTimeout(timer);
          throw e;
        }
      })
    );

    // Flatten all channels
    const allChannels: ParsedChannel[] = [];
    const seenUrls = new Set<string>();

    for (const result of results) {
      if (result.status === "fulfilled") {
        for (const ch of result.value) {
          // Deduplicate by URL
          if (!seenUrls.has(ch.url)) {
            seenUrls.add(ch.url);
            allChannels.push(ch);
          }
        }
      }
    }

    // Cache the result
    cacheData = allChannels;
    cacheTime = Date.now();

    return NextResponse.json({
      channels: allChannels,
      count: allChannels.length,
      cached: false,
      updatedAt: new Date().toISOString(),
      sources: SOURCES.length,
    }, {
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=60",
        "Access-Control-Allow-Origin": "*",
      }
    });

  } catch (err) {
    return NextResponse.json({ error: String(err), channels: [], count: 0 }, { status: 500 });
  }
}
