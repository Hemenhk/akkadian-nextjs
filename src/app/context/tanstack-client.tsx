"use client";

import { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchAdminValues } from "@/axios-instances/axios";

const queryClient = new QueryClient();

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}) {

  
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
