"use client";

import { Spinner } from "@chakra-ui/react";
import React from "react";

export default function ProductVideo({ product, isLoading }) {
  const productVideo = product?.vidoes?.media?.edges[2]?.node;

  const videoPoster = productVideo?.previewImage?.originialSrc;
  const videoFormat = productVideo?.sources[0]?.mimeType;
  const videoSrc = productVideo?.sources[0]?.url;

  return (
    <div className="flex justify-center p-[5rem] bg-[#fafafa] w-screen">
      {isLoading ? (
        <Spinner />
      ) : (
        <video controls width="35%" height="auto" poster={videoPoster}>
          <source src={videoSrc} type={videoFormat} />
        </video>
      )}
    </div>
  );
}
