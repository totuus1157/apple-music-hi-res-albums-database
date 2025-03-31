import Script from "next/script";

export default function CookieConsentWidgetScript() {
  if (process.env.VERCEL_ENV === "production") {
    return (
      <Script src="https://app.getterms.io/cookie-consent/embed/d46bb90b-161c-465a-9ddd-581e0370700a/en-us" />
    );
  }
  return <></>;
}
