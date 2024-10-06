import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "GET") {
      const response = await fetch(
        `https://api.music.apple.com/v1/storefronts`,
        {
          headers: {
            Authorization: `Bearer ${process.env.APPLE_MUSIC_API_KEY}`,
          },
        },
      );

      const data: string = await response.json();
      const code = response.status;

      if (response.ok) {
        return res.status(code).json(data);
      } else {
        let errorMessage = "An error occurred while processing the request.";

        switch (code) {
          case 401:
            errorMessage =
              "Unauthorized: A response indicating an incorrect Authorization header.";
            break;
          case 500:
            errorMessage =
              "Internal Server Error: A response indicating an error occurred on the server.";
            break;
          default:
            errorMessage = "An error occurred while processing the request.";
        }
      }
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({
      error: "Internal Server Error ",
    });
  }
}
