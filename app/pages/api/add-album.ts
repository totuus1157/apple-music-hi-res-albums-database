import { sql } from "@vercel/postgres";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Ensure all parameters are treated as strings
    const artist = String(request.body.artist);
    const title = String(request.body.title);
    const genre = String(request.body.genre);
    const composer = String(request.body.composer);
    const productId = String(request.body.productId);
    const sampleRate = String(request.body.sampleRate);
    const registrantId = String(request.body.registrantId);

    if (
      !artist ||
      !title ||
      !genre ||
      !composer ||
      !productId ||
      !sampleRate ||
      !registrantId
    ) {
      throw new Error("All fields are required");
    }

    // Check format of productId (string of digits 0-9 only)
    const productIdPattern = /^[0-9]+$/;
    if (!productIdPattern.test(productId)) {
      throw new Error(
        "productId must be a string of digits (0-9) with no length restriction",
      );
    }

    // Check value of sampleRate
    const validSampleRates = ["88.2", "96", "176.4", "192"];
    if (!validSampleRates.includes(sampleRate)) {
      throw new Error(
        "sampleRate must be one of the following: 88.2, 96, 176.4, 192",
      );
    }

    await sql`
      INSERT INTO albums (artist, title, genre, composer, product_id, sample_rate, registrant_id)
      VALUES (${artist}, ${title}, ${genre}, ${composer}, ${productId}, ${sampleRate}, ${registrantId});
    `;

    return response.status(200).json({ message: "Album added successfully" });
  } catch (error: any) {
    return response.status(500).json({ error: error.message });
  }
}
