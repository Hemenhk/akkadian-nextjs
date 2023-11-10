"use client";

import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import TheButton from "@/components/ui/TheButton";
import { useQuery } from "@tanstack/react-query";
import { ReviewProps, fetchReviews } from "@/axios-instances/axios";

export default function ReviewAccordion({
  itemHandle,
}: {
  itemHandle: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);

  const { data: reviewData } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => fetchReviews(itemHandle)
  });

  // console.log("review data", reviewData);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviewData?.slice(indexOfFirstReview, indexOfLastReview);

  const loadMoreReviewsHandler = () => {
    setCurrentPage((prevState) => prevState + 1);
  };
  const loadPreviousReviewsHandler = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const renderedReviews =
    reviewData?.length > 0 ? (
      currentReviews.map((review: ReviewProps) => (
        <div key={review.id} className="flex flex-col mb-5 border-b py-4">
          <div className="flex gap-3">
            <div className="flex items-center justify-center uppercase rounded-[50%] bg-[#e0e0e0] w-12 h-12 ">
              {review.author.charAt(0)}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <Rating
                  value={review.rating}
                  readOnly
                  size="small"
                  style={{ color: "rgb(14, 14, 14)" }}
                />
                <p className="text-sm font-light">{review.createdAt}</p>
              </div>
              <div className="flex">
                <p className="font-bold">{review.author}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-1 mt-2">
            <p className="font-bold">{review.title}</p>
            <p className="text-sm">{review.review}</p>
          </div>
        </div>
      ))
    ) : (
      <p>No reviews available for this product.</p>
    );
  return (
    <>
      {renderedReviews}
      <div className="flex gap-3">
        {currentPage > 1 && (
          <TheButton
            label="Load previous reviews"
            onClick={loadPreviousReviewsHandler}
          />
        )}
        {reviewData?.length > indexOfLastReview && (
          <TheButton
            label="Load more reviews"
            onClick={loadMoreReviewsHandler}
          />
        )}
      </div>
    </>
  );
}
