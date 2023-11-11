"use client";

import React, { useRef } from "react";
import { FiMenu } from "react-icons/fi";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import NavLinks from "./NavLinks";

type SideNavProps = {
  isHovered: boolean
  isHomePage: boolean
}

export default function SideNav({ isHovered, isHomePage }: SideNavProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef<HTMLButtonElement>(null);

  const colorValue = isHomePage ? `${isHovered ? "black" : "white"}` : !isHomePage && "black"

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        color={colorValue}
        backgroundColor={"transparent"}
        cursor={"pointer"}
        _hover={{ backgroundColor: "transparent" }}
      >
        <FiMenu size={40} />
      </Button>
      <Drawer
        size={"sm"}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={"#fafafa"}>
          <DrawerHeader mb={20}>
            <DrawerCloseButton size={"lg"} />
          </DrawerHeader>

          <DrawerBody>
            <NavLinks isOpen={isOpen} onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
