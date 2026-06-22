import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const target = searchParams.get("url");

  if (!target) {
    return new NextResponse("Missing ?url= parameter", { status: 400 });
  }

  let targetUrl: string;
  try {
    targetUrl = decodeURIComponent(target);
  } catch {
    return new NextResponse("Invalid URL encoding", { status: 400 });
  }

  if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
    return new NextResponse("Only http/https URLs allowed", { status: 403 });
  }

  // ─── SEGMENT PASSTHROUGH ───────────────────────────────────────────────────
  const isSegment = /\.(ts|aac|mp4|m4s|vtt|key)(\?|$)/i.test(targetUrl);
  if (isSegment) {
    const parsedTarget = new URL(targetUrl);
    const targetHost = parsedTarget.hostname;
    const hasCors = targetHost.includes("gpcdn.net") || targetHost.includes("akamaized.net") ||
                    targetHost.includes("amagi.tv") || targetHost.includes("pishow.tv") ||
                    targetHost.includes("vidgyor.com") || targetHost.includes("cloudfront.net") ||
                    targetHost.includes("aynaott.com") || targetHost.includes("tvsen") ||
                    targetHost.includes("bozztv.com") || targetHost.includes("rongo") ||
                    targetHost.includes("chowdhury-shaheb.com") || targetHost.includes("btvlive.gov.bd");
    if (hasCors) {
      return NextResponse.redirect(targetUrl, {
        status: 302,
        headers: {
          ...corsHeaders(),
          "Cache-Control": "no-cache",
        },
      });
    }
    // If no CORS, we must proxy it below!
  }
  // ──────────────────────────────────────────────────────────────────────────

  let baseUrl: string;
  try {
    const parsed = new URL(targetUrl);
    const lastSlash = parsed.pathname.lastIndexOf("/");
    baseUrl = `${parsed.protocol}//${parsed.host}${parsed.pathname.substring(0, lastSlash + 1)}`;
  } catch {
    return new NextResponse("Invalid target URL", { status: 400 });
  }

  try {
    const parsedTarget = new URL(targetUrl);
    const targetHost = parsedTarget.hostname;
    const targetOrigin = parsedTarget.origin;

    const headers: Record<string, string> = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "Connection": "keep-alive",
      "Cache-Control": "no-cache",
    };

    if (targetHost.includes("gpcdn.net")) {
      headers["Referer"] = "https://www.gptv.com.bd/";
      headers["Origin"] = "https://www.gptv.com.bd";
    } else if (targetHost.includes("tmaxapp") || targetHost.includes("soccerball") || targetHost.includes("tvdsz") || targetHost.includes("rgkkw") ||
               targetHost.includes("rockstreamer") || targetHost.includes("toffeelive") || targetHost.includes("edge2caster") ||
               targetHost.includes("jdnzrgm") || targetHost.includes("ultrastream") || targetHost.includes("cloudflarestream") ||
               targetHost.includes("cloudfront") || targetHost.includes("googleapis")) {
      headers["User-Agent"] = "ExoPlayer";
    } else if (targetHost.includes("aynaott.com") || targetHost.includes("tvsen")) {
      headers["Referer"] = "https://aynaott.com/";
      headers["Origin"] = "https://aynaott.com";
    } else if (targetHost.includes("bozztv.com")) {
      headers["Referer"] = "https://bozztv.com/";
      headers["Origin"] = "https://bozztv.com";
    } else if (targetHost.includes("chowdhury-shaheb.com")) {
      headers["Referer"] = "https://aynaott.com/";
      headers["Origin"] = "https://aynaott.com";
    } else if (targetHost.includes("btvlive.gov.bd")) {
      headers["Referer"] = "https://www.btvlive.gov.bd/";
      headers["Origin"] = "https://www.btvlive.gov.bd";
    } else if (targetHost.includes("aynaott.com")) {
      headers["Referer"] = "https://www.aynaott.com/";
      headers["Origin"] = "https://www.aynaott.com";
    } else if (targetHost.includes("bozztv.com")) {
      headers["Referer"] = "https://bozztv.com/";
      headers["Origin"] = "https://bozztv.com";
    } else if (targetHost.includes("rbmn-live")) {
      headers["Referer"] = "https://www.redbull.com/";
      headers["Origin"] = "https://www.redbull.com";
    } else if (targetHost.includes("daioncdn.net")) {
      headers["Referer"] = "https://www.cinergroup.com.tr/";
      headers["Origin"] = "https://www.cinergroup.com.tr";
    } else if (targetHost.includes("aloula") || targetHost.includes("vercel.app")) {
      headers["Referer"] = "https://www.aloula.sa/";
      headers["Origin"] = "https://www.aloula.sa";
    } else if (targetHost.includes("pishow.tv") || targetHost.includes("cdn-6") || targetHost.includes("cdn-7")) {
      headers["Referer"] = "https://pishow.tv/";
      headers["Origin"] = "https://pishow.tv";
    } else if (targetHost.includes("cloudfront.net")) {
      headers["Referer"] = "https://plus.fifa.com/";
    } else if (targetHost.includes("madanichannel.tv")) {
      headers["Referer"] = "https://madanichannel.tv/";
      headers["Origin"] = "https://madanichannel.tv";
    } else if (targetHost.includes("gbplayer.cc")) {
      headers["X-Requested-With"] = "com.blaze.sportzfy";
      headers["Referer"] = "https://gbplayer.cc/";
      headers["Origin"] = "https://gbplayer.cc";
    } else if (targetHost.includes("akamaized.net") || targetHost.includes("akamai")) {
      headers["Referer"] = targetOrigin + "/";
    } else if (targetHost.includes("vidgyor.com")) {
      headers["Referer"] = "https://vidgyor.com/";
      headers["Origin"] = "https://vidgyor.com";
    } else {
      headers["Referer"] = targetOrigin + "/";
      headers["Origin"] = targetOrigin;
    }

    const upstream = await fetch(targetUrl, {
      method: "GET",
      headers,
      signal: AbortSignal.timeout(15000),
      // @ts-ignore
      cache: "no-store",
    });

    if (!upstream.ok) {
      return new NextResponse(`Upstream error: ${upstream.status} ${upstream.statusText}`, {
        status: upstream.status,
        headers: corsHeaders(),
      });
    }

    const upstreamContentType = upstream.headers.get("content-type") ?? "";
    const isM3U8 =
      targetUrl.match(/\.(m3u8|php)(\?|$)/i) ||
      upstreamContentType.includes("mpegurl") ||
      upstreamContentType.includes("x-mpegURL");

    if (isM3U8) {
      const text = await upstream.text();
      const rewritten = rewriteM3U8(text, baseUrl, req);
      return new NextResponse(rewritten, {
        status: 200,
        headers: {
          "Content-Type": "application/vnd.apple.mpegurl",
          ...corsHeaders(),
          "Cache-Control": "no-cache, no-store",
        },
      });
    }

    // For any other text-based content (XML, JSON, etc.), stream it through
    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers: {
        "Content-Type": upstreamContentType || "application/octet-stream",
        ...corsHeaders(),
        "Cache-Control": "no-cache, no-store",
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return new NextResponse(`Proxy error: ${msg}`, { status: 502, headers: corsHeaders() });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "*",
  };
}

function rewriteM3U8(text: string, baseUrl: string, req: NextRequest): string {
  const proto = req.headers.get("x-forwarded-proto") || "http";
  const host = req.headers.get("host") || "localhost:3000";
  const origin = `${proto}://${host}`;
  const proxyBase = `${origin}/api/proxy?url=`;

  const makeProxied = (url: string): string => {
    if (url.startsWith("/api/proxy")) return url;
    const absolute = toAbsolute(url, baseUrl);
    if (!absolute.startsWith("http")) return url;

    // For .ts segments on CORS-enabled CDNs: use direct URL (no proxy needed)
    // This avoids the Next.js binary streaming hang issue
    const isSeg = /\.(ts|aac|mp4|m4s|vtt|key)(\?|$)/i.test(absolute);
    const parsed = (() => { try { return new URL(absolute); } catch { return null; } })();
    const host = parsed?.hostname ?? "";
    const hasCors = host.includes("gpcdn.net") || host.includes("akamaized.net") ||
                    host.includes("amagi.tv") || host.includes("pishow.tv") ||
                    host.includes("vidgyor.com") || host.includes("cloudfront.net") ||
                    host.includes("aynaott.com") || host.includes("tvsen") ||
                    host.includes("bozztv.com") || host.includes("rongo") ||
                    host.includes("chowdhury-shaheb.com") || host.includes("btvlive.gov.bd");

    if (isSeg && hasCors) {
      // Direct URL — browser fetches segment straight from CDN
      return absolute;
    }

    // All other URLs (sub-playlists, encryption keys): proxy them
    return `${proxyBase}${encodeURIComponent(absolute)}`;
  };

  return text.split("\n").map((line) => {
    const t = line.trim();
    if (!t) return line;
    if (t.startsWith("#")) return line.replace(/URI="([^"]+)"/g, (_m: string, uri: string) =>
      (uri.startsWith("http") || uri.startsWith("/")) ? `URI="${makeProxied(uri)}"` : `URI="${uri}"`
    );
    if (t.startsWith("http://") || t.startsWith("https://")) return makeProxied(t);
    if (!t.startsWith("#") && !t.includes("://") && t.length > 0) return makeProxied(t);
    return line;
  }).join("\n");
}

function toAbsolute(url: string, baseUrl: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) {
    try { const b = new URL(baseUrl); return `${b.protocol}//${b.host}${url}`; } catch { return url; }
  }
  return `${baseUrl}${url}`;
}
