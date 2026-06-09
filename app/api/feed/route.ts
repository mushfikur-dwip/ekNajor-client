import { NextResponse } from "next/server";
import { getFeed } from "@/lib/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = await getFeed(searchParams.get("category") ?? undefined).catch(() => ({
    items: [],
    nextCursor: null
  }));
  return NextResponse.json(data, {
    headers: {
      "cache-control": "public, s-maxage=30, stale-while-revalidate=120"
    }
  });
}
