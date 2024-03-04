"use client"
import { useFetchDashboard } from "@/hooks/useFetchDashboard";
import HeroBanner from "./HeroBanner";
import FeaturedCollection from "../featured-collection/FeaturedCollection";

export default function TheHomePage() {
  const { data: bgImage } = useFetchDashboard();

  const bgImageStyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bgImage?.heroImage}) center/cover no-repeat`,
    height: "95vh",
  };

  console.log("1", bgImage);

  return (
    <>
      <div
        className={`flex flex-col justify-start gap-10 h-[600px] w-full `}
        style={bgImageStyle}
      >
        <div className="relative top-[50%] lg:top-[70%] pl-8">
          <HeroBanner />
        </div>
      </div>
      <FeaturedCollection handle="hair" />
    </>
  );
}
