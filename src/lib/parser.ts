import parser from "iptv-playlist-parser";

export interface Channel {
  name: string;
  logo: string;
  url: string;
  category: string;
  country: string;
  countryCode: string;
  language: string;
  isSports: boolean;
}

/* ── Country helpers ──────────────────────── */
export function countryFlag(code: string): string {
  if (!code || code.length !== 2) return "🌐";
  const pts = [...code.toUpperCase()].map((c) => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...pts);
}

const COUNTRY_NAMES: Record<string, string> = {
  US:"United States", GB:"United Kingdom", BD:"Bangladesh", IN:"India",
  PK:"Pakistan",  AU:"Australia",  CA:"Canada",  DE:"Germany",
  FR:"France",    ES:"Spain",      IT:"Italy",   BR:"Brazil",
  MX:"Mexico",    AR:"Argentina",  SA:"Saudi Arabia", AE:"UAE",
  EG:"Egypt",     TR:"Turkey",     RU:"Russia",  CN:"China",
  JP:"Japan",     KR:"South Korea",NG:"Nigeria", ZA:"South Africa",
  NL:"Netherlands",BE:"Belgium",  PL:"Poland",  SE:"Sweden",
  NO:"Norway",    DK:"Denmark",   FI:"Finland", CH:"Switzerland",
  AT:"Austria",   PT:"Portugal",  GR:"Greece",  CZ:"Czech Republic",
  HU:"Hungary",   RO:"Romania",   UA:"Ukraine", ID:"Indonesia",
  MY:"Malaysia",  TH:"Thailand",  VN:"Vietnam", PH:"Philippines",
  SG:"Singapore", NZ:"New Zealand",IR:"Iran",   IQ:"Iraq",
  SY:"Syria",     LB:"Lebanon",   JO:"Jordan",  KW:"Kuwait",
  QA:"Qatar",     BH:"Bahrain",   OM:"Oman",    YE:"Yemen",
  LY:"Libya",     TN:"Tunisia",   DZ:"Algeria", MA:"Morocco",
  GH:"Ghana",     KE:"Kenya",     ET:"Ethiopia",TZ:"Tanzania",
  AF:"Afghanistan",NP:"Nepal",    LK:"Sri Lanka",MM:"Myanmar",
  KH:"Cambodia",  LA:"Laos",      IL:"Israel",  PS:"Palestine",
  RS:"Serbia",    HR:"Croatia",   SK:"Slovakia",SI:"Slovenia",
  MK:"North Macedonia",AL:"Albania",BA:"Bosnia",ME:"Montenegro",
  XK:"Kosovo",    BY:"Belarus",   LT:"Lithuania",LV:"Latvia",
  EE:"Estonia",   MD:"Moldova",   AM:"Armenia", GE:"Georgia",
  AZ:"Azerbaijan",KZ:"Kazakhstan",UZ:"Uzbekistan",TM:"Turkmenistan",
  TJ:"Tajikistan",KG:"Kyrgyzstan",MN:"Mongolia",
};

export function getCountryName(code: string): string {
  if (!code || code === "INT") return "International";
  return COUNTRY_NAMES[code.toUpperCase()] || code.toUpperCase();
}

/* Countries to pin at top (user's region) */
const PINNED_COUNTRY_CODES = ["BD", "IN", "PK"];

const SPORTS_KEYWORDS = [
  "sport","football","soccer","fifa","nfl","nba","cricket",
  "tennis","f1","formula","boxing","mma","ufc","hockey",
  "basketball","baseball","golf","rugby","olympic",
  "bein","sky sport","espn","tsn","supersport","eurosport",
  "sntv","redbull","motorsport","fight","ring",
];

function isSportsChannel(name: string, category: string): boolean {
  const combined = (name + " " + category).toLowerCase();
  return SPORTS_KEYWORDS.some((kw) => combined.includes(kw));
}

/* ── Playlist fetcher ─────────────────────── */
async function fetchPlaylist(url: string, forceSports = false): Promise<Channel[]> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) return [];
    const text = await res.text();
    const result = parser.parse(text);

    return result.items
      .filter((item: any) => item.url && item.url.startsWith("http"))
      .map((item: any) => {
        const raw: string = item.raw || "";
        const countryMatch = raw.match(/tvg-country="([^"]*)"/i);
        const rawCountry = countryMatch?.[1] || "";
        const countryCode = rawCountry.split(";")[0].trim().toUpperCase() || "INT";
        const name = item.name || "Unknown";
        const category = item.group?.title || "General";

        return {
          name,
          logo: item.tvg?.logo ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1d3a6e&color=60a5fa&size=64&bold=true`,
          url: item.url,
          category,
          country: getCountryName(countryCode),
          countryCode,
          language: item.lang || "Unknown",
          isSports: forceSports || isSportsChannel(name, category),
        };
      });
  } catch {
    return [];
  }
}

/* ── Main export ──────────────────────────── */
export async function fetchChannels(): Promise<Channel[]> {
  // Fetch sports playlist + full index in parallel
  const [sportsChannels, allChannels] = await Promise.all([
    fetchPlaylist("https://iptv-org.github.io/iptv/categories/sports.m3u", true),
    fetchPlaylist("https://iptv-org.github.io/iptv/index.m3u", false),
  ]);

  // Merge, deduplicate by URL
  const seen = new Set<string>();
  const merged: Channel[] = [];

  // Sports first
  for (const ch of sportsChannels) {
    if (!seen.has(ch.url)) { seen.add(ch.url); merged.push(ch); }
  }
  // Then rest
  for (const ch of allChannels) {
    if (!seen.has(ch.url)) { seen.add(ch.url); merged.push(ch); }
  }

  // Sort: pinned countries → sports → country → name
  merged.sort((a, b) => {
    const aPinned = PINNED_COUNTRY_CODES.includes(a.countryCode) ? 0 : 1;
    const bPinned = PINNED_COUNTRY_CODES.includes(b.countryCode) ? 0 : 1;
    if (aPinned !== bPinned) return aPinned - bPinned;
    if (a.isSports !== b.isSports) return a.isSports ? -1 : 1;
    const cmp = a.country.localeCompare(b.country);
    return cmp !== 0 ? cmp : a.name.localeCompare(b.name);
  });

  console.log(
    `✅ Sohan TV: ${merged.length} total | ${sportsChannels.length} sports | ${allChannels.length} general`
  );
  return merged;
}
