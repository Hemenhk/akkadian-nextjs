import { client, fetchProductMetafields, swedishClient } from "./shopify-cred";

export const createCheckout = () => async () => {
  const checkout = await client.checkout.create();
  console.log("Checkout created!");
  localStorage.setItem("checkout_id", checkout.id);

  return checkout;
};

export const fetchCheckout = async (checkoutId: string) => {
  const checkout = await client.checkout.fetch(checkoutId);
  return checkout;
};

export const fetchProductWithHandle = async (handle: string) => {
  try {
    const product = await client.product.fetchByHandle(handle);
    const metafields = await fetchProductMetafields(handle);
    console.log(product);

    return { ...product, metafields };
  } catch (error) {
    console.log(error);
  }
};

export const fetchCollectionWithHandle = async (handle: string) => {
  try {
    const collection = await client.collection.fetchByHandle(handle);
    // console.log("coll", collection);
    return collection;
  } catch (error) {
    console.log(error);
  }
};

