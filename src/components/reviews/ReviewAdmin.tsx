"use client";

import Rating from "@mui/material/Rating";
import DeleteReview from "./edit-review/DeleteReview";
import { useQuery } from "@tanstack/react-query";
import { ReviewProps, fetchAllReviews } from "@/axios-instances/axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import FilteredReviews from "./FilteredReviews";
import EditReview from "./edit-review/EditReview";

export default function ReviewAdmin() {
  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchAllReviews,
  });

  const [selectedProduct, setSelectedProduct] = useState("all");

  const handleProductSelect = (value: any) => {
    setSelectedProduct(value);
  };

  const selectProduct = (
    <>
      <Select onValueChange={handleProductSelect} defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Product" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {reviews?.map((item: ReviewProps) => (
            <SelectItem key={item?._id} value={item?.productHandle}>
              {item?.productHandle}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );

  const mappedReviews =
    reviews?.length > 0 &&
    reviews?.map((review: ReviewProps) => (
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
                <EditReview id={review?._id} isVerified={review?.isVerified} />
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

  return (
    <div className="flex flex-col items-center justify-center h-full pb-80 pt-10 gap-3">
      <h1 className="pb-10">Edit Reviews</h1>
      {selectProduct}

      <ul className="flex flex-wrap items-center justify-center gap-5 w-[70%]">
        {selectedProduct !== "all" ? (
          <FilteredReviews
            reviews={reviews}
            selectedProduct={selectedProduct}
          />
        ) : (
          mappedReviews
        )}
      </ul>
    </div>
  );
}
