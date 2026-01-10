import type { NextApiRequest, NextApiResponse } from "next";
import { getSql } from "@/lib/db";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== "DELETE") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { productId, registrantId } = request.body;

    console.log("Request Body:", request.body);

    if (!productId || !registrantId) {
      return response
        .status(400)
        .json({ error: "productId and registrantId are required" });
    }

    // Check format of productId (string of digits 0-9 only)
    const productIdPattern = /^[0-9]+$/;
    if (!productIdPattern.test(productId)) {
      return response.status(400).json({
        error:
          "productId must be a string of digits (0-9) with no length restriction",
      });
    }

    const sql = getSql();

    await sql`
      DELETE FROM albums
      WHERE product_id = ${productId}
        AND registrant_id = ${registrantId};
    `;

    return response
      .status(200)
      .json({ message: "Album deleted successfully" });
  } catch (error) {
    console.error("Error deleting album:", error);
    return response.status(500).json({
      error: "Failed to delete album",
    });
  }
}
