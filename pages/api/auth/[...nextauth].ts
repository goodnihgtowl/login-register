import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "../../../Schema/User";
import connectDB from "../../../lib/connectDB";
// import User from "@/lib/resources/Models/user";

interface Icredential{
  email: string | undefined,
  password: string | undefined
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        await connectDB();
        const { email, password }: Icredential = credentials;

        // Find user by email
        const user = await User.findOne({ email: email });
        if (user === null) {
          throw new Error('Cannot find user');
        }

        // Check if password from input matches with the one from db
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        console.log(`Comparing ${password} to ${user.password}`);
        console.log("match ?", isPasswordMatched);
        // Throw error when it doesn't
        if (!isPasswordMatched)
        // if (password !== '123')
        {
          throw new Error('Invalid email or password');
        }

        // Return authorized user
        return user;
      },
      credentials: undefined
    }),
  ],
};

export default NextAuth(authOptions);
