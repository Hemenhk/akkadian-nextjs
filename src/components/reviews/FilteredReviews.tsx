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
          key={review?._id}
          className="flex gap-4 justify-start items-center pl-4 bg-gray-200 rounded-sm w-[500px] py-2"
        >
          <div className="flex items-center justify-center uppercase rounded-[50%] bg-[#000] text-white w-[70px] h-[70px]">
            <p className="text-2xl">{review?.author?.charAt(0)}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center gap-12">
              <div className="flex flex-row items-center gap-2">
                <Rating
                  value={review?.rating}
                  readOnly
                  size="small"
                  style={{ color: "rgb(14, 14, 14)" }}
                />
                <p className="text-sm">{review?.createdAt}</p>
              </div>
              <p className="font-bold pr-1">
                {review?.author?.charAt(0).toUpperCase() +
                  review?.author?.slice(1)}
              </p>
              <DeleteReview id={review._id} isVerified={review?.isVerified}/>
            </div>
            <div className="flex flex-col gap-2 ml-1 pb-3">
              <p className="font-bold">{review?.title}</p>
              <p className="text-sm">{review?.review}</p>
            </div>
          </div>
        </li>
      ));
  return <div>{filteredReviews}</div>;
}
