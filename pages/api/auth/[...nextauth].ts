import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import prisma from '@/lib/db'
import { loginAuthSchema } from "@/lib/validations/auth"
import { checkPassword } from "@/lib/auth"
import { LoginWrongEmailError, LoginWrongPasswordError } from "@/lib/errors"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 30 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const creds = await loginAuthSchema.parseAsync(credentials)

        const user = await prisma.user.findFirst({
          where: {
            email: creds.email
          }
        })

        if (!user) {
          throw new LoginWrongEmailError()
        }

        const isvalidPassword = await checkPassword(creds.password, user.password)

        if (!isvalidPassword) {
          throw new LoginWrongPasswordError()
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name
        }

      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id
      }
      return session
    }
  }
}

export default NextAuth(authOptions)
