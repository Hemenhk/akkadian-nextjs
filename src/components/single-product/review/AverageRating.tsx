"use client";

import { fetchReviewStats } from "@/axios-instances/axios";
import Rating from "@mui/material/Rating";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

export default function AverageRating({ itemHandle }: { itemHandle: string }) {
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const { data: filteredReviewsStats } = useQuery({
    queryKey: ["reviews-stats"],
    queryFn: () => fetchReviewStats(itemHandle),
  });

  useEffect(() => {
    if (filteredReviewsStats?.length > 0) {
      const stats = filteredReviewsStats[0].stats;
      setAverageRating(stats?.averageRating);
      setTotalReviews(stats?.totalReviews);
    }
  }, [filteredReviewsStats]);

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
