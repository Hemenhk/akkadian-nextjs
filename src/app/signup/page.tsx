"use client";

import React, { FormEvent, useState } from "react";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(2, {
      message: "Password must be at least 2 characters.",
    })
    .trim(),
});

export default function SignupPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Validate form data using Zod

      // Send a POST request to the API route
      await axios.post("/api/adminAuth", values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Redirect the user or show a success message
      // router.push("/");
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof z.ZodError) {
        console.error("Zod validation error:", error.errors);
      } else {
        console.error("Error:", error);
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-10">
      <h2 className="font-bold">Create Admin</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8  w-[70%] lg:w-[600px] px-16"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full rounded-sm px-16" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
