"use server";
import { z } from "zod";
import { registerUserService } from "../services/auth-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
}

const schemaRegister = z.object({
   username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
   }),
   password: z.string().min(6, {
    message: "Password must be at least 6 and 100 characters",
   }),
   email: z.string().email({
    message: "Please enter a valid email address"
   }),
});

export async function  registerUserAction(prevState: any,formData: FormData) {
  console.log("Hello from Register User Action");

  const validateFields = schemaRegister.safeParse({
      username: formData.get("username"),
      password: formData.get("password"),
      email: formData.get("email")
  });

  if (!validateFields.success) {
      return {
          ...prevState,
          zodErrors: validateFields.error.flatten().fieldErrors,
          strapiErrors: null,
          message: "Missing Fields. Failed to Register",
      };
  }

  const responseData = await registerUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    };
  }

  cookies().set("jwt", responseData.jwt, config);
  redirect("/dashboard");
}