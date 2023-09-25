import React, { useState } from "react";

export default function ProductVariants({ variants, onVariantSelect, selectedVariantId }) {
  // const [selectedVariantId, setSelectedVariantId] = useState("");

  const selectVariants =
    variants.length > 1
      ? variants.map((variant: any) => (
          <div
            key={variant.id}
            className={`cursor-pointer border rounded-[2px] px-3 py-3 ${
              selectedVariantId === variant.id
                ? "border-[#000]"
                : "border-[#dbdbdb]"
            } transition duration-500 ease-out hover:border-[#000]`}
            onClick={() => {
              onVariantSelect(variant.id);
            }}
          >
            <p className="text-xs font-normal uppercase tracking-wide">
              {variant.title}
            </p>
          </div>
        ))
      : "";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-3">{selectVariants}</div>
    </div>
  );
}
