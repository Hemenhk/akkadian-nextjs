import React from 'react'

import { useShopifyContext } from '@/app/context/store'
import { Flex } from "@chakra-ui/react";

import CartItem from './CartItem';

export default function CartDrawer() {

  const {checkout, removeLineItems} = useShopifyContext()
  console.log("Items in checkout", checkout)
  return (
    <Flex flexDirection={"column"}>
    {checkout && checkout.lineItems?.length ? (
      checkout.lineItems.map((item) => (
        <CartItem
          removeLineItem={removeLineItems}
          key={item.id}
          id={item.id}
          image={item.variant.image.src}
          price={item.variant.price.amount}
          title={item.title}
          currency={item.variant.price.currencyCode}
          quantity={item.quantity}
          variant={item.variant}
        />
      ))
    ) : (
      <Flex justifyContent={"center"}>Your cart is empty!</Flex>
    )}
  </Flex>
  )
}
