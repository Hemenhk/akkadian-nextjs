import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import ShopDrawer from "./ShopDrawer";
import { useShopifyContext } from "@/app/context/store";

type NavLinksProps = {
  isOpen: boolean;
  onClose: () => void
};

export default function NavLinks({
  onClose,
  isOpen,
}: NavLinksProps) {


  const closeDrawerHandler = () => {
    console.log("closeDrawerHandler called");
    if (isOpen) {
      setTimeout(() => {
        onClose()
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col">
      <ul className="flex flex-col gap-10">
        <li className="font-normal text-base uppercase ml-4 pb-4 border-b w-3/4 border-[#dedede]">
          <Link href={"/"} onClick={closeDrawerHandler}>
            Home
          </Link>
        </li>
        <li className="font-normal text-base uppercase ml-4 pb-4 border-b w-3/4 border-[#dedede]">
          <ShopDrawer />
        </li>
        <li className="font-normal text-base uppercase ml-4 pb-4 border-b w-3/4 border-[#dedede]">
          <Link href={"/faq"} onClick={closeDrawerHandler}>
            FAQ
          </Link>
        </li>
        <li className="font-normal text-base uppercase ml-4 pb-4 border-b w-3/4 border-[#dedede]">
          <Link href={"/signup"} onClick={closeDrawerHandler}>
            Sign up
          </Link>
        </li>
        <li className="font-normal text-base uppercase ml-4 pb-4 border-b w-3/4 border-[#dedede]">
          <Link href={"/signin"} onClick={closeDrawerHandler}>
            Sign in
          </Link>
        </li>
      </ul>
    </div>
  );
}
