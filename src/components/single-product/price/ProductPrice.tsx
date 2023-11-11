import React from "react";
import { Product } from "shopify-buy";

import classes from "../SingleProduct.module.css"

type PriceProps = {
  product: Product;
};

export default function ProductPrice({ product }: PriceProps) {
  if (!product.variants) {
    return <p>no variants...</p>;
  }
  
  const pricePercentageDifference =
    ((product?.variants[0]?.price?.amount -
      product?.variants[0]?.compareAtPrice?.amount) /
      product?.variants[0]?.compareAtPrice?.amount) *
    100;

  const comparePrice =
    product.variants && product?.variants[0]?.compareAtPrice ? (
      <>
        <p className="text-red-700">
          {product?.variants[0]?.price?.amount}{" "}
          {product?.variants[0]?.price?.currencyCode}
        </p>
        <p className="line-through text-slate-600">
          {product?.variants[0]?.compareAtPrice?.amount}{" "}
          {product?.variants[0]?.compareAtPrice?.currencyCode}
        </p>
        <p className={classes.priceTag}>{pricePercentageDifference.toFixed(0)}{" "} %</p>
      </>
    ) : (
      <>
        <p>
          {product?.variants[0]?.price?.amount}{" "}
          {product?.variants[0]?.price?.currencyCode}
        </p>
      </>
    );

  
  return <>{comparePrice}</>;
}
