"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { StrapiErrors } from "../custom/StrapiErrors";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { registerUserAction } from "@/app/data/actions/auth-actions";
import { ZodErrors } from "@/app/components/custom/ZodErrors";
import { SubmitButton } from "../custom/SubmitButton";

const INITIAL_STATE = {
    data: null,
};
export function SignupForm() {

    const [formState, formAction] = useFormState(registerUserAction, INITIAL_STATE);

    console.log(formState);
     
    return (
        <div className="w-full max-w-md">
            <form action={formAction}>
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold">Sign  Up</CardTitle>
                        <CardDescription>Enter your details to create a new account.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input 
                              id="username" 
                              type="text"
                              name="username"
                              placeholder="username" 
                            />
                           <ZodErrors error={formState?.zodErrors?.username} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email"
                              name="email"
                              placeholder="name@gmail.com" 
                            />
                            <ZodErrors error={formState?.zodErrors?.email} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                              id="password" 
                              type="password"
                              name="password"
                              placeholder="password" 
                            />
                            <ZodErrors error={formState?.zodErrors?.password} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <SubmitButton className="w-full" text="Sign Up" loadingText="Loading" />
                        <StrapiErrors error={formState?.strapiErrors} />
                    </CardFooter>
                </Card>
                <div className="mt-4 text-center text-sm">
                    Have an account?
                    <Link className="underline ml-2" href="signin">Sign In</Link>
                </div>
            </form>
        </div>
    )
}