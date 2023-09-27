import { verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import AdminAuth from "@/models/adminAuth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        
      },
      async authorize(credentials, req) {
        await connectToDatabase();
        if (!credentials) {
          throw new Error("Credentials are missing");
        }

      
        const adminUser = await AdminAuth.findOne({ email: credentials?.email }).select("+password");

        if (!adminUser) {
          throw new Error("No admin was found");
        }

        const validPassword = await verifyPassword(
          credentials?.password || "",
          adminUser.password
        );

        if (!validPassword) {
          throw new Error("Password was incorrect!");
        }

        if (validPassword) {
          console.log(validPassword)
          return {
            id: adminUser._id,
            email: adminUser.email,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
