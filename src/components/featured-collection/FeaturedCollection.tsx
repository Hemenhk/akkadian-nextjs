import React from "react";

import { fetchCollectionWithHandle } from "@/shopify/shopify-req";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import CollectionPrice from "../collection/CollectionPrice";

export default async function FeaturedCollection({
  handle,
}: {
  handle: string;
}) {
  const collection = await fetchCollectionWithHandle(handle);

  const mappedCollection =
    collection &&
    collection.products.length > 0 &&
    collection.products.map((product) => (
      <Card key={product?.id} className="pt-6">
        <CardContent>
          {product.availableForSale ? (
            <Link href={`/product/${product?.handle}`}>
              <div className="flex flex-col gap-2">
                {product.variants[0].compareAtPrice && (
                  <p className="uppercase text-red-400">on sale</p>
                )}
                <Image
                  src={product?.images[0]?.src}
                  alt="Product Image"
                  width={200}
                  height={200}
                />
              </div>
            </Link>
          ) : (
            <Link href={`/product/${product?.handle}`}>
              <div>
                <Image
                  src={product?.images[0]?.src}
                  alt="Product Image"
                  width={200}
                  height={200}
                  className="opacity-20 "
                />
                <p className="text-center font-bold uppercase">Out of stock</p>
              </div>
            </Link>
          )}
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

  if (!collection) {
    return <p>There is no featured collection</p>;
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="tracking-widest text-lg">{collection?.title}</h2>
      <div className="flex flex-row flex-wrap gap-3  justify-center">
        {mappedCollection}
      </div>
    </div>
  );
}
