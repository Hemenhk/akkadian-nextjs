import {
  client,
  fetchProductMetafields,
  fetchProductVideos,
} from "./shopify-cred";

export const fetchProductWithHandle = async (handle: string) => {
  try {
    const product = await client.product.fetchByHandle(handle);
    const metafields = await fetchProductMetafields(handle);
    const vidoes = await fetchProductVideos(handle);
    return { ...product, metafields, vidoes };
  } catch (error) {
    console.log(error);
  }
};

export const fetchCollectionWithHandle = async (handle: string) => {
  try {
    const collection = await client.collection.fetchByHandle(handle);
    return collection;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllCollections = async () => {
  try {
    const collection = await client.collection.fetchAll();
    return collection;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTermsPolicy = async () => {
  try {
    const termsPolicy = await client.shop.fetchPolicies();
    return termsPolicy.termsOfService;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPrivacyPolicy = async () => {
  try {
    const termsPolicy = await client.shop.fetchPolicies();
    return termsPolicy.privacyPolicy;
  } catch (error) {
    console.log(error);
  }
};

export const fetchReturnPolicy = async () => {
  try {
    const termsPolicy = (await client.shop.fetchInfo());
    return termsPolicy.refundPolicy;
  } catch (error) {
    console.log(error);
  }
};
