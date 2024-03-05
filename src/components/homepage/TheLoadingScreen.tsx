"use client";

import React from "react";
import Image from "next/image";

export default function TheLoadingScreen() {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-[#fafafa]">
      <Image src="/akkadian-logo.png" alt="bg-logo" height={400} width={400} className="animate-logo-scale" />
    </div>
  );
}
