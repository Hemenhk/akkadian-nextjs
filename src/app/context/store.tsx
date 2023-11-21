"use client";

import { client } from "@/shopify/shopify-cred";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Checkout } from "shopify-buy";

type TShopifyContext = {
  checkout: Checkout;
  isCartOpen: boolean;
  setCheckout: Dispatch<SetStateAction<Checkout>>;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  createCheckout: () => Promise<void>;
  fetchCheckout: (checkoutId: string) => Promise<void>;
  addItemToCheckout: (variantId: string, quantity: number) => Promise<void>;
  updateLineItem: (lineItemId: string, quantity: number) => Promise<void>;
  removeLineItems: (lineItemsToRemove: string[]) => Promise<void>;
};

const ShopifyContext = createContext<TShopifyContext>({
  checkout: null,
  isCartOpen: false,
  setCheckout: () => {},
  setIsCartOpen: () => false,
  createCheckout: async () => {},
  fetchCheckout: async (checkoutId: string) => {},
  addItemToCheckout: async (variantId: string, quantity: number) => {},
  updateLineItem: async (lineItemId: string, quantity: number) => {},
  removeLineItems: async (lineItemsToRemove: string[]) => {},
});

export const ShopifyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [checkout, setCheckout] = useState<Checkout | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const createCheckout = async () => {
    try {
      const checkout = await client.checkout.create();
      localStorage.setItem("jawline_checkout_id", checkout.id);
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
    const checkoutId = localStorage.getItem("jawline_checkout_id");
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

  return (
    <ShopifyContext.Provider
      value={{
        checkout,
        isCartOpen,
        createCheckout,
        fetchCheckout,
        setCheckout,
        setIsCartOpen,
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
