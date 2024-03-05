"use client";

import * as z from "zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminValues, updateAdminValues } from "@/axios-instances/axios";

import { announcementFields } from "@/lib/formFields";

import TheForm from "@/components/forms/TheForm";
import { useFetchDashboard } from "@/hooks/useFetchDashboard";

const announcementFormSchema = z.object({
  announcementText: z.string(),
  announcementColor: z.string(),
});

export default function AnnouncementPage() {
  const queryClient = useQueryClient();

  const { data: announcementData, isLoading } = useFetchDashboard();

  const announcementDefaultValues = {
    announcementText: announcementData?.announcementText || "",
    announcementColor: announcementData?.announcementColor || "",
  };

  const { mutateAsync: updateAnnouncementMutation, isPending } = useMutation({
    mutationFn: async (data: AdminValues) => {
      updateAdminValues(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["admin"], data);
      queryClient.refetchQueries({ queryKey: ["admin"] });
    },
  });

  const handleSubmit = async (
    values: z.infer<typeof announcementFormSchema>
  ) => {
    try {
      await updateAnnouncementMutation(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TheForm
      defaultValues={announcementDefaultValues}
      formFields={announcementFields}
      formSchema={announcementFormSchema}
      formTitle={"Edit Announcement Bar"}
      handleSubmit={handleSubmit}
    />
  );
}
