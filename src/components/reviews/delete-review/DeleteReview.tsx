import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SlOptionsVertical } from "react-icons/sl";
import { BsTrash } from "react-icons/bs";
import { Button } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ReviewProps,
  deleteSingleReview,
  updateSingleReview,
} from "@/axios-instances/axios";

export default function DeleteReview({
  id,
  isVerified,
}: {
  id: string;
  isVerified: boolean;
}) {
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

  const { mutateAsync: verifyReviewMutation } = useMutation({
    mutationKey: ["reviews"],
    mutationFn: async () => {
      const verifyReview = !isVerified;
      const updatedReview = await updateSingleReview(id, verifyReview);
      return verifyReview;
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

  const verifyReviewHandler = async () => {
    try {
      const res = await verifyReviewMutation();
      console.log("verify", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="hover:bg-transparent">
            <SlOptionsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <DropdownMenuItem>
              <Button onClick={verifyReviewHandler}>Verify</Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div onClick={handleDelete}>
                <BsTrash />
              </div>
            </DropdownMenuItem>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
