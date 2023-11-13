"use client";

import Rating from "@mui/material/Rating";
import DeleteReview from "./delete-review/DeleteReview";
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
            <DeleteReview id={review._id} />
          </div>
          <div className="flex flex-col gap-2 ml-1 pb-3">
            <p className="font-bold">{review?.title}</p>
            <p className="text-sm">{review?.review}</p>
          </div>{" "}
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
