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

    const albumsPromise = sql`
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
      ORDER BY id DESC
      OFFSET ${offset}
      LIMIT ${limit};
    `;

    const countPromise = sql`SELECT COUNT(*) FROM albums;`;

    const [albumsResult, countResult] = await Promise.all([
      albumsPromise,
      countPromise,
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
