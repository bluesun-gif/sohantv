import { NextResponse } from "next/server";

const API_KEY = "43e90021161a472a4bafc7bd6b6787a4";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "live"; // "live" | "today"

  const headers = {
    "x-apisports-key": API_KEY,
    "Accept": "application/json",
  };

  try {
    let url =
      type === "live"
        ? "https://v1.cricket.api-sports.io/fixtures?live=all"
        : `https://v1.cricket.api-sports.io/fixtures?date=${new Date().toISOString().split("T")[0]}`;

    const res = await fetch(url, { headers, next: { revalidate: 60 } });

    if (res.ok) {
      const data = await res.json();
      if (data?.response?.length) {
        return NextResponse.json({ source: "api-sports", data: data.response });
      }
    }
  } catch (e) {
    console.error("api-sports cricket failed:", e);
  }

  // Fallback: cricapi.com (truly free, no key needed)
  try {
    const endpoint =
      type === "live"
        ? "https://api.cricapi.com/v1/currentMatches?apikey=ccbdexmm3q&offset=0"
        : "https://api.cricapi.com/v1/cricScore?apikey=ccbdexmm3q";

    const res = await fetch(endpoint, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      const raw = data?.data || [];
      const mapped = raw.map((m: any) => ({
        fixture: {
          id: m.id || Math.random(),
          date: m.dateTimeGMT || m.date || new Date().toISOString(),
          status: {
            short: m.matchStarted ? (m.matchEnded ? "FT" : "LIVE") : "NS",
            elapsed: null,
          },
        },
        league: { name: m.series || "Cricket", logo: "", country: m.t1 || "" },
        teams: {
          home: { name: m.t1 || "Team 1", logo: m.t1img || "", winner: null },
          away: { name: m.t2 || "Team 2", logo: m.t2img || "", winner: null },
        },
        scores: {
          home: { innings: m.t1s || null },
          away: { innings: m.t2s || null },
        },
        matchType: m.matchType || "",
        venue: m.venue || "",
      }));
      return NextResponse.json({ source: "cricapi", data: mapped });
    }
  } catch (e) {
    console.error("cricapi fallback failed:", e);
  }

  return NextResponse.json({ source: "none", data: [] });
}
