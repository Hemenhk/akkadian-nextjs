"use client";

import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Rating from "@mui/material/Rating";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

// const formSchema = z.object({
//   review: z.string(),
//   author: z.string(),
//   rating: z.number(),
//   title: z.string(),
//   productHandle: z.string(),
// });

export default function ReviewForm({ productHandle }) {
  const [reviewValues, setReviewValues] = useState({
    review: "",
    author: "",
    rating: 0,
    title: "",
    productHandle: productHandle as string,
  });
  const [addRating, setAddRating] = useState(0);
  

  //   const form = useForm<z.infer<typeof formSchema>>({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: {
  //       review: "",
  //       author: "",
  //       rating: 0,
  //       title: "",
  //       productHandle: productHandle,
  //     },
  //     values: {
  //       review: reviewValues.review,
  //       author: reviewValues.author,
  //       rating: reviewValues.rating,
  //       title: reviewValues.title,
  //       productHandle: reviewValues.productHandle,
  //     },
  //   });

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const ratingChangeHandler = (e, newValue) => {
    setReviewValues((prevState) => ({
        ...prevState,
        rating: newValue, // Update only the rating property
      }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(" /api/reviews", reviewValues);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-8 pt-6">
      <h2>Review</h2>
      <Rating
        name="simple-controlled"
        value={reviewValues.rating}
        onChange={ratingChangeHandler}
      />
      <textarea
        name="title"
        value={reviewValues.title}
        onChange={changeHandler}
      />
      <textarea
        name="review"
        value={reviewValues.review}
        onChange={changeHandler}
      />
      <textarea
        name="author"
        value={reviewValues.author}
        onChange={changeHandler}
      />
      <input
        type="hidden"
        defaultValue={reviewValues.productHandle}
        name="productHandle"
      />
      <button type="submit">Create</button>
    </form>
  );
}
