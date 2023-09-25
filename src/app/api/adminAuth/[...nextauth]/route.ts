import { verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import AdminAuth from "@/models/adminAuth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { type: "password" },
      },
      name: "Credentials",
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credentials are missing");
        }

        await connectToDatabase();

        const adminUser = await AdminAuth.findOne({ email: credentials.email });

        if (!adminUser) {
          throw new Error("No admin was found");
        }

        const validPassword = await verifyPassword(
          credentials.password,
          adminUser.password
        );

        if (!validPassword) {
          throw new Error("Password was incorrect!");
        }

        // Return a user object with an 'id' property
        return {
          id: adminUser._id.toString(), // Convert ObjectId to string
          email: adminUser.email,
        };
      },
    }),
  ],
});
