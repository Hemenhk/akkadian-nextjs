"use client";

import axios from "axios";
import { useEffect, useState } from "react";

// import HeroBanner from "@/components/hero/HeroBanner";
// import FeaturedCollection from "@/components/featured-collection/FeaturedCollection";
import dynamic from "next/dynamic";

const HeroBanner = dynamic(() => import("@/components/hero/HeroBanner"), {
  ssr: false,
});
const FeaturedCollection = dynamic(
  () => import("@/components/featured-collection/FeaturedCollection"),
  { ssr: false }
);

export default function Home() {
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedHeroValue = localStorage.getItem("heroImage");
        if (cachedHeroValue) {
          setBgImage(JSON.parse(cachedHeroValue));
        }
        const res = await axios.get("/api/auth/admin-dashboard/hero-banner");
        const data = res.data.heroValues[0];
        localStorage.setItem("heroImage", JSON.stringify(data));
        setBgImage(data.heroImage);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const bgImageStyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bgImage}) center/cover no-repeat`,
    height: "95vh",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 pb-10">
      <div
        className={`flex flex-col justify-start gap-10 h-[600px] w-full `}
        style={bgImageStyle}
      >
        <div className="relative top-[50%] lg:top-[70%] pl-8">
          <HeroBanner />
        </div>
      </div>
      <FeaturedCollection handle="hair" />
    </div>
  );
}
