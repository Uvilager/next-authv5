"use server";

import { db } from "@/database/db";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { registerFormSchema } from "@/schemas/register-form";
import bcrypt from "bcrypt";

import { z } from "zod";

const getUserByEmail = async (email: string) => {
  const user = await db.select().from(users).where(eq(users.email, email));

  if (user.length === 0) {
    console.log("User does not exist");
    return null;
  }
  console.log("server user", user);
  return user;
};

export const register = async (values: z.infer<typeof registerFormSchema>) => {
  console.log(values);
  //verify with zod
  const result = registerFormSchema.safeParse(values);
  if (!result.success) {
    console.log(result.error);
    return;
  }
  const { email, password, username } = result.data;

  //check if user exists
  const user = await getUserByEmail(email);
  console.log(user);
  if (user) {
    console.log("User already exists");
    return;
  }

  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  //create user
  const newUser = {
    email,
    password: hashedPassword,
    name: values.username,
  };
  await db.insert(users).values(newUser);
  console.log("New user created", newUser);
};
