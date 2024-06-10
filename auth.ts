import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

import bcrypt from "bcrypt";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { db } from "./database/db";
import { users } from "./database/schema";
import { loginFormSchema } from "./schemas/login-form";

const getUserByEmail = async (email: string) => {
  const user = await db.select().from(users).where(eq(users.email, email));

  if (user.length === 0) {
    console.log("User does not exist");
    return null;
  }
  console.log("server user", user);
  return user[0];
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: DrizzleAdapter(db),
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        const result = loginFormSchema.safeParse(credentials);

        if (!result.success) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = result.data;

        // logic to verify if user exists
        user = await getUserByEmail(email);

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        const passwordsMatch = await bcrypt.compare(password, user.password!);
        if (passwordsMatch) {
          // return user object with the their profile data
          console.log("Passwords match");
          console.log(user);
          return user;
        }
        return null;
      },
    }),
  ],
});
