import { Metadata } from "next";
import React from "react";
import Home from "../page";
import AdminLayoutProvider from "../context/admin-layout";

type AdminProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "The dashboard for the store admin",
};

export default function AdminDashboardLayout({ children,  }: AdminProps) {


  return (
    <section className="flex flex-row">
          <AdminLayoutProvider>
            {children}
          </AdminLayoutProvider>
    </section>
  );
}
