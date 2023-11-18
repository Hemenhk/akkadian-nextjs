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
import DeleteReview from "./DeleteReview";
import VerifyReview from "./VerifyReview";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
  isVerified: boolean;
};

export default function EditReview({ id, isVerified }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="hover:bg-transparent">
          <SlOptionsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 flex flex-col justify-center items-center">
        <DropdownMenuLabel>
          <DropdownMenuItem>
            <VerifyReview id={id} isVerified={isVerified} />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DeleteReview id={id} />
          </DropdownMenuItem>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
