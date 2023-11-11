"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import TheButton from "@/components/ui/TheButton";

export default function ReviewForm({ productHandle }) {
  const [reviewValues, setReviewValues] = useState({
    review: "",
    author: "",
    rating: 0,
    title: "",
    productHandle: productHandle as string,
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
      const res = await axios.post(" /api/reviews", reviewValues);

      setReviewValues({
        rating: 0,
        title: "",
        review: "",
        author: "",
        productHandle,
      });
      console.log(res);
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
