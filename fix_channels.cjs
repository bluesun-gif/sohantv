// Replace FEATURED channel array with correct data from iptv-org
const fs = require('fs');
const content = fs.readFileSync('src/app/page.tsx', 'utf8');

const newFEATURED = `const FEATURED: Channel[] = [
  // \u2500\u2500 BANGLADESH SPORTS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // T Sports: verified by iptv-org, served via aynaott CDN (BD geo-accessible)
  // Note: aynaott servers are in Bangladesh \u2014 browser fetches directly, no proxy needed
  {id:"tsports",name:"T Sports",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"sports",
    url:"https://tvsen7.aynaott.com/tsports-hd/index.m3u8",
    backup:"https://tvsen7.aynaott.com/tsportsfhd/index.m3u8",
    quality:"720p",isWorldCup:true,logo:"https://upload.wikimedia.org/wikipedia/en/thumb/1/16/T_Sports.jpg/220px-T_Sports.jpg"},
  // GTV: verified by iptv-org, served via aynaott CDN (BD geo-accessible)
  {id:"gtv",name:"Gazi TV (GTV)",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"sports",
    url:"https://tvsen5.aynaott.com/Ravc7gPCZpxk/index.m3u8",
    backup:"http://tvn1.chowdhury-shaheb.com/gazitv/index.m3u8",
    quality:"720p",isWorldCup:true,logo:"https://upload.wikimedia.org/wikipedia/en/b/b6/Gazi_Television_logo.png"},
  // BTV National \u2014 GPCDN 1709 (verified correct by iptv-org database)
  {id:"btv",name:"BTV National",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"sports",
    url:"https://owrcovcrpy.gpcdn.net/bpk-tv/1709/output/index.m3u8",
    backup:"https://tvsen6.aynaott.com/btvhd/index.m3u8",
    quality:"1080p",isWorldCup:true,logo:"https://iptv-org.github.io/iptv/logos/BTVNational.png"},
  // BTV World \u2014 via aynaott (iptv-org verified)
  {id:"btvworld",name:"BTV World",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"sports",
    url:"https://tvsen6.aynaott.com/btv_world/index.m3u8",
    backup:"https://owrcovcrpy.gpcdn.net/bpk-tv/1709/output/index.m3u8",
    quality:"720p",isWorldCup:true,logo:"https://iptv-org.github.io/iptv/logos/BTVWorld.png"},
  // NTV \u2014 GPCDN 1716 (verified correct by iptv-org)
  {id:"ntv",name:"NTV Bangladesh",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"sports",
    url:"https://owrcovcrpy.gpcdn.net/bpk-tv/1716/output/index.m3u8",
    backup:"https://tvsen5.aynaott.com/xV4jEKf3D9zc/index.m3u8",
    quality:"1080p",isWorldCup:true,logo:"https://iptv-org.github.io/iptv/logos/NTV.png"},

  // \u2500\u2500 PAKISTAN CHANNELS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  {id:"ptvsports",name:"PTV Sports",flag:"\ud83c\uddf5\ud83c\uddf0",country:"Pakistan",region:"sports",
    url:"https://vidcdn.vidgyor.com/ptv-sports-origin/liveabr/playlist.m3u8",
    backup:"https://vidcdn.vidgyor.com/news24-origin/liveabr/playlist.m3u8",
    quality:"HD",isWorldCup:true,logo:"https://iptv-org.github.io/iptv/logos/PTVSports.png"},
  {id:"ptvnational",name:"PTV National",flag:"\ud83c\uddf5\ud83c\uddf0",country:"Pakistan",region:"asia",
    url:"https://vidcdn.vidgyor.com/ptv-national-origin/liveabr/playlist.m3u8",
    backup:"https://vidcdn.vidgyor.com/news24-origin/liveabr/playlist.m3u8",
    quality:"HD",logo:"https://iptv-org.github.io/iptv/logos/PTVNational.png"},
  {id:"geotv",name:"Geo News",flag:"\ud83c\uddf5\ud83c\uddf0",country:"Pakistan",region:"asia",
    url:"https://vidcdn.vidgyor.com/geo-origin/liveabr/playlist.m3u8",
    backup:"https://owrcovcrpy.gpcdn.net/bpk-tv/1702/output/index.m3u8",
    quality:"HD",logo:"https://iptv-org.github.io/iptv/logos/GeoNews.png"},
  {id:"arynews",name:"ARY News",flag:"\ud83c\uddf5\ud83c\uddf0",country:"Pakistan",region:"asia",
    url:"https://vidcdn.vidgyor.com/ary-news-origin/liveabr/playlist.m3u8",
    backup:"https://vidcdn.vidgyor.com/news24-origin/liveabr/playlist.m3u8",
    quality:"HD",logo:"https://iptv-org.github.io/iptv/logos/ARYNews.png"},

  // \u2500\u2500 WORLD CUP / GLOBAL SPORTS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  {id:"aljazeera",name:"Al Jazeera English",flag:"\ud83c\uddf6\ud83c\udde6",country:"Qatar",region:"sports",
    url:"https://aljazeera-english.samsung.wurl.tv/playlist.m3u8",
    backup:"https://bein-xtra-bein.amagi.tv/playlist.m3u8",
    quality:"1080p",isWorldCup:true,logo:"https://iptv-org.github.io/iptv/logos/AlJazeeraEnglish.png"},
  {id:"aljazeeraara",name:"Al Jazeera Arabic",flag:"\ud83c\uddf6\ud83c\udde6",country:"Qatar",region:"sports",
    url:"https://aljazeera-arabic.samsung.wurl.tv/playlist.m3u8",
    backup:"https://bein-xtra-bein.amagi.tv/playlist.m3u8",
    quality:"1080p",isWorldCup:true,logo:"https://iptv-org.github.io/iptv/logos/AlJazeeraArabic.png"},
  {id:"beinxtra",name:"beIN Sports XTRA",flag:"\ud83c\uddf6\ud83c\udde6",country:"Qatar",region:"sports",
    url:"https://bein-xtra-bein.amagi.tv/playlist.m3u8",
    quality:"1080p",isWorldCup:true,logo:"https://iptv-org.github.io/iptv/logos/beINSportsXTRA.png"},
  {id:"fifaplus",name:"FIFA+ Live",flag:"\ud83c\udf0d",country:"World",region:"sports",
    url:"https://d1e9r0b71zfwk7.cloudfront.net/playlist.m3u8",
    quality:"720p",isWorldCup:true,logo:"https://upload.wikimedia.org/wikipedia/en/f/f9/FIFA_logo_without_slogan.svg"},
  {id:"redbull",name:"Red Bull TV",flag:"\ud83c\udde6\ud83c\uddf9",country:"Austria",region:"sports",
    url:"https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
    quality:"1080p",logo:"https://iptv-org.github.io/iptv/logos/RedBullTV.png"},
  {id:"fueltv",name:"FUEL TV",flag:"\ud83c\uddfa\ud83c\uddf8",country:"USA",region:"sports",
    url:"https://amg01074-fueltv-fueltvemeaen-rakuten-b6j62.amagi.tv/hls/amagi_hls_data_rakutenAA-fueltvemeaen/CDN/master.m3u8",
    quality:"1080p",logo:"https://iptv-org.github.io/iptv/logos/FUELTV.png"},

  // \u2500\u2500 BANGLADESH NEWS / ENTERTAINMENT (ALL CORRECT IDs from iptv-org) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  {id:"banglavision",name:"Bangla Vision",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"asia",
    url:"https://owrcovcrpy.gpcdn.net/bpk-tv/1715/output/index.m3u8",quality:"1080p",
    logo:"https://iptv-org.github.io/iptv/logos/BanglaVision.png"},
  {id:"channeli",name:"Channel I",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"asia",
    url:"https://owrcovcrpy.gpcdn.net/bpk-tv/1723/output/index.m3u8",quality:"1080p",
    logo:"https://iptv-org.github.io/iptv/logos/ChanneliBangladesh.png"},
  {id:"channel9bd",name:"Channel 9",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"asia",
    url:"https://owrcovcrpy.gpcdn.net/bpk-tv/1729/output/index.m3u8",quality:"1080p",
    logo:"https://iptv-org.github.io/iptv/logos/Channel9Bangladesh.png"},
  {id:"deepto",name:"Deepto TV",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"asia",
    url:"https://owrcovcrpy.gpcdn.net/bpk-tv/1711/output/index.m3u8",quality:"1080p",
    logo:"https://iptv-org.github.io/iptv/logos/DeeptoTV.png"},
  {id:"maasranga",name:"Maasranga TV",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"asia",
    url:"https://owrcovcrpy.gpcdn.net/bpk-tv/1722/output/index.m3u8",quality:"1080p",
    logo:"https://iptv-org.github.io/iptv/logos/MaasrangaTV.png"},
  {id:"jamuna",name:"Jamuna TV",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"asia",
    url:"https://bozztv.com/rongo/rongo-JamunaTelevision/index.m3u8",quality:"1080p",
    backup:"https://tvsen6.aynaott.com/jamunatv/index.m3u8",
    logo:"https://iptv-org.github.io/iptv/logos/JamunaTV.png"},
  {id:"rtv",name:"RTV Bangladesh",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"asia",
    url:"https://bozztv.com/rongo/rongo-RTV/index.m3u8",quality:"1080p",
    backup:"https://tvsen5.aynaott.com/RtvHD/index.m3u8",
    logo:"https://iptv-org.github.io/iptv/logos/RTV.png"},
  {id:"somoy",name:"Somoy News TV",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"asia",
    url:"https://owrcovcrpy.gpcdn.net/bpk-tv/1702/output/index.m3u8",quality:"1080p",
    backup:"https://bozztv.com/rongo/rongo-somoy/index.m3u8",
    logo:"https://iptv-org.github.io/iptv/logos/SomoyTV.png"},
  {id:"channel24bd",name:"Channel 24",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"asia",
    url:"https://owrcovcrpy.gpcdn.net/bpk-tv/1703/output/index.m3u8",quality:"1080p",
    backup:"https://bozztv.com/rongo/rongo-Channel24HD/index.m3u8",
    logo:"https://iptv-org.github.io/iptv/logos/Channel24.png"},
  {id:"independenttv",name:"Independent TV",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"asia",
    url:"https://owrcovcrpy.gpcdn.net/bpk-tv/1704/output/index.m3u8",quality:"1080p",
    backup:"https://bozztv.com/rongo/rongo-IndependentTV/index.m3u8",
    logo:"https://iptv-org.github.io/iptv/logos/IndependentTV.png"},
  {id:"ekattor",name:"Ekattor TV",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"asia",
    url:"https://owrcovcrpy.gpcdn.net/bpk-tv/1705/output/index.m3u8",quality:"1080p",
    logo:"https://iptv-org.github.io/iptv/logos/EkattorTV.png"},
  {id:"atnnews",name:"ATN News",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"asia",
    url:"https://owrcovcrpy.gpcdn.net/bpk-tv/1706/output/index.m3u8",quality:"1080p",
    backup:"https://bozztv.com/rongo/rongo-ATNNews/index.m3u8",
    logo:"https://iptv-org.github.io/iptv/logos/ATNNews.png"},
  {id:"news24bd",name:"News 24 BD",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"asia",
    url:"https://owrcovcrpy.gpcdn.net/bpk-tv/1708/output/index.m3u8",
    backup:"https://vidcdn.vidgyor.com/news24-origin/liveabr/playlist.m3u8",
    quality:"1080p",logo:"https://iptv-org.github.io/iptv/logos/News24Bangladesh.png"},
  {id:"dbcnews",name:"DBC News",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"asia",
    url:"https://owrcovcrpy.gpcdn.net/bpk-tv/1728/output/index.m3u8",quality:"1080p",
    logo:"https://iptv-org.github.io/iptv/logos/DBCNews.png"},
  {id:"atnbangla",name:"ATN Bangla",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"asia",
    url:"https://tvsen5.aynaott.com/atnbangla/index.m3u8",quality:"720p",
    logo:"https://iptv-org.github.io/iptv/logos/ATNBangla.png"},
  {id:"ekushey",name:"Ekushey TV",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"asia",
    url:"https://tvsen6.aynaott.com/etv/index.m3u8",quality:"720p",
    backup:"https://ekusheyserver.com/etvlivesn.m3u8",
    logo:"https://iptv-org.github.io/iptv/logos/EkusheyTV.png"},
  {id:"satv",name:"SA TV",flag:"\ud83c\udde7\ud83c\udde9",country:"Bangladesh",region:"asia",
    url:"https://tvsen6.aynaott.com/satv/index.m3u8",quality:"720p",
    logo:"https://iptv-org.github.io/iptv/logos/SATV.png"},

  // \u2500\u2500 MIDDLE EAST \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  {id:"mbc1",name:"MBC 1",flag:"\ud83c\udde6\ud83c\uddea",country:"UAE",region:"middleeast",
    url:"https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-1-na/eec141533c90dd34722c503a296dd0d8/index.m3u8",
    quality:"1080p",logo:"https://iptv-org.github.io/iptv/logos/MBC1.png"},
  {id:"mbc4",name:"MBC 4",flag:"\ud83c\udde6\ud83c\uddea",country:"UAE",region:"middleeast",
    url:"https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-4/24f134f1cd63db9346439e96b86ca6ed/index.m3u8",
    quality:"1080p",logo:"https://iptv-org.github.io/iptv/logos/MBC4.png"},

  // \u2500\u2500 INTERNATIONAL \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  {id:"nhkworld",name:"NHK World Japan",flag:"\ud83c\uddef\ud83c\uddf5",country:"Japan",region:"asia",
    url:"https://masterpl.hls.nhkworld.jp/hls/w/live/smarttv.m3u8",
    quality:"1080p",logo:"https://iptv-org.github.io/iptv/logos/NHKWorldJapan.png"},
  {id:"skynewsau",name:"Sky News Australia",flag:"\ud83c\udde6\ud83c\uddfa",country:"Australia",region:"oceania",
    url:"https://skynewsau-live.akamaized.net/hls/live/2002689/skynewsau-extra1/master.m3u8",
    quality:"540p",logo:"https://iptv-org.github.io/iptv/logos/SkyNewsExtra.png"},
  {id:"lasestrellas",name:"Las Estrellas",flag:"\ud83c\uddf2\ud83c\uddfd",country:"Mexico",region:"americas",
    url:"https://channel01-onlymex.akamaized.net/hls/live/2022749/event01/index.m3u8",
    quality:"1080p",logo:"https://iptv-org.github.io/iptv/logos/LasEstrellas.png"},
];`;

// Find and replace the FEATURED block
const startMarker = 'const FEATURED: Channel[] = [';
const endMarker = '];\n\n\nconst MAIN_TABS';
const altEndMarker = '];\n\n\nconst LEAGUES';

let startIdx = content.indexOf(startMarker);
let endIdx = content.indexOf(endMarker);
if (endIdx === -1) endIdx = content.indexOf(altEndMarker);
if (endIdx === -1) {
  // Try finding the closing ];
  endIdx = content.indexOf('\n];\n', startIdx) + 3;
}

console.log('Start:', startIdx, 'End:', endIdx);
if (startIdx === -1 || endIdx === -1) { console.log('ERROR: Could not find markers'); process.exit(1); }

const newContent = content.substring(0, startIdx) + newFEATURED + '\n\n\n' + content.substring(endIdx + 2); // skip the ];
fs.writeFileSync('src/app/page.tsx', newContent, 'utf8');
console.log('SUCCESS: File updated. New length:', newContent.length);
