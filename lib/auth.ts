import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { loginAuthSchema } from "@/lib/validations/auth";
import { checkPassword } from "@/lib/utils";
import { LoginWrongEmailError, LoginWrongPasswordError } from "@/lib/errors";
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 30 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const creds = await loginAuthSchema.parseAsync(credentials);

        const user = await db.user.findFirst({
          where: {
            email: creds.email,
          },
        });

        if (!user) {
          throw new LoginWrongEmailError();
        }

        const isvalidPassword = await checkPassword(
          creds.password,
          user.password
        );

        if (!isvalidPassword) {
          throw new LoginWrongPasswordError();
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        token.id = user.id;
        return token;
      }

      return {
        id: dbUser.id,
        email: dbUser.email,
        organizationId: dbUser.organizationId,
      };
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.organizationId = token.organizationId;
      }
      return session;
    },
  },
};
