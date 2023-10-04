"use client";

import { Metadata } from "next";
import React from "react";
import Home from "../page";
import { usePathname } from "next/navigation";

type AdminProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "The dashboard for the store admin",
};

export default function AdminDashboardLayout({ children }: AdminProps) {
  const pathname = usePathname();

  const isReviewPage = pathname === "/admin/reviews";

  return (
    <section className="flex flex-row">
      {isReviewPage ? (
        <div className="w-full">{children}</div>
      ) : (
        <>
          <div className="w-1/3">{children}</div>
          <div className="w-2/3">
            <Home />
          </div>
        </>
      )}
    </section>
  );
}
