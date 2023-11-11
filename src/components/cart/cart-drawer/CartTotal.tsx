import React from "react";
import Link from "next/link";

import { useShopifyContext } from "@/app/context/store";

import { Flex } from "@chakra-ui/react";
import TheButton from "@/components/ui/TheButton";


export default function CartTotal() {
  const { checkout } = useShopifyContext();
  const { totalPrice } = checkout;
  return (
    <>
      {checkout.lineItems?.length ? (
        <Flex flexDirection={"column"} gap={5}>
          <Flex flexDirection={"column"} gap={5}>
            <Link href={checkout?.webUrl}>
              <TheButton
                label={`Checkout - ${totalPrice && totalPrice?.amount} ${
                  totalPrice && totalPrice?.currencyCode
                }`}
              />
            </Link>
          </Flex>
        </Flex>
      ) : (
        ""
      )}
    </>
  );
}
