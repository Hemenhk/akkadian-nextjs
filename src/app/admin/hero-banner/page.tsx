"use client";

import * as z from "zod";
import { heroFields } from "@/lib/formFields";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AdminValues,
  fetchAdminValues,
  updateAdminValues,
} from "@/axios-instances/axios";
import TheForm from "@/components/forms/TheForm";
import { useFetchDashboard } from "@/hooks/useFetchDashboard";

const heroFormSchema = z.object({
  heroHeading: z.string(),
  heroSubHeading: z.string(),
  heroButtonText: z.string(),
  heroButtonColor: z.string(),
});

export default function HeroPage() {
  const queryClient = useQueryClient();

  const { data: heroValues } = useFetchDashboard();

  console.log("hero values", heroValues)

  const heroDefaultValues = {
    heroHeading: heroValues?.heroHeading || "",
    heroSubHeading: heroValues?.heroSubHeading || "",
    heroButtonText: heroValues?.heroButtonText || "",
    heroButtonColor: heroValues?.heroButtonColor || "",
  };

  const { mutateAsync: updateBannerMutation, isPending } = useMutation({
    mutationFn: async (data: AdminValues) => {
      updateAdminValues(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["admin"], data);
      queryClient.refetchQueries({ queryKey: ["admin"] });
    },
  });

  const handleSubmit = async (values: z.infer<typeof heroFormSchema>) => {
    try {
      await updateBannerMutation(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TheForm
      defaultValues={heroDefaultValues}
      formFields={heroFields}
      formSchema={heroFormSchema}
      formTitle={"Edit Hero Banner"}
      handleSubmit={handleSubmit}
    />
  );
}
