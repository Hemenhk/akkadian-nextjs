import React from "react";
import SideNav from "./sidenav/SideNav";

import logo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "../cart/CartIcon";

export default function MainNav() {
  return (
    <div className="flex h-[125px] justify-between items-center p-10 border-b  transition ease-out duration-300 hover:bg-white">
      <div>
        <SideNav />
      </div>
      <Link href={"/"}>
        <Image src={logo} alt="logo" width={50} height={50} />
      </Link>
      <div>
        <CartIcon />
      </div>
    </div>
  );
}
