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
  heroImage: z.string(),
  heroHeading: z.string(),
  heroSubHeading: z.string(),
  heroButtonText: z.string(),
  heroButtonColor: z.string(),
});

export default function HeroPage() {
  const [heroValues, setHeroValues] = useState({
    heroImage: "",
    heroHeading: "",
    heroSubHeading: "",
    heroButtonText: "",
    heroButtonColor: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("/api/auth/admin-dashboard/hero-banner");
        setHeroValues({
          heroImage: data.data.heroValues[0].heroImage,
          heroHeading: data.data.heroValues[0].heroHeading,
          heroSubHeading: data.data.heroValues[0].heroSubHeading,
          heroButtonText: data.data.heroValues[0].heroButtonText,
          heroButtonColor: data.data.heroValues[0].heroButtonColor,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heroImage: "",
      heroHeading: "",
      heroSubHeading: "",
      heroButtonText: "",
      heroButtonColor: "",
    },
    values: {
      heroImage: heroValues.heroImage,
      heroHeading: heroValues.heroHeading,
      heroSubHeading: heroValues.heroSubHeading,
      heroButtonText: heroValues.heroButtonText,
      heroButtonColor: heroValues.heroButtonColor,
    },
  });

  const goBackHandler = () => {
    router.push("/admin");
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(
        " /api/auth/admin-dashboard/hero-banner",
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
      <h1 className="tracking-wide pl-4">Edit Hero Banner</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full px-4"
        >
          <FormField
            control={form.control}
            name="heroImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Image</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="hero image" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="heroHeading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Heading</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="hero heading" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="heroSubHeading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Sub-Heading</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="hero sub-heading"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="heroButtonText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Button Text</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="hero button text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="heroButtonColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Button Background Color</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="hero button background color"
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
