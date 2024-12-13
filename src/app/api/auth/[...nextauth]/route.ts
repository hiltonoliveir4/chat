import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { redirect } from "next/navigation";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "login with credentials",
      credentials: {},
      async authorize(credentials: any) {
        const { email, password } = credentials || {};
        if (email && password) {
          try {
            const response = await fetch("http://localhost:8000/api/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            });

            const res = await response.json();

            return res.user
          } catch (error) {
            return null
          }
        }
        return null;
      },
    }),
    CredentialsProvider({
      id: "register",
      name: "register user",
      credentials: {},
      async authorize(credentials: any) {
        const { email, password, confirmPassword, name } = credentials || {};
        if (email && password && name && confirmPassword) {
          try {
            const response = await fetch("http://localhost:8000/api/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password, password_confirmation: confirmPassword, name }),
            });

            const res = await response.json();

            return res.user
          } catch (error) {
            return null
          }
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
