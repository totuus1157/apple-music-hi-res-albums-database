export async function GET(request: Request): Promise<Response> {
  try {
    const response = await fetch("https://api.music.apple.com/v1/storefronts", {
      headers: {
        Authorization: `Bearer ${process.env.APPLE_MUSIC_API_KEY}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      let errorMessage = "An error occurred while processing the request.";

      switch (response.status) {
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

      return new Response(JSON.stringify({ error: errorMessage }), {
        status: response.status,
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
