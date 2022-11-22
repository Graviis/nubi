import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  pages: {
    signIn: "/auth/login",
  },
});

export const config = { matcher: ["/histories", "/"] };
