import { neon } from "@neondatabase/serverless";
import { NextApiResponse, NextApiRequest } from "next";

const sql = neon(process.env.DATABASE_URL!);

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
    const storefront = String(request.body.storefront);

    if (
      !artist ||
      !title ||
      !genre ||
      !composer ||
      !productId ||
      !sampleRate ||
      !registrantId ||
      !storefront
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

    // Check value of storefront
    const storefrontRegex = /^[a-zA-Z]{2}$/;
    if (!storefrontRegex.test(storefront)) {
      throw new Error("Invalid country code");
    }

    // Add duplicate check query
    const existingAlbum =
      await sql`SELECT id FROM albums WHERE product_id = ${productId};`;
    // Handle both array and { rows: T[] } formats
    const existingRows = Array.isArray(existingAlbum) ? existingAlbum : (existingAlbum as { rows: unknown[] }).rows;
    if (existingRows.length > 0) {
      return response
        .status(409)
        .json({ message: "Album with this product_id already exists." });
    }

    await sql`
      INSERT INTO albums (artist, title, genre, composer, product_id, sample_rate, registrant_id, storefront)
      VALUES (${artist}, ${title}, ${genre}, ${composer}, ${productId}, ${sampleRate}, ${registrantId}, ${storefront});
    `;

    return response.status(200).json({ message: "Album added successfully" });
  } catch (error) {
    return response.status(500).json({ error: error });
  }
}
