import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";

export default NextAuth({
  providers: [
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
  ],
});
