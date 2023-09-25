"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { BiChevronDown } from "react-icons/bi";

import classes from "./styles/ShopDrawer.module.css";
import { useShopifyContext } from "@/app/context/store";

export default function ShopDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const { collection, fetchAllCollections } = useShopifyContext();

  useEffect(() => {
    fetchAllCollections();
  }, []);

  const collectionLinks =
    collection &&
    collection
      .map((col) => (
        <li key={col.id}>
          <Link href={`/collections/${col.handle}`}>
            {col.handle}
          </Link>
        </li>
      ))
      .reverse();

  const openDrawerHandler = () => setIsOpen(!isOpen);
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
