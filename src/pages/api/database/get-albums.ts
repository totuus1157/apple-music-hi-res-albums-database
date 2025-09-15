import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

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

    const isRandom = request.query.random === "true";

    const { isEditMode, userID } = request.query;
    const isEditModeEnabled = isEditMode === "true";

    const whereClauses = [];
    const values = [];

    if (filters.artist) {
      whereClauses.push(`artist = $${values.length + 1}`);
      values.push(filters.artist);
    }
    if (filters.genre) {
      whereClauses.push(`'${filters.genre}' = ANY(genre)`);
    }
    if (filters.composer) {
      whereClauses.push(`'${filters.composer}' = ANY(composer)`);
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

    const orderByClause = isRandom ? "ORDER BY RANDOM()" : "ORDER BY id DESC";

    const totalAlbumsQuery = `SELECT COUNT(*) FROM albums ${whereClause};`;
    const albumsQuery = `
      SELECT
        id,
        product_id,
        title,
        artist,
        ARRAY(
          SELECT unnest(genre)
          EXCEPT
          VALUES ('Music'), ('Musica'), ('Música'), ('Musique'), ('ミュージック')
        ) AS genre,
        composer,
        sample_rate,
        registrant_id,
        created_at,
        updated_at,
        storefront
      FROM albums
      ${whereClause}
      ${orderByClause}
      OFFSET $${values.length + 1}
      LIMIT $${values.length + 2};
    `;

    const [countResult, albumsResult] = await Promise.all([
      sql.query(totalAlbumsQuery, values),
      sql.query(albumsQuery, [...values, offset, limit]),
    ]);

    const totalAlbums = Number(countResult.rows[0].count);

    return response.status(200).json({ albums: albumsResult, totalAlbums });
  } catch (err) {
    console.error("Error fetching albums:", err);
    return response.status(500).json({
      message: "An error occurred while fetching albums.",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
