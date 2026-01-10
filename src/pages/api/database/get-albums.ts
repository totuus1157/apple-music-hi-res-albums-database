import type { NextApiRequest, NextApiResponse } from "next";
import { getSql } from "@/lib/db";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<void> {
  try {
    const page = Number(request.query.page) || 1;
    const limit = Number(request.query.limit) || 50;
    const offset = (page - 1) * limit;

    const filters = request.query.filters
      ? JSON.parse(request.query.filters as string)
      : {};

    const sortMode = (request.query.sort as string) || "id_desc";

    const { isEditMode, userID } = request.query;
    const isEditModeEnabled = isEditMode === "true";

    const whereClauses: string[] = [];
    const values: unknown[] = [];

    if (filters.artist) {
      whereClauses.push(`artist = $${values.length + 1}`);
      values.push(filters.artist);
    }

    if (filters.genre) {
      whereClauses.push(`$${values.length + 1} = ANY(genre)`);
      values.push(filters.genre);
    }

    if (filters.composer) {
      whereClauses.push(`$${values.length + 1} = ANY(composer)`);
      values.push(filters.composer);
    }

    if (filters.sampleRate) {
      whereClauses.push(`sample_rate = $${values.length + 1}`);
      values.push(filters.sampleRate);
    }

    if (isEditModeEnabled && userID) {
      whereClauses.push(`registrant_id = $${values.length + 1}`);
      values.push(userID);
    }

    const whereClause =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    // Sorting
    let orderByClause = "ORDER BY a.id DESC";
    if (sortMode === "likes_desc") {
      orderByClause = "ORDER BY like_count DESC, a.id DESC";
    } else if (sortMode === "random") {
      orderByClause = "ORDER BY RANDOM()";
    }

    const totalAlbumsQuery = `
      SELECT COUNT(*) AS count
      FROM albums
      ${whereClause};
    `;

    const albumsQuery = `
      SELECT
        a.id,
        a.product_id,
        a.title,
        a.artist,
        ARRAY(
          SELECT unnest(a.genre)
          EXCEPT
          VALUES ('Music'), ('Musica'), ('Música'), ('Musique'), ('ミュージック')
        ) AS genre,
        a.composer,
        a.sample_rate,
        a.registrant_id,
        a.created_at,
        a.updated_at,
        a.storefront,
        COALESCE(lc.like_count, 0) AS like_count
      FROM albums a
      LEFT JOIN (
        SELECT album_id, COUNT(*) AS like_count
        FROM likes
        GROUP BY album_id
      ) lc ON lc.album_id = a.product_id
      ${whereClause}
      ${orderByClause}
      OFFSET $${values.length + 1}
      LIMIT $${values.length + 2};
    `;

    const sql = getSql();

    const [countResult, albumsResult] = await Promise.all([
      sql.query(totalAlbumsQuery, values),
      sql.query(albumsQuery, [...values, offset, limit]),
    ]);

    const countRows = Array.isArray(countResult)
      ? countResult
      : countResult.rows;
    const totalAlbums = Number(
      (countRows[0] as { count: string | number }).count,
    );

    const albumsRows = Array.isArray(albumsResult)
      ? albumsResult
      : albumsResult.rows;

    return response.status(200).json({
      albums: { rows: albumsRows },
      totalAlbums,
    });
  } catch (err) {
    console.error("Error fetching albums:", err);
    return response.status(500).json({
      message: "An error occurred while fetching albums.",
    });
  }
}
