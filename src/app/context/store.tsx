"use client";

import { client, fetchProductMetafields } from "@/shopify/shopify-cred";
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
  setProduct: Dispatch<SetStateAction<Product>>;
  setCheckout: Dispatch<SetStateAction<Checkout>>;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  createCheckout: () => Promise<void>;
  fetchCheckout: (checkoutId: string) => Promise<void>;
  fetchProductWithHandle: (handle: string) => Promise<Product>;
  fetchAllCollections: () => Promise<void>;
  addItemToCheckout: (variantId: string, quantity: number) => Promise<void>;
  updateLineItem: (lineItemId: string, quantity: number) => Promise<void>;
  removeLineItems: (lineItemsToRemove: string[]) => Promise<void>;
};

const ShopifyContext = createContext<TShopifyContext>({
  product: null,
  collection: [],
  checkout: null,
  isCartOpen: false,
  setProduct: () => {},
  setCheckout: () => {},
  setIsCartOpen: () => false,
  createCheckout: async () => {},
  fetchCheckout: async (checkoutId: string) => {},
  fetchProductWithHandle: async (handle: string) => {
    return Promise.resolve(null);
  },
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
  const [product, setProduct] = useState<Product | null>(null);
  const [collection, setCollection] = useState<Collection[] | []>([]);
  const [checkout, setCheckout] = useState<Checkout | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const createCheckout = async () => {
    try {
      const checkout = await client.checkout.create();
      // console.log("Checkout Created in english!", checkout);
      localStorage.setItem("checkout_id", checkout.id);
      setCheckout(checkout);
    } catch (error) {
      console.error("Error creating checkout:", error);
    }
  };

  const fetchCheckout = async (checkoutId: string) => {
    const checkout = await client.checkout.fetch(checkoutId);
    setCheckout(checkout);
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
  }, [checkout?.completedAt]);

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

  const fetchProductWithHandle = async (handle: string) => {
    try {
      const product = await client.product.fetchByHandle(handle);
      const metafields = (await fetchProductMetafields(handle)) as Metafield[];
      console.log("Product is fetched", product);
      console.log("meta", metafields);
      // setProduct({ ...product, metafields });
      return { ...product, metafields };
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

  return (
    <ShopifyContext.Provider
      value={{
        product,
        collection,
        checkout,
        isCartOpen,
        createCheckout,
        fetchCheckout,
        setCheckout,
        setProduct,
        setIsCartOpen,
        fetchProductWithHandle,
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
