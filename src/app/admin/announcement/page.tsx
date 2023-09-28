"use client";

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
  announcementText: z.string(),
  announcementColor: z.string(),
});

export default function AnnouncementPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      announcementColor: "",
      announcementText: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(
       " /api/auth/admin-dashboard/announcement",
        values
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-8 pt-6">
      <h1 className="tracking-wide pl-4">Edit Announcement Bar</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full px-4"
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
          <Button
            className="w-full rounded-sm px-16 uppercase tracking-widest"
            type="submit"
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
