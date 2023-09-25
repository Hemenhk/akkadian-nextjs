import React from "react";

type ComparePrice = {
    amount: string,
    currencyCode: string
}

type StandardPrice = {
    amount: string,
    currencyCode: string
}


type CollectionPriceProps = {
  comparePrice: ComparePrice;
  price: StandardPrice;
};

export default function CollectionPrice({
  comparePrice,
  price,
}: CollectionPriceProps) {
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
