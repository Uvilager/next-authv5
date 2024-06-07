"use server";

import { registerFormSchema } from "@/schemas/register-form";
import { z } from "zod";

export const register = (values: z.infer<typeof registerFormSchema>) => {
  console.log(values);
};
