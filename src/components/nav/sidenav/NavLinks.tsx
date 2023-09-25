import Link from "next/link";
import React from "react";
import ShopDrawer from "./ShopDrawer";

export default function NavLinks() {
  return (
    <div className="flex flex-col">
      <ul className="flex flex-col gap-10">
        <li className="font-normal text-base uppercase ml-4 pb-4 border-b w-3/4 border-[#dedede]">
          <Link href={"/"}>Home</Link>
        </li>
        <li className="font-normal text-base uppercase ml-4 pb-4 border-b w-3/4 border-[#dedede]">
         <ShopDrawer />
        </li>
        <li className="font-normal text-base uppercase ml-4 pb-4 border-b w-3/4 border-[#dedede]">
          <Link href={"/faq"}>FAQ</Link>
        </li>
        <li className="font-normal text-base uppercase ml-4 pb-4 border-b w-3/4 border-[#dedede]">
          <Link href={"/signup"}>Sign up</Link>
        </li>
        <li className="font-normal text-base uppercase ml-4 pb-4 border-b w-3/4 border-[#dedede]">
          <Link href={"/signin"}>Sign in</Link>
        </li>
      </ul>
    </div>
  );
}
