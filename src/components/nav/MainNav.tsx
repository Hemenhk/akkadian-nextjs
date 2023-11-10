"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useHover } from "@uidotdev/usehooks";
import Image from "next/image";
import Link from "next/link";

import SideNav from "./sidenav/SideNav";
import CartIcon from "../cart/CartIcon";
import TheButton from "../ui/TheButton";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminValues } from "@/axios-instances/axios";


export default function MainNav() {

  const { data: session } = useSession();
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const pathname = usePathname();
  const isAdminPage = pathname === "/admin";
  const isHomePage = pathname === "/";

  const {data: logoValue} = useQuery({
    queryKey: ["admin"],
    queryFn: fetchAdminValues
  })

  console.log("logo header", logoValue?.logo)

  const signOutHandler = () => {
    signOut();
  };

  

  const adminHeader = (
    <>
      <SideNav isHovered={isHovered} isHomePage={isHomePage} />
      <Link href={"/"}>
        <Image src={logoValue?.logo} alt="logo" width={50} height={50} />
      </Link>
      <TheButton label="sign out" onClick={signOutHandler} width="w-[150px]" />
    </>
  );

  const notAdminHeader = (
    <>
      <SideNav isHovered={isHovered} isHomePage={isHomePage}/>
      <Link href={"/"}>
        <Image src={logoValue?.logo} alt="logo" width={50} height={50} />
      </Link>
      <CartIcon isHovered={isHovered} isHomePage={isHomePage} />
    </>
  );

  return (
    <div
      className={`flex h-[125px] justify-between items-center p-10 border-b transition ease-out duration-300 bg-transparent ${
        session
          ? isHomePage && "absolute w-full"
          : isHomePage && "absolute w-full"
      } hover:bg-white`}
      ref={hoverRef}
    >
      {isAdminPage ? adminHeader : notAdminHeader}
    </div>
  );
}
