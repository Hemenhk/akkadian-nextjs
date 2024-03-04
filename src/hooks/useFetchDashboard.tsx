"use client"
import { fetchAdminValues } from "@/axios-instances/axios";
import { useQuery } from "@tanstack/react-query";

export function useFetchDashboard() {
  return useQuery({
    queryKey: ["admin"],
    queryFn: async () => fetchAdminValues(),
  });
}
