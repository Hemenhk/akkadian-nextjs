"use client";

import React, { useEffect } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";

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
import { redirect, useRouter } from "next/navigation";
import axios from "axios";

const formSchema = z.object({
  oldPassword: z.string().min(8, {
    message: "Old password must be at least 8 characters.",
  }),
  newPassword: z
    .string()
    .min(8, {
      message: "New password must be at least 2 characters.",
    })
    .trim(),
});

export default function ChangePassword() {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("form values", values);
    try {
      await axios.patch("/api/auth/change-password", values);
    } catch (error: any) {
      if (error.response) {
        // The error has a response property, so it's an HTTP error response
        console.error(
          "HTTP error:",
          error.response.status,
          error.response.data
        );
      } else {
        // It's a different type of error (e.g., network error)
        console.error("Error:", error.message);
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-10">
      <h2 className="font-bold">Change Password</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8  w-[70%] lg:w-[600px] px-16"
        >
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="old password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="new password" {...field} />
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
