"use client";
import HeroBanner from "@/components/hero/HeroBanner";
import FeaturedCollection from "@/components/featured-collection/FeaturedCollection";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminValues } from "@/axios-instances/axios";

export default function Home() {

  const {data: adminValues} = useQuery({
    queryKey: ["admin"],
    queryFn: fetchAdminValues
  })

  const bgImageStyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${adminValues?.heroImage}) center/cover no-repeat`,
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
