import type { NextApiRequest, NextApiResponse } from "next";
import { getSql } from "@/lib/db";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const artist = String(request.body.artist ?? "");
    const title = String(request.body.title ?? "");
    const genre = String(request.body.genre ?? "");
    const composer = String(request.body.composer ?? "");
    const productId = String(request.body.productId ?? "");
    const sampleRate = String(request.body.sampleRate ?? "");
    const registrantId = String(request.body.registrantId ?? "");
    const storefront = String(request.body.storefront ?? "");

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
      return response.status(400).json({ error: "All fields are required" });
    }

    // Check format of productId (string of digits 0-9 only)
    if (!/^[0-9]+$/.test(productId)) {
      return response.status(400).json({
        error:
          "productId must be a string of digits (0-9) with no length restriction",
      });
    }

    // Check value of sampleRate
    const validSampleRates = ["88.2", "96", "176.4", "192"];
    if (!validSampleRates.includes(sampleRate)) {
      return response.status(400).json({
        error: "sampleRate must be one of: 88.2, 96, 176.4, 192",
      });
    }

    // storefront: ISO 3166-1 alpha-2
    if (!/^[a-zA-Z]{2}$/.test(storefront)) {
      return response.status(400).json({ error: "Invalid country code" });
    }

    const sql = getSql();

    // Add duplicate check query
    const existing = await sql`
      SELECT 1
      FROM albums
      WHERE product_id = ${productId}
      LIMIT 1;
    `;

    const existingRows = Array.isArray(existing) ? existing : (existing as { rows: unknown[] }).rows;

    if (existingRows.length > 0) {
      return response.status(409).json({
        message: "Album with this product_id already exists.",
      });
    }

    await sql`
      INSERT INTO albums (
        artist,
        title,
        genre,
        composer,
        product_id,
        sample_rate,
        registrant_id,
        storefront
      )
      VALUES (
        ${artist},
        ${title},
        ${genre},
        ${composer},
        ${productId},
        ${sampleRate},
        ${registrantId},
        ${storefront}
      );
    `;

    return response.status(200).json({ message: "Album added successfully" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Failed to add album" });
  }
}
