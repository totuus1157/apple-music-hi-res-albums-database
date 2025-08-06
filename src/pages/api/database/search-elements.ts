import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<void> {
  try {
    const { category, query, filters } = request.query;
    const filterQuery = typeof query === "string" ? query : "";
    const likeQuery = `%${filterQuery}%`;

    const validCategories = ["artist", "genre", "composer", "sampleRate"];
    if (!category || !validCategories.includes(category as string)) {
      return response.status(400).json({
        message: "Invalid or missing 'category' parameter.",
      });
    }

    const columnMap: Record<string, string> = {
      artist: "artist",
      genre: "genre",
      composer: "composer",
      sampleRate: "sample_rate",
    };
    const columnName = columnMap[category as string];

    const parsedFilters = filters ? JSON.parse(filters as string) : {};

    const whereClauses = [];
    const values = [];

    if (parsedFilters.artist && category !== "artist") {
      whereClauses.push(`albums.artist = $${values.length + 1}`);
      values.push(parsedFilters.artist);
    }
    if (parsedFilters.genre && category !== "genre") {
      whereClauses.push(`'${parsedFilters.genre}' = ANY(albums.genre)`);
    }
    if (parsedFilters.composer && category !== "composer") {
      whereClauses.push(`'${parsedFilters.composer}' = ANY(albums.composer)`);
    }
    if (parsedFilters.sampleRate && category !== "sampleRate") {
      whereClauses.push(`albums.sample_rate = $${values.length + 1}`);
      values.push(parsedFilters.sampleRate);
    }

    let result;

    if (category === "artist" || category === "sampleRate") {
      whereClauses.push(`${columnName} ILIKE $${values.length + 1}`);
      values.push(likeQuery);

      const finalWhereClause =
        whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

      const sqlQuery = `
        SELECT DISTINCT ${columnName} AS element
        FROM albums
        ${finalWhereClause}
        ORDER BY element ASC;
      `;
      result = await sql.query(sqlQuery, values);
    } else {
      whereClauses.push(`element ILIKE $${values.length + 1}`);
      values.push(likeQuery);

      const genreExclusionList = [
        "Music",
        "Musica",
        "Música",
        "Musique",
        "ミュージック",
      ];
      if (category === "genre") {
        const placeholder = genreExclusionList
          .map((_, i) => `$${values.length + i + 1}`)
          .join(", ");
        whereClauses.push(`element NOT IN (${placeholder})`);
        values.push(...genreExclusionList);
      }

      const finalWhereClause =
        whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

      const sqlQuery = `
        SELECT DISTINCT element
        FROM albums, unnest(albums.${columnName}) AS element
        ${finalWhereClause}
        ORDER BY element ASC;
      `;
      result = await sql.query(sqlQuery, values);
    }

    const elements = result.rows.map((row) => row.element);

    return response.status(200).json({ elements });
  } catch (err) {
    console.error("Error fetching elements:", err);
    return response.status(500).json({
      message: "An error occurred while fetching elements.",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
