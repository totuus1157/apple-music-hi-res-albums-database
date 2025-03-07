"use client";

import { useEffect } from "react";

export default function BuyMeACoffee() {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("data-name", "BMC-Widget");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    script.setAttribute("data-id", "anzumaru_software");
    script.setAttribute("data-description", "Support me on Buy me a coffee!");
    script.setAttribute(
      "data-message",
      "Thank you for visiting. You can now buy me a coffeee.",
    );
    script.setAttribute("data-color", "#FF813F");
    script.setAttribute("data-position", "Right");
    script.setAttribute("data-x_margin", "18");
    script.setAttribute("data-y_margin", "18");
    script.async = true;

    script.onload = function () {
      const event = new CustomEvent("DOMContentLoaded", {
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      const widget = document.getElementById("bmc-wbtn");
      if (widget) {
        document.body.removeChild(widget);
      }
    };
  }, []);

  return null;
}
