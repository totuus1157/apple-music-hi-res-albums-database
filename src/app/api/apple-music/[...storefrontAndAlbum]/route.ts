export async function GET(
  request: Request,
  { params }: { params: Promise<{ storefrontAndAlbum: string[] }> },
): Promise<Response> {
  const { storefrontAndAlbum } = await params;

  // If the parameter is an array and the number of elements is not 2, a 400 error will occur.
  if (!Array.isArray(storefrontAndAlbum) || storefrontAndAlbum.length !== 2) {
    return new Response(JSON.stringify({ error: "Invalid parameters." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const [storefrontId, albumId] = storefrontAndAlbum; // Extract storefrontId and albumId from URL

  try {
    const response = await fetch(
      `https://api.music.apple.com/v1/catalog/${storefrontId}/albums/${albumId}?extend=audioVariants`,
      {
        headers: {
          Authorization: `Bearer ${process.env.APPLE_MUSIC_API_KEY}`,
        },
      },
    );

    const data = await response.json();
    const code = response.status;

    if (response.ok) {
      return new Response(JSON.stringify(data), {
        status: code,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      let errorMessage = "An error occurred while processing the request.";

      switch (code) {
        case 400:
          errorMessage = "Bad Request: The request wasn’t accepted as formed.";
          break;
        case 401:
          errorMessage = "Unauthorized: Authorization is missing or invalid.";
          break;
        case 403:
          errorMessage =
            "Forbidden: Authentication issue or incorrect authentication.";
          break;
        case 404:
          errorMessage = "Not Found: The requested resource doesn’t exist.";
          break;
        case 429:
          errorMessage =
            "Too Many Requests: The user has made too many requests.";
          break;
        case 500:
          errorMessage =
            "Internal Server Error: There’s an error processing the request.";
          break;
        case 503:
          errorMessage =
            "Service Unavailable: The service is currently unavailable.";
          break;
        default:
          errorMessage = "An error occurred while processing the request.";
      }

      return new Response(JSON.stringify({ error: errorMessage }), {
        status: code,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
