"use server";

import { loginFormSchema } from "@/schemas/login-form";
import { z } from "zod";

export const login = (values: z.infer<typeof loginFormSchema>) => {
  console.log(values);
};
