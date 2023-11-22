"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import TheButton from "@/components/ui/TheButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateReviewProps, postReview } from "@/axios-instances/axios";

export default function ReviewForm({ productHandle }) {
  const queryClient = useQueryClient();
  const [reviewValues, setReviewValues] = useState<CreateReviewProps>({
    review: "",
    author: "",
    rating: 0,
    title: "",
    productHandle,
  });

  const { mutateAsync: createReviewMutation } = useMutation({
    mutationFn: async (data: CreateReviewProps) => {
      postReview(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["reviews"], data);
      queryClient.refetchQueries({ queryKey: ["reviews"] });
    },
  });

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
      const { rating, review, title, author, productHandle } = reviewValues;
      await createReviewMutation({
        rating,
        review,
        title,
        author,
        productHandle,
      });
      setReviewValues({
        rating: 0,
        title: "",
        review: "",
        author: "",
        productHandle,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-4 pt-6"
    >
      <Rating
        name="simple-controlled"
        value={reviewValues.rating}
        onChange={ratingChangeHandler}
      />
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        name="title"
        value={reviewValues.title}
        onChange={changeHandler}
        size="small"
      />
      <TextField
        id="outlined-basic"
        label="Review"
        variant="outlined"
        name="review"
        value={reviewValues.review}
        onChange={changeHandler}
        size="small"
      />
      <TextField
        id="outlined-basic"
        label="Author"
        variant="outlined"
        name="author"
        value={reviewValues.author}
        onChange={changeHandler}
        size="small"
      />
      <input
        type="hidden"
        defaultValue={reviewValues.productHandle}
        name="productHandle"
      />
      <TheButton type="submit" label="Add Review" />
    </form>
  );
}
