"use client";

import React, { useEffect, useState } from "react";
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
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  announcementText: z.string(),
  announcementColor: z.string(),
});

export default function AnnouncementPage() {
  const [announcementColor, setAnnouncementColor] = useState("");
  const [announcementText, setAnnouncementText] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/auth/admin-dashboard/announcement");
        setAnnouncementColor(res.data.announcementValue[0].announcementColor);
        setAnnouncementText(res.data.announcementValue[0].announcementText);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      announcementColor: "",
      announcementText: "",
    },
    values: {
      announcementColor: announcementColor,
      announcementText: announcementText,
    },
  });

  const goBackHandler = () => {
    router.push("/admin");
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
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
      <div className="pl-4 text-gray-800 transition ease-out duration-300 hover:text-gray-600">
        <BsFillArrowLeftCircleFill
          size={30}
          cursor={"pointer"}
          onClick={goBackHandler}
        />
      </div>
      <h1 className="tracking-wide pl-4">Edit Announcement Bar</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
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
                <FormLabel>Announcement Background Color</FormLabel>
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
