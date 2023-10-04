"use client";

import Rating from "@mui/material/Rating";
import axios from "axios";
import React, { useEffect, useState } from "react";

type ReviewProps = {
  _id: string;
  productHandle: string;
  title: string;
  review: string;
  rating: number;
  author: string;
  createdAt: string;
};

export default function ReviewPage() {
  const [reviews, setReviews] = useState<ReviewProps[] | []>([]);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const res = await axios.get("/api/reviews");
        const data = res.data.data.reviews;
        setReviews(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllReviews();
  }, []);

  const mappedReviews =
    reviews.length > 0 ? (
      reviews.map((review: ReviewProps) => (
        <li
          key={review._id}
          className="flex justify-start items-center pl-4 bg-slate-400 rounded-sm w-[400px]"
        >
          <div className="flex items-center justify-center uppercase rounded-[50%] bg-[#000] text-white w-[70px] h-[70px] ">
           <p className="text-2xl">{review.author.charAt(0)}</p> 
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center gap-14">
              <div className="flex flex-row items-center gap-2">
                <Rating
                  value={review.rating}
                  readOnly
                  size="small"
                  style={{ color: "rgb(14, 14, 14)" }}
                />
                <p>{review.createdAt}</p>
              </div>
              <p className="font-bold">
                {review.author.charAt(0).toUpperCase() + review.author.slice(1)}
              </p>
            </div>
            <div className="flex flex-col ml-1 pb-3">
              <p className="font-bold">{review.title}</p>
              <p className="text-sm">{review.review}</p>
            </div>
          </div>
        </li>
      ))
    ) : (
      <p>No reviews yet</p>
    );
  return (
    <div className="flex flex-col items-center justify-center h-full pb-80 pt-10">
      <h1 className="pb-10">Edit Reviews</h1>
      <ul className="flex flex-wrap items-center justify-center gap-5 w-[70%]">
        {mappedReviews}
      </ul>
    </div>
  );
}
