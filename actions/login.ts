"use server";

import { signIn } from "@/auth";
import { loginFormSchema } from "@/schemas/login-form";

import { z } from "zod";

export const login = async (values: z.infer<typeof loginFormSchema>) => {
  const result = loginFormSchema.safeParse(values);

  if (!result.success) {
    console.log(result.error);
    return;
  }

  const { email, password } = result.data;

  try {
    await signIn("credentials", { email, password, redirectTo: "/user" });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
