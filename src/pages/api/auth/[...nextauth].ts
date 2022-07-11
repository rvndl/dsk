import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "dsk",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      authorize(credentials, req) {
        if (credentials?.password === process.env.DSK_PASSWORD) {
          return {
            loggedIn: true,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.loggedIn = user.loggedIn;
      }

      return token;
    },
    session({ session, token }) {
      if (token) {
        session.loggedIn = token.loggedIn;
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions);
