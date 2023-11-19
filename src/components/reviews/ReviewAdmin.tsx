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
import { useRouter } from "next/navigation";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

export default function ReviewAdmin() {
  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchAllReviews,
  });
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState("all");

  const goBackHandler = () => {
    router.push("/admin");
  };

  const handleProductSelect = (value: any) => {
    setSelectedProduct(value);
  };

  console.log("reviews admin", reviews);

  const uniqueProductHandles = new Set();

  const selectProduct = (
    <>
      <Select onValueChange={handleProductSelect} defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Product" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {reviews?.map((item: ReviewProps) => {
            if (!uniqueProductHandles.has(item?.productHandle)) {
              uniqueProductHandles.add(item?.productHandle);

              return (
                <SelectItem key={item?._id} value={item?.productHandle}>
                  {item?.productHandle}
                </SelectItem>
              );
            }
            return null;
          })}
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
      <div className="flex flex-row justify-between border-b px-5 pb-4 w-full">
        <div className="pl-4 text-gray-800 transition ease-out duration-300 hover:text-gray-600">
          <BsFillArrowLeftCircleFill
            size={30}
            cursor={"pointer"}
            onClick={goBackHandler}
          />
        </div>
        <h1 className="tracking-wide uppercase text-base lg:text-xl lg:pl-32">
          Edit Reviews
        </h1>
        {selectProduct}
      </div>

      <ul className="flex flex-wrap items-center justify-center gap-5 pt-12 w-[70%]">
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
