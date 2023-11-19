"use client";

import { fetchProductWithHandle } from "@/shopify/shopify-req";
import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
  params: { productHandle: string };
};

export default function ProductVideo({ params }: Props) {
  const { productHandle } = params;

  const {
    data: product,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["single-product"],
    queryFn: () => fetchProductWithHandle(productHandle),
  });

  if (isError) {
    <p>no video available...</p>;
  }

  const productVideo = product?.vidoes?.media?.edges[2]?.node;

  const videoPoster = productVideo?.previewImage?.originialSrc;
  const videoFormat = productVideo?.sources[0]?.mimeType;
  const videoSrc = productVideo?.sources[0]?.url;

  return (
    <>
      {product?.vidoes?.media?.edges[2] ? (
        <div className="flex justify-center p-[5rem] bg-[#fafafa] w-screen">
          {isLoading ? (
            <Spinner />
          ) : (
            <video controls width="35%" height="auto" poster={videoPoster}>
              <source src={videoSrc} type={videoFormat} />
            </video>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
