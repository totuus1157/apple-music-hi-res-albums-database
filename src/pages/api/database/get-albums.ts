import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<void> {
  try {
    const albums = await sql`SELECT * FROM albums ORDER BY id DESC;`;
    return response.status(200).json({ albums });
  } catch (err) {
    console.error("Error fetching albums:", err);
    return response.status(500).json({
      message: "An error occurred while fetching albums.",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
