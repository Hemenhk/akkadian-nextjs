"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import HeroBanner from "@/components/hero/HeroBanner";
import FeaturedCollection from "@/components/featured-collection/FeaturedCollection";



export default function Home() {
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/auth/admin-dashboard/hero-banner");
        setBgImage(res.data.heroValues[0].heroImage);
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
