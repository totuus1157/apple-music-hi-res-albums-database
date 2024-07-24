"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PUBLISHER_ID = "1513283119557667";

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

type GoogleAdProps = {
  slot: string;
  format?: string;
  responsive?: string;
  style?: any;
};

const GoogleAd = ({
  slot,
  format = "auto",
  responsive = "true",
  style,
}: GoogleAdProps) => {
  let pathname = usePathname();
  pathname = pathname ? pathname : "";

  useEffect((): void => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, [pathname]);

  return (
    <div key={pathname.replace(/\//g, "-") + "-" + slot}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", ...style }}
        data-ad-client={`ca-pub-${PUBLISHER_ID}`}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};

export default GoogleAd;
