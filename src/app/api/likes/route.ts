import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";

type LikeCountRow = {
  like_count: number;
};

/**
 * GET /api/likes?album_id=xxx
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const albumId = searchParams.get("album_id");

  if (!albumId) {
    return NextResponse.json(
      { error: "album_id is required" },
      { status: 400 },
    );
  }

  try {
    const sql = getSql();

    const rows = (await sql`
      SELECT COUNT(*)::int AS like_count
      FROM likes
      WHERE album_id = ${albumId};
    `) as LikeCountRow[];

    return NextResponse.json({ like_count: rows[0]?.like_count ?? 0 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch like count" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/likes
 */
export async function POST(req: NextRequest) {
  try {
    const { album_id, user_id } = await req.json();

    if (!album_id || !user_id) {
      return NextResponse.json(
        { error: "album_id and user_id are required" },
        { status: 400 },
      );
    }

    const sql = getSql();

    await sql`
      INSERT INTO likes (album_id, user_id)
      VALUES (${album_id}, ${user_id})
      ON CONFLICT (album_id, user_id) DO NOTHING;
    `;

    return NextResponse.json({ message: "Like added successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to add like" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/likes
 */
export async function DELETE(req: NextRequest) {
  try {
    const { album_id, user_id } = await req.json();

    if (!album_id || !user_id) {
      return NextResponse.json(
        { error: "album_id and user_id are required" },
        { status: 400 },
      );
    }

    const sql = getSql();

    await sql`
      DELETE FROM likes
      WHERE album_id = ${album_id}
        AND user_id = ${user_id};
    `;

    return NextResponse.json({ message: "Like removed successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to remove like" },
      { status: 500 },
    );
  }
}
