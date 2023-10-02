import React from "react";
import { MoneyV2 } from "shopify-buy";

export default function CollectionPrice({
  comparePrice,
  price,
}: {
  comparePrice: MoneyV2;
  price: MoneyV2;
}) {
  return (
    <div>
      {comparePrice ? (
        <div className="flex gap-2">
          <h2 className="text-red-700">
            {price.amount} {price.currencyCode}
          </h2>
          <h2 className="line-through text-slate-600">
            {comparePrice.amount} {comparePrice.currencyCode}
          </h2>
        </div>
      ) : (
        <>
          <h2>
            {price.amount} {price.currencyCode}
          </h2>
        </>
      )}
    </div>
  );
}
