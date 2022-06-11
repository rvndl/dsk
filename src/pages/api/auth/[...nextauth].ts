import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
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
        session.loggedIn = token.LoggedIn;
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
