import { Metadata } from "next";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
  title: "Data Table",
  description: "Manage Hi-Res Lossless albums data.",
  robots: { index: false, follow: false },
};

export default function DatatableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </>
  );
}
