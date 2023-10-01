"use client";

import React, { useState } from "react";
import Image from "next/image";

import { Image as IImage } from "shopify-buy";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

type ImageProps = {
  images: IImage[];
  available: boolean;
};

export default function ProductImage({ images, available }: ImageProps) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const nextImage = () => {
    if (currentImageIdx === 0) setCurrentImageIdx((prevIdx) => prevIdx + 1);
  };
  const prevImage = () => {
    if (currentImageIdx > 0) setCurrentImageIdx((prevIdx) => prevIdx - 1);
  };

  // console.log("img", images);
  if (images.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-3 gap-5">
      <Image
        src={images[currentImageIdx]?.src || images[0]?.src}
        alt="product image"
        width={400}
        height={400}
      />
      {images.length > 1 ? (
        <div className="flex justify-between items-center gap-10">
          <button onClick={prevImage} className="bg-transparent">
            <MdKeyboardArrowLeft size={20} />
          </button>
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`flex w-[8px] h-[8px] rounded-[50%] ${idx === currentImageIdx ? "bg-black" : "bg-slate-400"}`}
            />
          ))}
          <button onClick={nextImage} className="bg-transparent">
            <MdKeyboardArrowRight size={20} />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
