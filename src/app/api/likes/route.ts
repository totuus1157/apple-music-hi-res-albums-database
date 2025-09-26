import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL!);

/**
 * GET /api/likes?album_id=xxx
 *   → 指定アルバムの「いいね」数を返す
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
    const rows = await sql`
      SELECT COUNT(*)::int AS like_count
      FROM likes
      WHERE album_id = ${albumId};
    `;
    return NextResponse.json({ like_count: rows[0].like_count });
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
 * body: { album_id: string, user_id: string }
 *   → 新しい「いいね」を追加
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

    await sql`
      INSERT INTO likes (album_id, user_id)
      VALUES (${album_id}, ${user_id})
      ON CONFLICT (album_id, user_id) DO NOTHING;
    `;

    return NextResponse.json({ message: "Like added successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to add like" }, { status: 500 });
  }
}

/**
 * DELETE /api/likes
 * body: { album_id: string, user_id: string }
 *   → 「いいね」を取り消し
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

    await sql`
      DELETE FROM likes
      WHERE album_id = ${album_id} AND user_id = ${user_id};
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
