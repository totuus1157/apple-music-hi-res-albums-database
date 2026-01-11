"use client";

import Script from "next/script";

export default function KofiWidget() {
  return (
    <Script
      src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
      strategy="afterInteractive"
      onLoad={(): void => {
        window.kofiWidgetOverlay.draw("anzumaru_software", {
          type: "floating-chat",
          "floating-chat.donateButton.text": "Support Us",
          "floating-chat.donateButton.background-color": "#fcbf47",
          "floating-chat.donateButton.text-color": "#323842",
        });
      }}
    />
  );
}
