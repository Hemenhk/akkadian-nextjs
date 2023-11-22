import { Metadata, ResolvingMetadata } from "next";
import { fetchProductWithHandle } from "@/shopify/shopify-req";
import SingleProduct from "@/components/single-product/SingleProduct";
import ProductVideo from "@/components/single-product/video/ProductVideo";

type Props = {
  params: { productHandle: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const productHandle = params.productHandle;

  const product = await fetchProductWithHandle(productHandle);
  
  return {
    title: product?.title,
    description: product?.metafields[3]?.value,
    openGraph: {
      images: product?.images[0]?.src
    }
  };
}

export default function ProductPage({ params }: Props) {
  return (
    <div className="overflow-x-hidden">
      <SingleProduct params={params}/>
      <ProductVideo  params={params}/>
    </div>
  );
}
