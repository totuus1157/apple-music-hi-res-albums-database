import { sql } from "@vercel/postgres";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const registrantId = request.query.registrantId as string;
    if (!registrantId) throw new Error("Registrant ID required");

    const albums = await sql`
      SELECT * FROM albums WHERE registrant_id = ${registrantId} ORDER BY id DESC;
    `;

    return response.status(200).json({ albums });
  } catch (error: any) {
    return response.status(500).json({ error: error.message });
  }
}
