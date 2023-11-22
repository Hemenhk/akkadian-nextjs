"use client";

import { useQuery } from "@tanstack/react-query";
import TheFooterMenu from "./footer-menu/TheFooterMenu";

import classes from "./styles/TheFooter.module.css";
import { fetchAdminValues } from "@/axios-instances/axios";

export default function TheFooter() {
  const { data: adminValues } = useQuery({
    queryKey: ["admin"],
    queryFn: fetchAdminValues,
  });

  return (
    <div
      className={`flex flex-col gap-8 h-80 text-gray-200  ${classes.container}`}
      style={{ background: adminValues?.footerBackgroundColor }}
    >
      <div className="flex flex-row pl-5 pt-14 gap-8 h-3/4">
        <div>
          <h2>Jawline</h2>
        </div>
        <div>
          <TheFooterMenu />
        </div>
      </div>
      <div className="flex items-center justify-between px-5  w-full h-1/4 border-t">
        <div className="flex flex-row gap-5">
          <p className="font-light tracking-wide">Crafted by Hemen</p>|
          <p className="font-light tracking-wide"> Designed in Sweden</p>
        </div>
        <div>
          <p className="font-light tracking-wide">Powered by Shopify</p>
        </div>
      </div>
    </div>
  );
}
