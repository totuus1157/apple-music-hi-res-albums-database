import { neon } from "@neondatabase/serverless";
import { NextApiResponse, NextApiRequest } from "next";

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== "DELETE") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { productId, registrantId } = request.body;

    console.log("Request Body:", request.body); // Outputs the received request body to the console

    if (!productId || !registrantId) {
      throw new Error("productId and registrantId are required");
    }

    // Check format of productId (string of digits 0-9 only)
    const productIdPattern = /^[0-9]+$/;
    if (!productIdPattern.test(productId)) {
      throw new Error(
        "productId must be a string of digits (0-9) with no length restriction",
      );
    }

    await sql`
      DELETE FROM albums
      WHERE product_id = ${productId} AND registrant_id = ${registrantId};
    `;

    return response.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.error("Error:", error); // Output errors to console
    return response.status(500).json({ error: error });
  }
}
