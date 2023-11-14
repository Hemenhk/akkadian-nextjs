import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchReviews } from "@/axios-instances/axios";
import Rating from "@mui/material/Rating";

export default function FeaturedReview({ itemHandle }: { itemHandle: string }) {
  const { data: reviewData } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => fetchReviews(itemHandle),
  });

  return (
    <>
      {reviewData?.length > 0 ? (
        <div key={reviewData[0]?.id} className="flex flex-col">
          <div className="flex gap-3">
            <div className="flex items-center justify-center uppercase rounded-[50%] bg-[#e0e0e0] w-12 h-12 ">
              {reviewData[0]?.author?.charAt(0)}
            </div>
            <div className="flex flex-col gap-2 ml-1 mt-2">
              <p className="text-sm">"{reviewData[0]?.review}"</p>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <Rating
                    value={reviewData[0]?.rating}
                    readOnly
                    size="small"
                    style={{ color: "rgb(14, 14, 14)" }}
                  />
                  <p className="text-sm font-light">
                    {reviewData[0]?.createdAt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
