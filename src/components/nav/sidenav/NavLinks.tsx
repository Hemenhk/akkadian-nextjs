import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import ShopDrawer from "./ShopDrawer";

type NavLinksProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NavLinks({ onClose, isOpen }: NavLinksProps) {
  const { data: session, status } = useSession();

  const closeDrawerHandler = () => {
    console.log("closeDrawerHandler called");
    if (isOpen) {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  const isAuthenticated = (
    <li className="font-normal text-base uppercase ml-4 pb-4 border-b w-3/4 border-[#dedede]">
      <Link href={"/admin"} onClick={closeDrawerHandler}>
        Admin Dashboard
      </Link>
    </li>
  );

  const isNotAuthenticated = (
    <>
      {/* <li className="font-normal text-base uppercase ml-4 pb-4 border-b w-3/4 border-[#dedede]">
        <Link href={"/signup"} onClick={closeDrawerHandler}>
          Sign up
        </Link>
      </li> */}
      <li className="font-normal text-base uppercase ml-4 pb-4 border-b w-3/4 border-[#dedede]">
        <Link href={"/signin"} onClick={closeDrawerHandler}>
          Sign in
        </Link>
      </li>
    </>
  );

  return (
    <div className="flex flex-col justify-between gap-60">
      <ul className="flex flex-col gap-10">
        <li className="font-normal text-base uppercase ml-4 pb-4 border-b w-3/4 border-[#dedede]">
          <Link href={"/"} onClick={closeDrawerHandler}>
            Home
          </Link>
        </li>
        <li className="font-normal text-base uppercase ml-4 pb-4 border-b w-3/4 border-[#dedede]">
          <ShopDrawer onClose={onClose} isDrawerOpen={isOpen} />
        </li>
        <li className="font-normal text-base uppercase ml-4 pb-4 border-b w-3/4 border-[#dedede]">
          <Link href={"/faq"} onClick={closeDrawerHandler}>
            FAQ
          </Link>
        </li>
        {session ? isAuthenticated : isNotAuthenticated}
      </ul>
    </div>
  );
}
