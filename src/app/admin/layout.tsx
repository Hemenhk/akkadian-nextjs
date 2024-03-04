import { Metadata } from "next";
import React from "react";

import AdminLayoutProvider from "../context/admin-layout";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchAdminValues } from "@/axios-instances/axios";

type AdminProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "The dashboard for the store admin",
};

export default async function AdminDashboardLayout({ children }: AdminProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["admin"],
    queryFn: fetchAdminValues,
  });

  return (
    <section className="flex flex-row">
      <AdminLayoutProvider>
        <HydrationBoundary state={dehydrate(queryClient)}>
          {children}
        </HydrationBoundary>
      </AdminLayoutProvider>
    </section>
  );
}
