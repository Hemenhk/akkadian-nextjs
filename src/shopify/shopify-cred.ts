import Client from "shopify-buy";
import { GraphQLClient } from "graphql-request";


export const fetchProductMetafields = async (productHandle: string) => {
  const endpoint = `https://hemen-dev.myshopify.com/api/2021-07/graphql.json`;
  const storefrontAccessToken = "95de33e587cd2baf92b82488c3347725";

  const query = `
      query getProductMetafields($handle: String!) {
        productByHandle(handle: $handle) {
          usageMetafield: metafield(namespace: "my_fields", key: "Usage") {
            key
            value
          }
          fragranceMetafield: metafield(namespace: "my_fields", key: "Fragrance") {
            key
            value
          }
          ingredientsMetafield: metafield(namespace: "my_fields", key: "ingredients") {
            key
            value
          } descMetafield: metafield(namespace: "my_fields", key: "Description") {
            key
            value
          }
        }
      }
    `;

  const variables = {
    handle: productHandle,
  };

  const client = new GraphQLClient(endpoint, {
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
  });

  try {
    const data: any = await client.request(query, variables);
    const fragranceMetafield = data.productByHandle.fragranceMetafield;
    const descMetafield = data.productByHandle.descMetafield;
    const usageMetafield = data.productByHandle.usageMetafield;
    const ingredientMetafield = data.productByHandle.ingredientsMetafield;

    return [
      usageMetafield,
      fragranceMetafield,
      ingredientMetafield,
      descMetafield,
    ];
  } catch (error) {
    console.log("Error fetching metafields:", error);
    return [];
  }
};

const domain: string | undefined = "hemen-dev.myshopify.com";
const storefrontAccessToken: string | undefined =
  "95de33e587cd2baf92b82488c3347725";
const apiVersion = "2023-07";

if (storefrontAccessToken === undefined) {
  throw new Error("REACT_APP_SHOPIFY_API is not defined");
}

if (domain === undefined) {
  throw new Error("REACT_APP_SHOPIFY_DOMAIN is not defined");
}

export const client = Client.buildClient({
  domain,
  storefrontAccessToken,
  apiVersion
});
