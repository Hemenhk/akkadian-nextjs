import React from "react";

import { BsTrash } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteSingleReview,
} from "@/axios-instances/axios";

export default function DeleteReview({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteReviewMutation } = useMutation({
    mutationKey: ["reviews"],
    mutationFn: async () => {
      await deleteSingleReview(id);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["reviews"] });
    },
  });

  const handleDelete = async () => {
    console.log("ID to be deleted:", id);
    try {
      await deleteReviewMutation();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="mx-auto cursor-pointer" onClick={handleDelete}>
      <BsTrash size={20} />
    </div>
  );
}
