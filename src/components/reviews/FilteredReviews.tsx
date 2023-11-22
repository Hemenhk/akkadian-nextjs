import { ReviewProps } from "@/axios-instances/axios";
import React from "react";
import DeleteReview from "./edit-review/DeleteReview";
import { Rating } from "@mui/material";

type Props = {
  reviews: ReviewProps[];
  selectedProduct: string;
};

export default function FilteredReviews({ reviews, selectedProduct }: Props) {
  const filteredReviews =
    reviews?.length > 0 &&
    reviews
      ?.filter((review: ReviewProps) =>
        selectedProduct ? review?.productHandle === selectedProduct : ""
      )
      .map((review: ReviewProps) => (
        <li
        key={review.id}
        className="flex flex-col mb-5 pl-5 py-4 w-[450px] bg-slate-200"
      >
        <div className="flex gap-3">
          <div className="flex items-center justify-center uppercase rounded-[50%] bg-[#000] text-white w-12 h-12 ">
            {review?.author?.charAt(0)}
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
              <div className="relative left-36 ">
              </div>
            </div>
            <div className="flex">
              {review?.isVerified ? (
                <p className="flex items-center bg-black text-white text-xs tracking-wider mr-3 px-3">
                  Verified
                </p>
              ) : (
                ""
              )}
              <p className="font-bold">{review.author}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-1 mt-2">
          <p className="font-bold">{review.title}</p>
          <p className="text-sm">{review.review}</p>
        </div>
      </li>
      ));

      console.log("filtered reviews", filteredReviews)
  return <>{filteredReviews}</>;
}
