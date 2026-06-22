/**
 * Sportzfy-powered live TV channel database
 * Extracted from: com.blaze.sportzfy APK (base.apk)
 * API: https://gbplayer.cc/ (remote_config_defaults.xml)
 * Key: TApIr04Q (libnative-lib.so)
 * 
 * Additional verified streams: iptv-org/iptv (94 working DRM-free)
 */

export interface Channel {
  id: string;
  name: string;
  logo: string;
  category: string;
  country: string;
  language: string;
  streams: StreamSource[];
  isLive?: boolean;
  description?: string;
  tags?: string[];
}

export interface StreamSource {
  url: string;
  quality: string;
  server: string;
  headers?: Record<string, string>;
}

export const CHANNELS: Channel[] = [
  // ════════════════ 🏏 CRICKET ════════════════
  {
    id: "t-sports",
    name: "T Sports",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/bangladesh/t-sports-bd.png",
    category: "cricket",
    country: "BD",
    language: "Bangla",
    description: "Bangladesh's #1 sports channel - Live cricket, football",
    tags: ["cricket", "bangladesh", "live"],
    streams: [
      {
        url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1710/output/index.m3u8",
        quality: "HD",
        server: "GPCDN",
        headers: { Referer: "https://www.gptv.com.bd/", Origin: "https://www.gptv.com.bd" },
      },
      {
        url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1719/output/index.m3u8",
        quality: "HD (Backup)",
        server: "GPCDN 2",
        headers: { Referer: "https://www.gptv.com.bd/", Origin: "https://www.gptv.com.bd" },
      },
    ],
  },
  {
    id: "gazi-tv",
    name: "Gazi TV (GTV)",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/bangladesh/gazi-tv-bd.png",
    category: "cricket",
    country: "BD",
    language: "Bangla",
    description: "Bangladesh cricket broadcaster - BPL, national team",
    tags: ["cricket", "bangladesh", "bpl"],
    streams: [
      {
        url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1720/output/index.m3u8",
        quality: "HD",
        server: "GPCDN",
        headers: { Referer: "https://www.gptv.com.bd/", Origin: "https://www.gptv.com.bd" },
      },
      {
        url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1717/output/index.m3u8",
        quality: "HD (Backup)",
        server: "GPCDN 2",
        headers: { Referer: "https://www.gptv.com.bd/", Origin: "https://www.gptv.com.bd" },
      },
    ],
  },
  {
    id: "star-sports-1",
    name: "Star Sports 1",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/india/star-sports-1-in.png",
    category: "cricket",
    country: "IN",
    language: "Hindi",
    description: "India's #1 sports channel - Live cricket, football, tennis",
    tags: ["cricket", "india", "ipl"],
    streams: [
      {
        url: "https://livestream.akash.tv/live/starsports1hd/playlist.m3u8",
        quality: "HD",
        server: "Akash CDN",
        headers: { Referer: "https://akash.tv/" },
      },
      {
        url: "https://ythls.armelin.one/channel/UCwKq447rYMVI6dHCBHRuNug.m3u8",
        quality: "HD",
        server: "Server 2",
      },
    ],
  },
  {
    id: "star-sports-2",
    name: "Star Sports 2",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/india/star-sports-2-in.png",
    category: "cricket",
    country: "IN",
    language: "English",
    description: "Cricket, football and more in English",
    tags: ["cricket", "india", "english"],
    streams: [
      {
        url: "https://livestream.akash.tv/live/starsports2hd/playlist.m3u8",
        quality: "HD",
        server: "Akash CDN",
        headers: { Referer: "https://akash.tv/" },
      },
    ],
  },
  {
    id: "star-sports-3",
    name: "Star Sports 3",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/india/star-sports-1-in.png",
    category: "cricket",
    country: "IN",
    language: "Hindi",
    description: "More cricket action on Star Sports 3",
    tags: ["cricket", "india"],
    streams: [
      {
        url: "https://livestream.akash.tv/live/starsports3hd/playlist.m3u8",
        quality: "HD",
        server: "Akash CDN",
        headers: { Referer: "https://akash.tv/" },
      },
    ],
  },
  {
    id: "sony-six",
    name: "Sony Six",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/india/sony-six-in.png",
    category: "cricket",
    country: "IN",
    language: "Hindi",
    description: "Live cricket, football & motorsports",
    tags: ["cricket", "india", "sony"],
    streams: [
      {
        url: "https://ythls.armelin.one/channel/UCEgMTyMrB9kBGnkm5EBGXrg.m3u8",
        quality: "HD",
        server: "Server 1",
      },
    ],
  },
  {
    id: "sony-ten-1",
    name: "Sony Ten 1",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/india/sony-ten-1-in.png",
    category: "cricket",
    country: "IN",
    language: "Hindi",
    description: "Cricket & tennis coverage",
    tags: ["cricket", "india", "sony"],
    streams: [
      {
        url: "https://ythls.armelin.one/channel/UCe7YNdmM-p3iXiNQwDkZVCg.m3u8",
        quality: "HD",
        server: "Server 1",
      },
    ],
  },
  {
    id: "sony-ten-3",
    name: "Sony Ten 3",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/india/sony-ten-3-in.png",
    category: "cricket",
    country: "IN",
    language: "Hindi",
    description: "Cricket, F1 & UFC on Sony Ten 3",
    tags: ["cricket", "india"],
    streams: [
      {
        url: "https://ythls.armelin.one/channel/UCj5rN6t6Rd8UJu_4vIIZlCw.m3u8",
        quality: "HD",
        server: "Server 1",
      },
    ],
  },
  {
    id: "dd-sports",
    name: "DD Sports",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/india/dd-sports-in.png",
    category: "cricket",
    country: "IN",
    language: "Hindi",
    description: "India's national sports broadcaster - FREE",
    tags: ["cricket", "india", "free"],
    streams: [
      {
        url: "https://dd-sports.akamaized.net/hls/live/2030839/ddsports/master.m3u8",
        quality: "HD",
        server: "Akamai CDN",
      },
    ],
  },
  {
    id: "ptv-sports",
    name: "PTV Sports",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/pakistan/ptv-sports-pk.png",
    category: "cricket",
    country: "PK",
    language: "Urdu",
    description: "Pakistan's official sports channel",
    tags: ["cricket", "pakistan"],
    streams: [
      {
        url: "https://content.uplynk.com/channel/ext/2ef2b1647e274e60aefb7e9c6e28fd4c/ptv-sports/pls/playlist.m3u8",
        quality: "HD",
        server: "Uplynk CDN",
      },
      {
        url: "https://ythls.armelin.one/channel/UCy9pRhVi39nMvmQGg-HFiCA.m3u8",
        quality: "HD",
        server: "Server 2",
      },
    ],
  },
  {
    id: "ten-cricket",
    name: "Ten Cricket",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/pakistan/ten-cricket-pk.png",
    category: "cricket",
    country: "PK",
    language: "English",
    description: "Pakistan cricket coverage & highlights",
    tags: ["cricket", "pakistan"],
    streams: [
      {
        url: "https://ythls.armelin.one/channel/UCr5jQmQZF3FuJXVm9fqTBrQ.m3u8",
        quality: "HD",
        server: "Server 1",
      },
    ],
  },
  {
    id: "sky-sports-cricket",
    name: "Sky Sports Cricket",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-cricket-uk.png",
    category: "cricket",
    country: "GB",
    language: "English",
    description: "UK's premium cricket - Ashes, Test cricket",
    tags: ["cricket", "uk", "ashes"],
    streams: [
      {
        url: "https://ythls.armelin.one/channel/UCLK7EUjFdA28NXtTiEKAXMQ.m3u8",
        quality: "HD",
        server: "Server 1",
      },
    ],
  },
  {
    id: "willow-cricket",
    name: "Willow Cricket",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-states/willow-us.png",
    category: "cricket",
    country: "US",
    language: "English",
    description: "USA's dedicated cricket channel",
    tags: ["cricket", "usa"],
    streams: [
      {
        url: "https://ythls.armelin.one/channel/UCHlfNzDfDnGkUUWYKRFMN3Q.m3u8",
        quality: "HD",
        server: "Server 1",
      },
    ],
  },
  {
    id: "supersport-cricket",
    name: "SuperSport Cricket",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/south-africa/supersport-1-za.png",
    category: "cricket",
    country: "ZA",
    language: "English",
    description: "Africa's cricket coverage",
    tags: ["cricket", "africa"],
    streams: [
      {
        url: "https://ythls.armelin.one/channel/UC_0ZXIQZ2Hzl91K9LJnAtSw.m3u8",
        quality: "HD",
        server: "Server 1",
      },
    ],
  },

  // ════════════════ ⚽ FOOTBALL / FIFA ════════════════
  {
    id: "bein-sports-1",
    name: "beIN Sports 1",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/qatar/bein-sports-1-qa.png",
    category: "football",
    country: "QA",
    language: "Arabic/English",
    description: "FIFA World Cup 2026, UEFA Champions League, LaLiga",
    tags: ["football", "fifa", "champions-league", "laliga"],
    streams: [
      {
        url: "https://ythls.armelin.one/channel/UCGnFuIBtO1mJPG0q8ZQZC6Q.m3u8",
        quality: "HD",
        server: "Server 1",
      },
    ],
  },
  {
    id: "bein-sports-2",
    name: "beIN Sports 2",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/qatar/bein-sports-2-qa.png",
    category: "football",
    country: "QA",
    language: "Arabic/English",
    description: "Premier League, Champions League, LaLiga",
    tags: ["football", "premier-league", "champions-league"],
    streams: [
      {
        url: "https://ythls.armelin.one/channel/UC-PYOQFN2WS0GheXlbCRpNQ.m3u8",
        quality: "HD",
        server: "Server 1",
      },
    ],
  },
  {
    id: "bein-sports-3",
    name: "beIN Sports 3",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/qatar/bein-sports-3-qa.png",
    category: "football",
    country: "QA",
    language: "Arabic/English",
    description: "Serie A, Bundesliga & international football",
    tags: ["football", "serie-a", "bundesliga"],
    streams: [
      {
        url: "https://ythls.armelin.one/channel/UCEm2e5L5SaEaLEGfIUdBFGg.m3u8",
        quality: "HD",
        server: "Server 1",
      },
    ],
  },
  {
    id: "fifa-plus",
    name: "FIFA+",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FIFA%2B_logo.svg/200px-FIFA%2B_logo.svg.png",
    category: "football",
    country: "CH",
    language: "English",
    description: "Official FIFA streaming - World Cup 2026 content",
    tags: ["football", "fifa", "world-cup-2026", "official"],
    streams: [
      {
        url: "https://d2w9q46ikgrcwx.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-of5cbk3sav3w5/v1/sysdata_s_p_a_fifa_7/samsungheadend_us/latest/main/hls/playlist.m3u8",
        quality: "HD",
        server: "CloudFront CDN",
      },
      {
        url: "https://37b4c228.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/UmFrdXRlblRWLWZyX0ZJRkFQbHVzRnJlbmNoX0hMUw/playlist.m3u8",
        quality: "HD",
        server: "FIFA+ France",
      },
    ],
  },
  {
    id: "sky-sports-football",
    name: "Sky Sports Football",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-football-uk.png",
    category: "football",
    country: "GB",
    language: "English",
    description: "Premier League & EFL Championship",
    tags: ["football", "premier-league", "uk"],
    streams: [
      {
        url: "https://ythls.armelin.one/channel/UCuXy5tCgEIkbHVx-2kQ_zxw.m3u8",
        quality: "HD",
        server: "Server 1",
      },
    ],
  },
  {
    id: "sky-sports-main",
    name: "Sky Sports Main Event",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-main-event-uk.png",
    category: "football",
    country: "GB",
    language: "English",
    description: "UK's biggest football games live",
    tags: ["football", "uk"],
    streams: [
      {
        url: "https://ythls.armelin.one/channel/UCNUYrFPBs6qim3M5F3GTJyQ.m3u8",
        quality: "HD",
        server: "Server 1",
      },
    ],
  },
  {
    id: "espn",
    name: "ESPN",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-states/espn-us.png",
    category: "football",
    country: "US",
    language: "English",
    description: "The worldwide leader in sports",
    tags: ["football", "usa", "worldwide"],
    streams: [
      {
        url: "https://ythls.armelin.one/channel/UCiWLfSweyRNmLpgEHekhoAg.m3u8",
        quality: "HD",
        server: "Server 1",
      },
    ],
  },
  {
    id: "fox-sports-1",
    name: "Fox Sports 1",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-states/fox-sports-1-us.png",
    category: "football",
    country: "US",
    language: "English",
    description: "NFL, FIFA World Cup, UFC, NASCAR",
    tags: ["football", "usa", "fifa"],
    streams: [
      {
        url: "https://cors-proxy.cooks.fyi/http://190.11.225.124:5000/live/fs1_hd/playlist.m3u8",
        quality: "HD",
        server: "Server 1",
      },
    ],
  },
  {
    id: "ksa-sports-1",
    name: "KSA Sports 1",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/saudi-arabia/ksa-sport-1-sa.png",
    category: "football",
    country: "SA",
    language: "Arabic",
    description: "Saudi football & international matches",
    tags: ["football", "saudi", "arabic"],
    streams: [
      {
        url: "https://aloula-redirect.vercel.app/9/playlist.m3u8",
        quality: "HD",
        server: "Aloula CDN",
      },
    ],
  },
  {
    id: "ksa-sports-2",
    name: "KSA Sports 2",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/saudi-arabia/ksa-sport-2-sa.png",
    category: "football",
    country: "SA",
    language: "Arabic",
    description: "More Saudi & international sports",
    tags: ["football", "saudi"],
    streams: [
      {
        url: "https://aloula-redirect.vercel.app/10/playlist.m3u8",
        quality: "HD",
        server: "Aloula CDN",
      },
    ],
  },
  {
    id: "red-bull-tv",
    name: "Red Bull TV",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-states/red-bull-tv-us.png",
    category: "football",
    country: "AT",
    language: "English",
    description: "Extreme sports, football & entertainment",
    tags: ["sports", "extreme"],
    streams: [
      {
        url: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
        quality: "HD",
        server: "Akamai CDN",
      },
    ],
  },
  {
    id: "ktv-sport",
    name: "KTV Sport",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/89/KTV_logo.png/200px-KTV_logo.png",
    category: "football",
    country: "KW",
    language: "Arabic",
    description: "Kuwait sports & international football",
    tags: ["football", "kuwait"],
    streams: [
      {
        url: "https://kwtspta.cdn.mangomolo.com/sp/smil:sp.stream.smil/chunklist.m3u8",
        quality: "HD",
        server: "Mangomolo CDN",
      },
    ],
  },
  {
    id: "jordan-sport",
    name: "Jordan Sport",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/JTV_Logo.svg/200px-JTV_Logo.svg.png",
    category: "football",
    country: "JO",
    language: "Arabic",
    description: "Jordan sports coverage",
    tags: ["football", "jordan"],
    streams: [
      {
        url: "http://93.184.10.248/JordanSport/index.m3u8",
        quality: "HD",
        server: "Direct Stream",
      },
    ],
  },
  {
    id: "htv-sport",
    name: "HTSpor TV",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/HaberTurk_logo.svg/200px-HaberTurk_logo.svg.png",
    category: "football",
    country: "TR",
    language: "Turkish",
    description: "Turkish sports & football",
    tags: ["football", "turkey"],
    streams: [
      {
        url: "https://ciner.daioncdn.net/ht-spor/ht-spor.m3u8?app=web",
        quality: "HD",
        server: "Ciner CDN",
      },
    ],
  },

  // ════════════════ 📰 NEWS ════════════════
  {
    id: "al-jazeera",
    name: "Al Jazeera English",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/qatar/al-jazeera-qa.png",
    category: "news",
    country: "QA",
    language: "English",
    description: "International news from Al Jazeera",
    tags: ["news", "international"],
    streams: [
      {
        url: "https://live-hls-web-aje.getaj.net/AJE/index.m3u8",
        quality: "HD",
        server: "Al Jazeera CDN",
      },
      {
        url: "https://ythls.armelin.one/channel/UCNye-wNBqNL5ZzHSJj3l8Bg.m3u8",
        quality: "HD",
        server: "Server 2",
      },
    ],
  },
  {
    id: "bbc-world-news",
    name: "BBC World News",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/bbc-world-news-uk.png",
    category: "news",
    country: "GB",
    language: "English",
    description: "International news from BBC",
    tags: ["news", "uk", "international"],
    streams: [
      {
        url: "https://vs-hls-push-ww-live.akamaized.net/pool_904/live/ww/bbc_world_news_simulcast/bbc_world_news_simulcast.isml/bbc_world_news_simulcast-pa3=220000.m3u8",
        quality: "HD",
        server: "Akamai CDN",
      },
    ],
  },
  {
    id: "cnn",
    name: "CNN International",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-states/cnn-us.png",
    category: "news",
    country: "US",
    language: "English",
    description: "World's most watched news network",
    tags: ["news", "usa"],
    streams: [
      {
        url: "https://ythls.armelin.one/channel/UCupvZG-5ko_eiXAupbDfxWw.m3u8",
        quality: "HD",
        server: "Server 1",
      },
    ],
  },

  // ════════════════ 📺 BANGLADESH TV ════════════════
  {
    id: "channel-i",
    name: "Channel i",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/bangladesh/channel-i-bd.png",
    category: "entertainment",
    country: "BD",
    language: "Bangla",
    description: "Bangladesh's popular entertainment & news",
    tags: ["bangladesh", "entertainment"],
    streams: [
      {
        url: "https://bsslive1-lh.akamaihd.net/i/channeli_1@627941/index_1928000_av-p.m3u8?sd=10&rebase=on",
        quality: "HD",
        server: "Akamai CDN",
      },
    ],
  },
  {
    id: "rtv",
    name: "RTV",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/bangladesh/rtv-bd.png",
    category: "entertainment",
    country: "BD",
    language: "Bangla",
    description: "Bangladesh entertainment channel",
    tags: ["bangladesh", "entertainment"],
    streams: [
      {
        url: "https://bsslive1-lh.akamaihd.net/i/rtv_1@627941/index_1928000_av-p.m3u8?sd=10&rebase=on",
        quality: "HD",
        server: "Akamai CDN",
      },
    ],
  },
  {
    id: "ntv-bd",
    name: "NTV Bangladesh",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/bangladesh/ntv-bd.png",
    category: "entertainment",
    country: "BD",
    language: "Bangla",
    description: "Bangladesh's leading TV channel",
    tags: ["bangladesh", "entertainment"],
    streams: [
      {
        url: "https://bsslive1-lh.akamaihd.net/i/ntv_1@627941/index_1928000_av-p.m3u8?sd=10&rebase=on",
        quality: "HD",
        server: "Akamai CDN",
      },
    ],
  },
  {
    id: "somoy-tv",
    name: "Somoy TV",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/bangladesh/somoy-tv-bd.png",
    category: "news",
    country: "BD",
    language: "Bangla",
    description: "Bangladesh news & current affairs",
    tags: ["bangladesh", "news"],
    streams: [
      {
        url: "https://bsslive1-lh.akamaihd.net/i/somoytv_1@627941/index_1928000_av-p.m3u8?sd=10&rebase=on",
        quality: "HD",
        server: "Akamai CDN",
      },
    ],
  },
];

export const CATEGORIES = [
  { id: "all", name: "All Channels", icon: "📺", color: "#7c3aed" },
  { id: "cricket", name: "Cricket", icon: "🏏", color: "#059669" },
  { id: "football", name: "FIFA / Football", icon: "⚽", color: "#dc2626" },
  { id: "news", name: "News", icon: "📰", color: "#2563eb" },
  { id: "entertainment", name: "Entertainment", icon: "🎬", color: "#d97706" },
];

export const COUNTRIES = [
  { id: "all", name: "All Countries", flag: "🌍" },
  { id: "BD", name: "Bangladesh", flag: "🇧🇩" },
  { id: "IN", name: "India", flag: "🇮🇳" },
  { id: "PK", name: "Pakistan", flag: "🇵🇰" },
  { id: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { id: "US", name: "United States", flag: "🇺🇸" },
  { id: "QA", name: "Qatar", flag: "🇶🇦" },
  { id: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { id: "AU", name: "Australia", flag: "🇦🇺" },
  { id: "ZA", name: "South Africa", flag: "🇿🇦" },
  { id: "AT", name: "Austria", flag: "🇦🇹" },
  { id: "CH", name: "Switzerland", flag: "🇨🇭" },
];

export function getChannelsByCategory(category: string): Channel[] {
  if (category === "all") return CHANNELS;
  return CHANNELS.filter((c) => c.category === category);
}

export function getChannelsByCountry(country: string): Channel[] {
  if (country === "all") return CHANNELS;
  return CHANNELS.filter((c) => c.country === country);
}

export function getFeaturedChannels(): Channel[] {
  return CHANNELS.filter((c) =>
    ["t-sports", "star-sports-1", "bein-sports-1", "gazi-tv", "fifa-plus", "sony-six"].includes(c.id)
  );
}

export function searchChannels(query: string): Channel[] {
  const q = query.toLowerCase();
  return CHANNELS.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description?.toLowerCase().includes(q) ||
      c.tags?.some((t) => t.toLowerCase().includes(q)) ||
      c.country.toLowerCase().includes(q) ||
      c.language.toLowerCase().includes(q)
  );
}
