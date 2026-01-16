import { Metadata } from "next";
import {
  GoogleAdScript,
  AdBlockRecoveryScript,
  AdBlockWarning,
} from "app/googleads-script";
import CookieConsentWidgetScript from "app/cookie-consent-widget-script";
import CloudflareAnalytics from "app/cloudflare-analytics";
import "app/globals.css";
import { Providers } from "app/providers";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: {
    template: "%s | Apple Music Hi-Res Albums Database",
    default: "Apple Music Hi-Res Albums Database",
  },
  description:
    "Discover over 40,000 Apple Music Hi-Res albums in our searchable database. Filter by artist, genre, composer, or sample rate to find exactly what you’re looking for.",
  openGraph: {
    title: "Apple Music Hi-Res Albums Database",
    description:
      "Discover over 40,000 Apple Music Hi-Res albums in our searchable database. Filter by artist, genre, composer, or sample rate to find exactly what you’re looking for.",
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
  twitter: { card: "summary_large_image" },
  appleWebApp: { title: "Hi-Res DB" },
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
          <Providers>{children}</Providers>
          <GoogleAdScript />
          <CloudflareAnalytics />
        </body>
        <AdBlockRecoveryScript />
        <AdBlockWarning />
        <CookieConsentWidgetScript />
      </html>
    </>
  );
}
