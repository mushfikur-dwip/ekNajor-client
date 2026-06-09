import { NextResponse } from "next/server";
import { getArticle } from "@/lib/api";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const item = await getArticle(id);

  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(
    { item },
    {
      headers: {
        "cache-control": "public, s-maxage=120, stale-while-revalidate=300"
      }
    }
  );
}
