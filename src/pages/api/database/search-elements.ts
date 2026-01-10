import type { NextApiRequest, NextApiResponse } from "next";
import { getSql } from "@/lib/db";

type ElementRow = { element: string };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<void> {
  try {
    const { category, query, filters } = request.query;

    const filterQuery = typeof query === "string" ? query : "";
    const likeQuery = `%${filterQuery}%`;

    const validCategories = ["artist", "genre", "composer", "sampleRate"] as const;
    if (!category || !validCategories.includes(category as string as typeof validCategories[number])) {
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

    const parsedFilters =
      typeof filters === "string" ? JSON.parse(filters) : {};

    const whereClauses: string[] = [];
    const values: unknown[] = [];

    if (parsedFilters.artist && category !== "artist") {
      whereClauses.push(`albums.artist = $${values.length + 1}`);
      values.push(parsedFilters.artist);
    }

    if (parsedFilters.genre && category !== "genre") {
      whereClauses.push(`$${values.length + 1} = ANY(albums.genre)`);
      values.push(parsedFilters.genre);
    }

    if (parsedFilters.composer && category !== "composer") {
      whereClauses.push(`$${values.length + 1} = ANY(albums.composer)`);
      values.push(parsedFilters.composer);
    }

    if (parsedFilters.sampleRate && category !== "sampleRate") {
      whereClauses.push(`albums.sample_rate = $${values.length + 1}`);
      values.push(parsedFilters.sampleRate);
    }

    const sql = getSql();
    let rows: ElementRow[];

    if (category === "artist" || category === "sampleRate") {
      whereClauses.push(`${columnName} ILIKE $${values.length + 1}`);
      values.push(likeQuery);

      const where =
        whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

      const queryText = `
        SELECT DISTINCT ${columnName} AS element
        FROM albums
        ${where}
        ORDER BY element ASC;
      `;

      rows = (await sql.query(queryText, values)) as ElementRow[];
    } else {
      whereClauses.push(`element ILIKE $${values.length + 1}`);
      values.push(likeQuery);

      if (category === "genre") {
        const exclusionList = [
          "Music",
          "Musica",
          "Música",
          "Musique",
          "ミュージック",
        ];

        const placeholders = exclusionList
          .map((_, i) => `$${values.length + i + 1}`)
          .join(", ");

        whereClauses.push(`element NOT IN (${placeholders})`);
        values.push(...exclusionList);
      }

      const where =
        whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

      const queryText = `
        SELECT DISTINCT element
        FROM albums, unnest(albums.${columnName}) AS element
        ${where}
        ORDER BY element ASC;
      `;

      rows = (await sql.query(queryText, values)) as ElementRow[];
    }

    const elements = rows.map((row) => row.element);
    return response.status(200).json({ elements });
  } catch (err) {
    console.error("Error fetching elements:", err);
    return response.status(500).json({
      message: "An error occurred while fetching elements.",
    });
  }
}
