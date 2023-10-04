"use client";

import Rating from "@mui/material/Rating";
import axios from "axios";
import React, { useEffect, useState } from "react";

type AverageRatingProps = {
  productHandle: string;
  averageRating: number;
  totalReviews: number;
  _id: string;
};

export default function AverageRating({ itemHandle }: { itemHandle: string }) {
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchReviewStats = async () => {
      try {
        const res = await axios.get("/api/reviews");

        const filteredReviewsStats = res.data.data.reviewStats.filter(
          (review: AverageRatingProps) => review.productHandle === itemHandle
        );
        // console.log(filteredReviewsStats);
        if (filteredReviewsStats.length > 0) {
          const stats = filteredReviewsStats[0].stats;
          setAverageRating(stats?.averageRating);
          setTotalReviews(stats?.totalReviews);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviewStats();
  }, [itemHandle]);

  //   console.log("average rating", averageRating);
  //   console.log("Total reviews", totalReviews);

  const renderRatingStars = () => {
    if (averageRating > 0) {
      return (
        <Rating
          name="read-only"
          precision={0.5}
          size="small"
          value={averageRating}
          readOnly
          style={{ color: "black" }}
        />
      );
    } else {
      return (
        <Rating
          name="read-only"
          precision={0.5}
          size="small"
          value={0}
          readOnly
          color="black"
          style={{ color: "black" }}
        />
      );
    }
  };

  return (
    <div className="flex items-center gap-2">
      {renderRatingStars()}
      <p className="text-sm font-light">{totalReviews} reviews</p>
    </div>
  );
}
