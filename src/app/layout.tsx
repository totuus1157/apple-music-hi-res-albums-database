import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAdScript } from "components/googleads-script";
import "styles/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Apple Music Hi-Res Albums Database",
    default: "Apple Music Hi-Res Albums Database",
  },
  openGraph: {
    title: "Apple Music Hi-Res Albums Database",
    description:
      "Explore and share Hi-Res Lossless albums on Apple Music with our comprehensive database. Discover new music and contribute by adding your favorite high-quality albums.",
    url: "https://www.applemusichiresalbumsdb.com",
    siteName: "Apple Music Hi-Res Albums Database",
    images: {
      url: "https://www.applemusichiresalbumsdb.com/api/og",
      width: 1200,
      height: 630,
    },
    locale: "en_US",
    type: "website",
  },
  icons: { icon: "/favicon.ico", apple: "/favicon.ico" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body>
          {children}
          <Analytics />
        </body>
        <GoogleAdScript />
      </html>
    </>
  );
}
