"use client"
import DesignNav from "@/components/nav/admin-nav/DesignNav";
import { useRouter } from "next/navigation";
import React from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

export default function DesignPage() {
  const router = useRouter();

  const goBackHandler = () => {
    router.push("/admin");
  };
  return (
    <div className="flex flex-col justify-center gap-8 pt-6">
      <div className="flex flex-row justify-between items-center border-b px-5 pb-4 w-full">
        <div className="pl-4 text-gray-800 transition ease-out duration-300 hover:text-gray-600">
          <BsFillArrowLeftCircleFill
            size={30}
            cursor={"pointer"}
            onClick={goBackHandler}
          />
        </div>
        <h1 className="tracking-wide uppercase text-base lg:text-xl lg:pl-32">
          Edit Reviews
        </h1>
      </div>

      <div className="pl-3 pt-5">
        <DesignNav />
      </div>
    </div>
  );
}
