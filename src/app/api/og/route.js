import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 50,
          background: "linear-gradient(to bottom right, #00ffff, #ffffff)",
          color: "#333",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "50px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{ fontWeight: "bold", fontSize: "80px", marginBottom: "60px" }}
        >
          Apple Music Hi-Res Albums Database
        </div>
        <div style={{ fontSize: "38px" }}>
          Discover over 10,000 Apple Music Hi-Res albums in our searchable
          database.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
