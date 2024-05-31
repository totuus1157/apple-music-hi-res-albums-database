import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<void> {
  const { artist, genre, composer, sample_rate } = request.query;

  try {
    const artist = request.query.artist as string;
    const genre = request.query.genre as string;
    const composer = request.query.composer as string;
    const sample_rate = request.query.sample_rate as string;

    let albums;
    if (artist && genre && composer && sample_rate) {
      // All parameters are present
      albums = await sql`
        SELECT * FROM albums
        WHERE artist = ${artist}
        AND ${genre} = ANY(genre)
        AND ${composer} = ANY(composer)
        AND sample_rate = ${sample_rate};
      `;
    } else if (artist && genre && composer) {
      // artist, genre, composer
      albums = await sql`
        SELECT * FROM albums
        WHERE artist = ${artist}
        AND ${genre} = ANY(genre)
        AND ${composer} = ANY(composer);
      `;
    } else if (artist && genre && sample_rate) {
      // artist, genre, sample_rate
      albums = await sql`
        SELECT * FROM albums
        WHERE artist = ${artist}
        AND ${genre} = ANY(genre)
        AND sample_rate = ${sample_rate};
      `;
    } else if (artist && composer && sample_rate) {
      // artist, composer, sample_rate
      albums = await sql`
        SELECT * FROM albums
        WHERE artist = ${artist}
        AND ${composer} = ANY(composer)
        AND sample_rate = ${sample_rate};
      `;
    } else if (genre && composer && sample_rate) {
      // genre, composer, sample_rate
      albums = await sql`
        SELECT * FROM albums
        WHERE ${genre} = ANY(genre)
        AND ${composer} = ANY(composer)
        AND sample_rate = ${sample_rate};
      `;
    } else if (artist && genre) {
      // artist, genre
      albums = await sql`
        SELECT * FROM albums
        WHERE artist = ${artist}
        AND ${genre} = ANY(genre);
      `;
    } else if (artist && composer) {
      // artist, composer
      albums = await sql`
        SELECT * FROM albums
        WHERE artist = ${artist}
        AND ${composer} = ANY(composer);
      `;
    } else if (artist && sample_rate) {
      // artist, sample_rate
      albums = await sql`
        SELECT * FROM albums
        WHERE artist = ${artist}
        AND sample_rate = ${sample_rate};
      `;
    } else if (genre && composer) {
      // genre, composer
      albums = await sql`
        SELECT * FROM albums
        WHERE ${genre} = ANY(genre)
        AND ${composer} = ANY(composer);
      `;
    } else if (genre && sample_rate) {
      // genre, sample_rate
      albums = await sql`
        SELECT * FROM albums
        WHERE ${genre} = ANY(genre)
        AND sample_rate = ${sample_rate};
      `;
    } else if (composer && sample_rate) {
      // composer, sample_rate
      albums = await sql`
        SELECT * FROM albums
        WHERE ${composer} = ANY(composer)
        AND sample_rate = ${sample_rate};
      `;
    } else if (artist) {
      // artist
      albums = await sql`
        SELECT * FROM albums
        WHERE artist = ${artist};
      `;
    } else if (genre) {
      // genre
      albums = await sql`
        SELECT * FROM albums
        WHERE ${genre} = ANY(genre);
      `;
    } else if (composer) {
      // composer
      albums = await sql`
        SELECT * FROM albums
        WHERE ${composer} = ANY(composer);
      `;
    } else if (sample_rate) {
      // sample_rate
      albums = await sql`
        SELECT * FROM albums
        WHERE sample_rate = ${sample_rate};
      `;
    } else {
      // No parameters
      albums = await sql`SELECT * FROM albums;`;
    }

    return response.status(200).json({ albums });
  } catch (err: any) {
    console.error("Database query error:", err);
    return response
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
}
