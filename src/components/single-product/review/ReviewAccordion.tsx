"use client";

import React, { useEffect, useState } from "react";
import  Rating  from "@mui/material/Rating";
import axios from "axios";
import TheButton from "@/components/ui/TheButton";

type ReviewAccordionProps = {
  productHandle: string;
  author: string;
  rating: number;
  review: string;
  title: string;
  createdAt: string;
  id: string;
};

export default function ReviewAccordion({
  itemHandle,
}: {
  itemHandle: string;
}) {
  const [reviews, setReviews] = useState<ReviewAccordionProps[] | []>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);

  //   console.log("handle",itemHandle);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews`);

        const filteredReviews = res.data.data.reviews.filter(
          (review: ReviewAccordionProps) => review.productHandle === itemHandle
        );

        setReviews(filteredReviews);

        console.log("Reviews", res);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [itemHandle]);

  console.log("revies",reviews)

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const loadMoreReviewsHandler = () => {
    setCurrentPage((prevState) => prevState + 1);
  };
  const loadPreviousReviewsHandler = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  //   console.log("CLG", reviews);

  const renderedReviews =
    reviews.length > 0 ? (
      currentReviews.map((review) => (
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
        {reviews.length > indexOfLastReview && (
          <TheButton
            label="Load more reviews"
            onClick={loadMoreReviewsHandler}
          />
        )}
      </div>
    </>
  );
}
