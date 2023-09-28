"use client"

import HeroBanner from "@/components/hero/HeroBanner";
import FeaturedCollection from "@/components/featured-collection/FeaturedCollection";

import classes from "./Home.module.css";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname()
  return (
    <div className="flex flex-col items-center justify-center gap-5 pb-10">
      <div
        className={`flex flex-col justify-start gap-10 h-[600px] w-full ${classes.bg}`}
      >
        <div className="relative top-[40%] pl-8 ">
          <HeroBanner />
        </div>
      </div>
      <FeaturedCollection handle="hair" />
    </div>
  );
}
