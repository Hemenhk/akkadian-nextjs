import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SlOptionsVertical } from "react-icons/sl";
import { BsTrash } from "react-icons/bs";
import { Button } from "@chakra-ui/react";
import axios from "axios";

export default function DeleteReview({ id }: { id: string }) {
  const handleDelete = async () => {
    console.log('ID to be deleted:', id)
    try {
      const res = await axios.delete("/api/reviews", {data: {id}});
      console.log("did work", res);
      alert("Review deleted successfully");
    } catch (error) {
      console.error("Error deleting review:", error);
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
            <div onClick={handleDelete}>
              <BsTrash />
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
