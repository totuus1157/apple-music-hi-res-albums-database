import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL!);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const albumId = searchParams.get("album_id");
  const userId = searchParams.get("user_id");

  if (!albumId || !userId) {
    return NextResponse.json(
      { error: "album_id and user_id are required" },
      { status: 400 },
    );
  }

  try {
    const rows = await sql`
      SELECT 1
      FROM likes
      WHERE album_id = ${albumId} AND user_id = ${userId}
      LIMIT 1;
    `;

    return NextResponse.json({ liked: rows.length > 0 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch like state" },
      { status: 500 },
    );
  }
}
