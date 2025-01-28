import { UserProvider } from "@auth0/nextjs-auth0/client";
import { HeroUIProvider } from "@heroui/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HeroUIProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </HeroUIProvider>
  );
}
export default MyApp;
