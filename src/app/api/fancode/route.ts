import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "lib", "fancode_streams.json");
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const streams = JSON.parse(fileContent);
      return NextResponse.json({
        success: true,
        streams,
        count: streams.length,
        updatedAt: new Date().toISOString(),
        source: "local_cache"
      });
    }
    return NextResponse.json({ success: false, error: "Database file not found", streams: [] }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || String(err), streams: [] }, { status: 500 });
  }
}
