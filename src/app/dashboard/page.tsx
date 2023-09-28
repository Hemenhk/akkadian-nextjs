"use client"

import React from "react";
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

const formSchema = z.object({
  announcementText: z
    .string()
    .min(5, {
      message: "The announcement text must be at least 5 characters",
    })
    .trim(),
  announcementColor: z
    .string()
    .min(2, {
      message: "The announcement text must be at least 2 characters",
    })
    .trim(),
});

export default function Dashboard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      announcementColor: "",
      announcementText: "",
    },
  });

  const onSubmit = () => {}
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
            name="announcementText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Announcement Text</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="announcement text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="announcementColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Announcement Color</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="announcement color"
                    {...field}
                  />
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
