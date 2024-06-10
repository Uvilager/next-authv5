"use server";

import { signIn } from "@/auth";
import { loginFormSchema } from "@/schemas/login-form";
import { redirect } from "next/dist/server/api-utils";
import { z } from "zod";

export const login = async (values: z.infer<typeof loginFormSchema>) => {
  const result = loginFormSchema.safeParse(values);

  if (!result.success) {
    console.log(result.error);
    return;
  }

  const { email, password } = result.data;

  await signIn("credentials", { email, password });

  console.log(values);
};
