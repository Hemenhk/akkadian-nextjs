import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { fetchCollectionWithHandle } from "@/shopify/shopify-req";
import CollectionPrice from "@/components/collection/CollectionPrice";
import { Metadata } from "next";

type CollectionProps = {
  params: { collectionHandle: string };
};

export async function generateMetadata({
  params,
}: CollectionProps): Promise<Metadata> {
  const collectionHandle = params.collectionHandle;

  const collection = await fetchCollectionWithHandle(collectionHandle);

  return {
    title: collection?.title,
  };
}

export default async function CollectionPage({ params }: CollectionProps) {
  const collection = await fetchCollectionWithHandle(params.collectionHandle);
  console.log("collection", collection);
  if (!collection?.title) {
    return <p>...</p>;
  }

  const mappedCollection =
    collection &&
    collection.products.length > 0 &&
    collection.products.map((product) => (
      <Card key={product?.id} className="pt-6">
        <CardContent
          className={`${
            product.availableForSale ? "opacity-100" : "opacity-50"
          }`}
        >
          {product.variants[0].compareAtPrice && (
            <p className="uppercase text-sm tracking-widest text-slate-500 pb-4">
              on sale
            </p>
          )}
          <Link href={`/product/${product?.handle}`}>
            <div className="flex flex-col gap-2">
              <Image
                src={product?.images[0]?.src}
                alt="Product Image"
                width={200}
                height={200}
              />
            </div>
            {!product.availableForSale && (
              <p className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-inter font-bold text-12 text-center uppercase bg-black bg-opacity-80 px-3 py-2 rounded-sm">
                Out of stock
              </p>
            )}
          </Link>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <h2 className="tracking-wider">{product.title}</h2>
          <CollectionPrice
            price={product?.variants[0].price}
            comparePrice={product?.variants[0].compareAtPrice}
          />
        </CardFooter>
      </Card>
    ));

  return (
    <div className="flex flex-col items-center gap-8 py-10">
      <h2 className="tracking-widest text-xl">{collection?.title}</h2>
      <div className="flex flex-row flex-wrap gap-3  justify-center">
        {mappedCollection}
      </div>
    </div>
  );
}
