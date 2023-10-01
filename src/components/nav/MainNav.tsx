"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useHover } from "@uidotdev/usehooks";
import Image from "next/image";
import Link from "next/link";

import SideNav from "./sidenav/SideNav";
import CartIcon from "../cart/CartIcon";
import TheButton from "../ui/TheButton";

import logo from "@/assets/images/logo.png";

export default function MainNav() {
  const { data: session } = useSession();
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const pathname = usePathname();
  const isAdminPage = pathname === "/admin";
  const isHomePage = pathname === "/";

  const signOutHandler = () => {
    signOut();
  };

  const adminHeader = (
    <>
      <SideNav isHovered={isHovered} isHomePage={isHomePage} />
      <Link href={"/"}>
        <Image src={logo} alt="logo" width={50} height={50} />
      </Link>
      <TheButton label="sign out" onClick={signOutHandler} width="w-[150px]" />
    </>
  );

  const notAdminHeader = (
    <>
      <SideNav isHovered={isHovered} isHomePage={isHomePage}/>
      <Link href={"/"}>
        <Image src={logo} alt="logo" width={50} height={50} />
      </Link>
      <CartIcon isHovered={isHovered} isHomePage={isHomePage} />
    </>
  );

  return (
    <div
      className={`flex h-[125px] justify-between items-center p-10 border-b transition ease-out duration-300 bg-transparent ${
        session
          ? isHomePage && "relative w-full"
          : isHomePage && "absolute w-full"
      } hover:bg-white`}
      ref={hoverRef}
    >
      {isAdminPage ? adminHeader : notAdminHeader}
    </div>
  );
}
