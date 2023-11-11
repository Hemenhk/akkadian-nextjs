"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useShopifyContext } from "@/app/context/store";

import { BiChevronDown } from "react-icons/bi";

import classes from "./styles/ShopDrawer.module.css";
import { useQuery } from "@tanstack/react-query";

type ShopDrawerProps = {
  isDrawerOpen: boolean;
  onClose: () => void;
};

export default function ShopDrawer({ isDrawerOpen, onClose }: ShopDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { fetchAllCollections } = useShopifyContext();

  const {data: collection} = useQuery({
    queryKey: ["collection"],
    queryFn: fetchAllCollections,
  });

  const closeDrawerHandler = () => {
    console.log("closeDrawerHandler called");
    if (isOpen) {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  const openDrawerHandler = () => setIsOpen(!isOpen);

  const collectionLinks =
    collection &&
    collection
      .map((col) => (
        <li key={col.id}>
          <Link
            href={`/collections/${col.handle}`}
            onClick={closeDrawerHandler}
          >
            {col.handle}
          </Link>
        </li>
      ))
      .reverse();

  return (
    <>
      <div className="flex flex-col">
        <div
          onClick={openDrawerHandler}
          className={`flex items-center gap-3 tracking-wider ${classes.parent_link}`}
        >
          Shop
          <BiChevronDown
            size={20}
            className={isOpen ? classes.chevron_up : classes.chevron_down}
          />
        </div>
        <ul
          className={`${classes.nested_drawer} ${
            isOpen ? classes.nested_drawer_open : classes.nested_drawer_closed
          }`}
        >
          {collectionLinks}
        </ul>
      </div>
    </>
  );
}
