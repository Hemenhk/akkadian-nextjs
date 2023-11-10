"use client";

import {
  client,
  // fetchProductMetafields,
  fetchProductMetafieldsEnglish,
  fetchProductMetafieldsSpanish,
  fetchProductMetafieldsSwedish,
  shopifyDomainSwedish,
  spanishClient,
  swedishClient,
} from "@/shopify/shopify-cred";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Checkout, Collection, Metafield, Product } from "shopify-buy";

type TShopifyContext = {
  product: Product;
  collection: Collection[];
  checkout: Checkout;
  isCartOpen: boolean;
  language: string;
  setProduct: Dispatch<SetStateAction<Product>>;
  setCheckout: Dispatch<SetStateAction<Checkout>>;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  setLanguage: Dispatch<SetStateAction<string>>;
  createCheckout: () => Promise<void>;
  fetchCheckout: (checkoutId: string) => Promise<void>;
  // fetchProductWithHandle: (handle: string) => Promise<void>;
  fetchAllCollections: () => Promise<void>;
  addItemToCheckout: (variantId: string, quantity: number) => Promise<void>;
  updateLineItem: (lineItemId: string, quantity: number) => Promise<void>;
  removeLineItems: (lineItemsToRemove: string[]) => Promise<void>;
  handleProductFetch: (handle: string) => Promise<void>;
};

const ShopifyContext = createContext<TShopifyContext>({
  product: null,
  collection: [],
  checkout: null,
  isCartOpen: false,
  language: "",
  setProduct: () => {},
  setCheckout: () => {},
  setIsCartOpen: () => false,
  setLanguage: () => "",
  createCheckout: async () => {},
  fetchCheckout: async (checkoutId: string) => {},
  // fetchProductWithHandle: async (handle: string) => {},
  handleProductFetch: async (handle: string) => {},
  fetchAllCollections: async () => {},
  addItemToCheckout: async (variantId: string, quantity: number) => {},
  updateLineItem: async (lineItemId: string, quantity: number) => {},
  removeLineItems: async (lineItemsToRemove: string[]) => {},
});

export const ShopifyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState("en");
  const [product, setProduct] = useState<Product | null>(null);
  const [collection, setCollection] = useState<Collection[] | []>([]);
  const [checkout, setCheckout] = useState<Checkout | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  console.log(language);

  const createCheckoutEnglish = async () => {
    try {
      const checkout = await client.checkout.create();
      console.log("Checkout Created in english!", checkout);
      localStorage.setItem("checkout_id", checkout.id);
      setCheckout(checkout);
    } catch (error) {
      console.error("Error creating checkout:", error);
    }
  };

  const createCheckoutSwedish = async () => {
    try {
      const checkout = await swedishClient.checkout.create();
      console.log("Checkout Created in swedish!", checkout);
      localStorage.setItem("checkout_id", checkout.id);
      setCheckout(checkout);
    } catch (error) {
      console.error("Error creating checkout:", error);
    }
  };
  const createCheckoutSpanish = async () => {
    try {
      const checkout = await spanishClient.checkout.create();
      console.log("Checkout Created in spanish!", checkout);
      localStorage.setItem("checkout_id", checkout.id);
      setCheckout(checkout);
    } catch (error) {
      console.error("Error creating checkout:", error);
    }
  };

  const createCheckout = async () => {
    if (language === "en") {
      await createCheckoutEnglish();
    } else if (language === "sv") {
      await createCheckoutSwedish();
    } else if (language === "es") {
      await createCheckoutSpanish();
    }
  };

  const fetchCheckoutEnglish = async (checkoutId: string) => {
    const checkout = await client.checkout.fetch(checkoutId);
    setCheckout(checkout);
  };

  const fetchCheckoutSwedish = async (checkoutId: string) => {
    const checkout = await swedishClient.checkout.fetch(checkoutId);
    setCheckout(checkout);
  };

  const fetchCheckoutSpanish = async (checkoutId: string) => {
    const checkout = await spanishClient.checkout.fetch(checkoutId);
    setCheckout(checkout);
  };

  const fetchCheckout = async (checkoutId: string) => {
    if (language === "en") {
      await fetchCheckoutEnglish(checkoutId);
    } else if (language === "sv") {
      await fetchCheckoutSwedish(checkoutId);
    } else if (language === "es") {
      await fetchCheckoutSpanish(checkoutId);
    }
  };

  useEffect(() => {
    const checkoutId = localStorage.getItem("checkout_id");
    const completedOrder = checkout?.completedAt;

    if (completedOrder) {
      createCheckout();
    }
    if (!checkoutId) {
      createCheckout();
    } else {
      fetchCheckout(checkoutId);
    }
  }, [checkout?.completedAt, language]);

  const addItemToCheckout = async (variantId: string, quantity: number) => {
    try {
      const lineItemsToAdd = [{ variantId, quantity }];
      const newCheckout = await client.checkout.addLineItems(
        checkout?.id,
        lineItemsToAdd
      );
      setCheckout(newCheckout);
      setIsCartOpen(true);
      setTimeout(() => {
        setIsCartOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Error adding item to checkout:", error);
    }
  };

  const updateLineItem = async (lineItemId: string, quantity: number) => {
    const lineItemsToUpdate = [{ id: lineItemId, quantity }];
    const newCheckout = await client.checkout.updateLineItems(
      checkout?.id,
      lineItemsToUpdate
    );
    setCheckout(newCheckout);
  };

  const removeLineItems = async (lineItemsToRemove: string[]) => {
    const newCheckout = await client.checkout.removeLineItems(
      checkout?.id,
      lineItemsToRemove
    );
    setCheckout(newCheckout);
  };

  const fetchProductWithHandleEnglish = async (handle: string) => {
    try {
      const product = await client.product.fetchByHandle(handle);
      const metafields = (await fetchProductMetafieldsEnglish(
        handle
      )) as Metafield[];
      const monmey = (await client.shop.fetchInfo()).moneyFormat;
      console.log("url", monmey);
      console.log("Product is fetched", product);
      console.log("meta", metafields);
      setProduct({ ...product, metafields });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductWithHandleSwedish = async (handle: string) => {
    try {
      const product = await swedishClient.product.fetchByHandle(handle);
      const metafields = await fetchProductMetafieldsSwedish(handle);
      const url = await swedishClient.shop.fetchInfo();
      const swedishURL = `${url.primaryDomain.url}/sv`;
      console.log("url", swedishURL);
      console.log("Product is fetched", product);
      setProduct({ ...product, metafields });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProductWithHandleSpanish = async (handle: string) => {
    try {
      const product = await spanishClient.product.fetchByHandle(handle);
      const metafields = await fetchProductMetafieldsSpanish(handle);
      console.log("Product is fetched", product);
      setProduct({ ...product, metafields });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllCollections = async () => {
    try {
      const collection = await client.collection.fetchAll();

      setCollection(collection);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductFetch = async (handle: string) => {
    if (language === "en") {
      await fetchProductWithHandleEnglish(handle);
    } else if (language === "sv") {
      await fetchProductWithHandleSwedish(handle);
    } else if (language === "es") {
      await fetchProductWithHandleSpanish(handle);
    }
  };

  return (
    <ShopifyContext.Provider
      value={{
        product,
        collection,
        checkout,
        isCartOpen,
        language,
        createCheckout,
        fetchCheckout,
        setCheckout,
        setProduct,
        setIsCartOpen,
        setLanguage,
        handleProductFetch,
        fetchAllCollections,
        addItemToCheckout,
        updateLineItem,
        removeLineItems,
      }}
    >
      {children}
    </ShopifyContext.Provider>
  );
};

export const useShopifyContext = () => useContext(ShopifyContext);
