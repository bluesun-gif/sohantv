import { NextResponse } from "next/server";

export const runtime = "nodejs";

const API_KEY = "2f4f74f9e700487ca5e65983a1de4efb";
const BASE_URL = "https://api.football-data.org/v4";

// Simple in-process cache
interface CacheEntry {
  data: any;
  timestamp: number;
}

const cache: Record<string, CacheEntry> = {};
const MATCHES_CACHE_TTL = 60 * 1000; // 1 minute cache for matches
const METRICS_CACHE_TTL = 10 * 60 * 1000; // 10 minutes cache for standings/scorers

function getCached(key: string, ttl: number): any | null {
  const entry = cache[key];
  if (entry && Date.now() - entry.timestamp < ttl) {
    console.log(`[Cache Hit] Key: ${key}`);
    return entry.data;
  }
  return null;
}

function setCached(key: string, data: any) {
  cache[key] = {
    data,
    timestamp: Date.now()
  };
}

async function fetchFromFootballData(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "X-Auth-Token": API_KEY,
    },
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`football-data.org error: ${res.status} ${errorText}`);
  }

  return res.json();
}

// -------------------------------------------------------------
// OpenLigaDB Mappers (German Bundesliga Fallback/Direct Loader)
// -------------------------------------------------------------
async function fetchBundesligaMatchesOpenLiga(): Promise<any[]> {
  try {
    const res = await fetch("https://api.openligadb.de/getmatchdata/bl1");
    if (!res.ok) throw new Error("OpenLigaDB failed");
    const data = await res.json();
    return data.map((m: any) => ({
      id: m.matchID,
      competition: { name: "Bundesliga", code: "BL1", emblem: "https://crests.football-data.org/BL1.png" },
      utcDate: m.matchDateTimeUTC || m.matchDateTime,
      status: m.matchIsFinished ? "FINISHED" : (m.goals && m.goals.length > 0 ? "LIVE" : "UPCOMING"),
      minute: m.matchIsFinished ? "FT" : (m.goals && m.goals.length > 0 ? "In Play" : null),
      homeTeam: { name: m.team1.teamName, crest: m.team1.teamIconUrl },
      awayTeam: { name: m.team2.teamName, crest: m.team2.teamIconUrl },
      score: {
        home: m.matchResults?.find((r: any) => r.resultName === "Endergebnis")?.pointsTeam1 ?? m.matchResults?.[0]?.pointsTeam1 ?? null,
        away: m.matchResults?.find((r: any) => r.resultName === "Endergebnis")?.pointsTeam2 ?? m.matchResults?.[0]?.pointsTeam2 ?? null
      },
      goals: m.goals?.map((g: any) => `${g.goalGetterName} ${g.matchMinute}'`) || []
    }));
  } catch (err) {
    console.error("OpenLigaDB fetch matches failed:", err);
    return [];
  }
}

async function fetchBundesligaStandingsOpenLiga(): Promise<any[]> {
  try {
    const currentYear = new Date().getFullYear() - (new Date().getMonth() < 7 ? 1 : 0);
    const res = await fetch(`https://api.openligadb.de/getbltable/bl1/${currentYear}`);
    if (!res.ok) throw new Error("OpenLigaDB failed");
    const data = await res.json();
    return data.map((t: any, idx: number) => ({
      position: idx + 1,
      team: { name: t.teamName, crest: t.teamIconUrl },
      playedGames: t.matches,
      won: t.won,
      draw: t.draw,
      lost: t.lost,
      points: t.points,
      goalsFor: t.goals,
      goalsAgainst: t.opponentGoals,
      goalDifference: t.goalDiff
    }));
  } catch (err) {
    console.error("OpenLigaDB fetch standings failed:", err);
    return [];
  }
}

async function fetchBundesligaScorersOpenLiga(): Promise<any[]> {
  try {
    const currentYear = new Date().getFullYear() - (new Date().getMonth() < 7 ? 1 : 0);
    const res = await fetch(`https://api.openligadb.de/getgoalgetters/bl1/${currentYear}`);
    if (!res.ok) throw new Error("OpenLigaDB failed");
    const data = await res.json();
    return data.slice(0, 15).map((g: any) => ({
      name: g.goalGetterName,
      team: { name: "Bundesliga Team", crest: "" },
      goals: g.goalCount,
      assists: null,
      penalties: null
    }));
  } catch (err) {
    console.error("OpenLigaDB fetch scorers failed:", err);
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "matches";
  const league = searchParams.get("league") || "PL"; // PL, PD, BL1, SA, CL

  const cacheKey = `${type}_${league}`;

  try {
    // Check Cache
    const ttl = type === "matches" ? MATCHES_CACHE_TTL : METRICS_CACHE_TTL;
    const cachedData = getCached(cacheKey, ttl);
    if (cachedData) {
      return NextResponse.json({ ...cachedData, cached: true });
    }

    if (type === "matches") {
      let matches: any[] = [];
      let source = "football-data.org";

      try {
        const raw = await fetchFromFootballData("/matches");
        matches = (raw.matches || []).map((m: any) => ({
          id: m.id,
          competition: {
            name: m.competition.name,
            code: m.competition.code,
            emblem: m.competition.emblem
          },
          utcDate: m.utcDate,
          status: m.status === "IN_PLAY" || m.status === "LIVE" ? "LIVE" : m.status === "FINISHED" ? "FINISHED" : "UPCOMING",
          minute: m.status === "IN_PLAY" || m.status === "LIVE" ? "In Play" : m.status === "FINISHED" ? "FT" : null,
          homeTeam: { name: m.homeTeam.name, crest: m.homeTeam.crest },
          awayTeam: { name: m.awayTeam.name, crest: m.awayTeam.crest },
          score: {
            home: m.score.fullTime.home,
            away: m.score.fullTime.away
          },
          goals: []
        }));
      } catch (err) {
        console.warn("Matches fetch from football-data.org failed, trying OpenLigaDB fallback for Bundesliga...", err);
        // Fallback to Bundesliga matches from OpenLigaDB
        matches = await fetchBundesligaMatchesOpenLiga();
        source = "openligadb.de (fallback)";
      }

      const result = { success: true, matches, source, updatedAt: new Date().toISOString() };
      setCached(cacheKey, result);
      return NextResponse.json(result);
    }

    if (type === "standings") {
      let standings: any[] = [];
      let source = "football-data.org";

      if (league === "BL1") {
        standings = await fetchBundesligaStandingsOpenLiga();
        source = "openligadb.de";
      } else {
        try {
          const raw = await fetchFromFootballData(`/competitions/${league}/standings`);
          const table = raw.standings?.[0]?.table || [];
          standings = table.map((t: any) => ({
            position: t.position,
            team: { name: t.team.name, crest: t.team.crest },
            playedGames: t.playedGames,
            won: t.won,
            draw: t.draw,
            lost: t.lost,
            points: t.points,
            goalsFor: t.goalsFor,
            goalsAgainst: t.goalsAgainst,
            goalDifference: t.goalDifference
          }));
        } catch (err) {
          console.warn(`Standings fetch for ${league} failed. Check API key status.`, err);
          if (league === "BL1") {
            standings = await fetchBundesligaStandingsOpenLiga();
            source = "openligadb.de (fallback)";
          } else {
            throw err;
          }
        }
      }

      const result = { success: true, standings, source, updatedAt: new Date().toISOString() };
      setCached(cacheKey, result);
      return NextResponse.json(result);
    }

    if (type === "scorers") {
      let scorers: any[] = [];
      let source = "football-data.org";

      if (league === "BL1") {
        scorers = await fetchBundesligaScorersOpenLiga();
        source = "openligadb.de";
      } else {
        try {
          const raw = await fetchFromFootballData(`/competitions/${league}/scorers`);
          const list = raw.scorers || [];
          scorers = list.map((s: any) => ({
            name: s.player.name,
            team: { name: s.team.name, crest: s.team.crest },
            goals: s.goals,
            assists: s.assists || null,
            penalties: s.penalties || null
          }));
        } catch (err) {
          console.warn(`Scorers fetch for ${league} failed. Check API key status.`, err);
          throw err;
        }
      }

      const result = { success: true, scorers, source, updatedAt: new Date().toISOString() };
      setCached(cacheKey, result);
      return NextResponse.json(result);
    }

    return NextResponse.json({ success: false, error: "Invalid type parameter" }, { status: 400 });

  } catch (err: any) {
    console.error("Football API proxy execution error:", err);
    return NextResponse.json({
      success: false,
      error: err.message || String(err),
      matches: [],
      standings: [],
      scorers: []
    }, { status: 500 });
  }
}
