import Client from "shopify-buy";
import { GraphQLClient } from "graphql-request";

const shopifyDomain = process.env.SHOPIFY_DOMAIN as string;
const storefrontAccessToken = process.env
  .SHOPIFY_STOREFRONT_ACCESS_TOKEN as string;
const apiVersion = "2023-10";

export const fetchProductMetafields = async (productHandle: string) => {
  const endpoint = `https://${shopifyDomain}/api/${apiVersion}/graphql.json`;

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
          } 
          descMetafield: metafield(namespace: "my_fields", key: "Description") {
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

export const fetchProductVideos = async (productHandle: string) => {
  const endpoint = `https://${shopifyDomain}/api/2023-10/graphql.json`;

  const query = `
  query getProductVideos($handle: String!) {
    productByHandle(handle: $handle) {
      title
    media(first:5) {
      edges {
        node {
          previewImage {
            originalSrc
          }
          mediaContentType
          alt
          ... fieldsForMediaTypes
        }
      }
    }
    }
  }
  
  fragment fieldsForMediaTypes on Media {
    alt
    mediaContentType
    ... on Video {
      id
      sources {
        format
        height
        mimeType
        url
        width
      }
    }
    ... on ExternalVideo {
      id
      host
      embeddedUrl
    }
    ... on Model3d {
      sources {
        format
        mimeType
        url
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

    const product = data.productByHandle;

    return product;
  } catch (error) {
    console.error("Network Error:", error);
  }
};

if (storefrontAccessToken === undefined) {
  throw new Error("SHOPIFY_STOREFRONT_ACCESS_TOKEN is not defined");
}

if (shopifyDomain === undefined) {
  throw new Error("SHOPIFY_DOMAIN is not defined");
}
export const client = Client.buildClient({
  domain: shopifyDomain,
  storefrontAccessToken,
  apiVersion,
});
