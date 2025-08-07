import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<void> {
  try {
    const sampleRateQuery = `
      SELECT
        sample_rate,
        COUNT(*) AS count
      FROM albums
      GROUP BY
        sample_rate
      ORDER BY
        sample_rate;
    `;

    const genreQuery = `
      SELECT
        unnest(filtered_genre) AS genre_name,
        COUNT(*)
      FROM (
        SELECT
          ARRAY(
            SELECT unnest(genre)
            EXCEPT
            VALUES ('Music'), ('Musica'), ('Música'), ('Musique'), ('ミュージック')
          ) AS filtered_genre
        FROM albums
      ) AS subquery
      WHERE
        filtered_genre IS NOT NULL AND array_length(filtered_genre, 1) > 0
      GROUP BY
        genre_name
      ORDER BY
        count DESC;
    `;

    const [sampleRateResult, genreResult] = await Promise.all([
      sql.query(sampleRateQuery),
      sql.query(genreQuery),
    ]);

    const sampleRateStats = sampleRateResult.rows.map((row) => ({
      label: row.sample_rate,
      value: Number(row.count),
    }));

    const genreStats = genreResult.rows.map((row) => ({
      label: row.genre_name,
      value: Number(row.count),
    }));

    return response.status(200).json({ sampleRateStats, genreStats });
  } catch (err) {
    console.error("Error fetching album stats:", err);
    return response.status(500).json({
      message: "An error occurred while fetching album stats.",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
