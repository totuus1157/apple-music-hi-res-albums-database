import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import {
  GoogleAdScript,
  AdBlockRecoveryScript,
  AdBlockWarning,
} from "app/googleads-script";
import CookieConsentWidgetScript from "app/cookie-consent-widget-script";
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
    "Find your Apple Music Hi-Res Lossless albums list here! Discover, register, and share high-quality music. Explore our comprehensive database tailored for audiophiles. Join us now!",
  openGraph: {
    title: "Apple Music Hi-Res Albums Database",
    description:
      "Find your Apple Music Hi-Res Lossless albums list here! Discover, register, and share high-quality music. Explore our comprehensive database tailored for audiophiles. Join us now!",
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
          <Providers>{children}</Providers>
          <Analytics />
          <GoogleAdScript />
        </body>
        <AdBlockRecoveryScript />
        <AdBlockWarning />
        <CookieConsentWidgetScript />
      </html>
    </>
  );
}
