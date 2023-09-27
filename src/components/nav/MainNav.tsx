"use client";

import React from "react";
import SideNav from "./sidenav/SideNav";

import logo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "../cart/CartIcon";
import { usePathname } from "next/navigation";
import TheButton from "../ui/TheButton";
import { signOut } from "next-auth/react";

export default function MainNav() {
  const pathname = usePathname();
  const isAdminPage = pathname === "/admin";

  const signOutHandler = () => {
    signOut();
  };

  const adminHeader = (
    <>
      <SideNav />
      <Link href={"/"}>
        <Image src={logo} alt="logo" width={50} height={50} />
      </Link>
      <TheButton label="sign out" onClick={signOutHandler} width="w-[200px]" />
    </> 
  );

  const notAdminHeader = (
    <>
      <SideNav />
      <Link href={"/"}>
        <Image src={logo} alt="logo" width={50} height={50} />
      </Link>
      <CartIcon />
    </>
  );

  return (
    <div className="flex h-[125px] justify-between items-center p-10 border-b  transition ease-out duration-300 hover:bg-white">
      {isAdminPage ? adminHeader : notAdminHeader}
    </div>
  );
}
