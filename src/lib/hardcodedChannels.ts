/**
 * HARDCODED WORKING BD / CRICKET / SPORTS STREAMS
 * These are curated from iptv-org and public sources.
 * Multiple fallback URLs per channel — tries each until one works.
 */

export interface HardcodedChannel {
  id: string;
  name: string;
  logo: string;
  country: string;
  countryCode: string;
  category: string;
  urls: string[];          // ordered: best first, fallbacks after
  embedUrl?: string;       // official website embed (iframe fallback)
  officialUrl?: string;    // website to open as last resort
}

export const HARDCODED_CHANNELS: HardcodedChannel[] = [
  // ──────────── BANGLADESH ────────────
  {
    id: "tsports",
    name: "T Sports",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/16/T_Sports.jpg/220px-T_Sports.jpg",
    country: "Bangladesh",
    countryCode: "BD",
    category: "Sports",
    urls: [
      "https://owrcovcrpy.gpcdn.net/bpk-tv/1710/output/index.m3u8",
      "https://owrcovcrpy.gpcdn.net/bpk-tv/1719/output/index.m3u8",
      "https://owrcovcrpy.gpcdn.net/bpk-tv/1726/output/index.m3u8",
    ],
    officialUrl: "https://www.tsports.com.bd/live",
  },
  {
    id: "gtv",
    name: "Gazi TV (GTV)",
    logo: "https://upload.wikimedia.org/wikipedia/en/b/b6/Gazi_Television_logo.png",
    country: "Bangladesh",
    countryCode: "BD",
    category: "Sports",
    urls: [
      "https://owrcovcrpy.gpcdn.net/bpk-tv/1720/output/index.m3u8",
      "https://owrcovcrpy.gpcdn.net/bpk-tv/1717/output/index.m3u8",
      "https://owrcovcrpy.gpcdn.net/bpk-tv/1718/output/index.m3u8",
    ],
    officialUrl: "https://gtv.com.bd/live",
  },
  {
    id: "btv",
    name: "BTV (Bangladesh Television)",
    logo: "https://upload.wikimedia.org/wikipedia/en/8/81/Bangladesh_Television_Logo.png",
    country: "Bangladesh",
    countryCode: "BD",
    category: "General",
    urls: [
      "https://owrcovcrpy.gpcdn.net/bpk-tv/1709/output/index.m3u8",
      "https://owrcovcrpy.gpcdn.net/bpk-tv/1707/output/index.m3u8",
    ],
    officialUrl: "https://live.btv.gov.bd",
  },
  {
    id: "somoy",
    name: "Somoy TV",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Somoy_TV_Logo.png/220px-Somoy_TV_Logo.png",
    country: "Bangladesh",
    countryCode: "BD",
    category: "News",
    urls: [
      "https://cdn3.bmetastreaming.com/somoy-live/index.m3u8",
      "https://somoynews.tv/live.m3u8",
    ],
    officialUrl: "https://somoynews.tv/pages/live-tv",
  },
  {
    id: "channel24",
    name: "Channel 24",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/85/Channel_24_Bangladesh.png/220px-Channel_24_Bangladesh.png",
    country: "Bangladesh",
    countryCode: "BD",
    category: "News",
    urls: [
      "https://cdn3.bmetastreaming.com/channel24-live/index.m3u8",
      "https://channel24bd.tv/live.m3u8",
    ],
    officialUrl: "https://channel24bd.tv",
  },
  {
    id: "news24bd",
    name: "News24 Bangladesh",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/3e/News24_bd_logo.png",
    country: "Bangladesh",
    countryCode: "BD",
    category: "News",
    urls: ["https://cdn3.bmetastreaming.com/news24-live/index.m3u8"],
    officialUrl: "https://news24bd.tv",
  },

  // ──────────── CRICKET WORLD ────────────
  {
    id: "starsports1",
    name: "Star Sports 1",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Star_Sports_1_India.png/200px-Star_Sports_1_India.png",
    country: "India",
    countryCode: "IN",
    category: "Sports",
    urls: [
      "https://dai.google.com/linear/hls/pa/event/Sid4ziMQ2US1OHYCiNGlXA/stream/a2a6a017-20c2-4f76-9c7a-d1ebe23a7baa:DLS/master.m3u8",
    ],
    officialUrl: "https://www.hotstar.com/in/sports/cricket",
  },
  {
    id: "sonysports1",
    name: "Sony Sports 1",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Sony_Sports_1.png/200px-Sony_Sports_1.png",
    country: "India",
    countryCode: "IN",
    category: "Sports",
    urls: [],
    officialUrl: "https://www.sonyliv.com",
  },
  {
    id: "skysportscricket",
    name: "Sky Sports Cricket",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Sky_Sports_Cricket.png/200px-Sky_Sports_Cricket.png",
    country: "United Kingdom",
    countryCode: "GB",
    category: "Sports",
    urls: [],
    officialUrl: "https://www.skysports.com/watch/sky-go",
  },
  {
    id: "ptvsports",
    name: "PTV Sports",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/PTV_Sports_Logo.png/200px-PTV_Sports_Logo.png",
    country: "Pakistan",
    countryCode: "PK",
    category: "Sports",
    urls: [
      "https://ptvsports-live.akamaized.net/hls/live/2002742/ptvsports/master.m3u8",
      "https://live.ptvsports.com/hls/live/ptvsports/master.m3u8",
    ],
    officialUrl: "https://ptv.com.pk/sports",
  },
  {
    id: "asports",
    name: "A Sports (Pakistan)",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/28/A_Sports_logo.png/200px-A_Sports_logo.png",
    country: "Pakistan",
    countryCode: "PK",
    category: "Sports",
    urls: [],
    officialUrl: "https://www.a-sports.tv",
  },

  // ──────────── FIFA / FOOTBALL ────────────
  {
    id: "redbull",
    name: "Red Bull TV",
    logo: "https://i.imgur.com/G3GkOub.png",
    country: "International",
    countryCode: "INT",
    category: "Sports",
    urls: ["https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8"],
    officialUrl: "https://www.redbull.com/tv",
  },
  {
    id: "eurosport1",
    name: "Eurosport 1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Eurosport_1_logo.svg/200px-Eurosport_1_logo.svg.png",
    country: "International",
    countryCode: "INT",
    category: "Sports",
    urls: [
      "https://dai.google.com/linear/hls/pa/event/Ev_UaB1qRhKwOurAiWnoIg/stream/c4985b81-3b78-49bb-a0a3-f7d64698bb88:DLS/master.m3u8",
    ],
    officialUrl: "https://www.eurosport.com",
  },
  {
    id: "bein1",
    name: "beIN Sports 1",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/93/BeIN_Sports_1_logo.png/200px-BeIN_Sports_1_logo.png",
    country: "Qatar",
    countryCode: "QA",
    category: "Sports",
    urls: [],
    officialUrl: "https://www.beinsports.com",
  },
  {
    id: "ssc1",
    name: "SSC 1 (Saudi Sports)",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/3a/Saudi_Sports_Channel_logo.svg",
    country: "Saudi Arabia",
    countryCode: "SA",
    category: "Sports",
    urls: [
      "https://ssc.com.sa/live/ssc1/index.m3u8",
    ],
    officialUrl: "https://ssc.com.sa",
  },
];

/** Get channel by id */
export function getHardcodedChannel(id: string): HardcodedChannel | undefined {
  return HARDCODED_CHANNELS.find(c => c.id === id);
}

/** Get all BD channels */
export function getBDChannels(): HardcodedChannel[] {
  return HARDCODED_CHANNELS.filter(c => c.countryCode === "BD");
}

/** Get all sports channels */
export function getSportsHardcodedChannels(): HardcodedChannel[] {
  return HARDCODED_CHANNELS.filter(c => c.category === "Sports");
}
