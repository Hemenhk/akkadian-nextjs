"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";

import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Oval } from "react-loader-spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminValues, updateAdminValues } from "@/axios-instances/axios";

export default function LogoUploadForm() {
  const [file, setFile] = useState<File>();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const goBackHandler = () => {
    router.push("/admin");
  };

  const { mutateAsync: updateLogo } = useMutation({
    mutationFn: async (data: AdminValues) => {
      return updateAdminValues(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["admin"], data);
      queryClient.refetchQueries({ queryKey: ["admin"] });
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", process.env.CLOUDINARY_PRESET as string);

      setIsLoading(true);

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
        data
      );
      console.log("logo", cloudinaryResponse);
      const logoValue  = cloudinaryResponse.data.secure_url;

      const res = await updateLogo({ logoImage: logoValue });
      console.log("logo", res);
      setIsLoading(false);
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center gap-8 pt-6"
    >
      <div className="flex flex-row justify-between border-b px-5 pb-4">
        <div className="pl-4 text-gray-800 transition ease-out duration-300 hover:text-gray-600">
          <BsFillArrowLeftCircleFill
            size={30}
            cursor={"pointer"}
            onClick={goBackHandler}
          />
        </div>
        <h1 className="tracking-wide uppercase text-base lg:text-xl">
          Edit Hero Image
        </h1>
      </div>

      <div className="flex flex-col justify-center pl-4">
        <input
          type="file"
          name="file"
          accept="image/png"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <button
          type="submit"
          className="w-[80%] rounded-sm p-2 mt-5  bg-gray-800 text-gray-200 transition ease-out duration-300 hover:bg-gray-600 "
        >
          {isLoading ? (
            <div className="flex flex-row items-center justify-center gap-2">
              <Oval
                height={20}
                width={20}
                color="#e5e7eb"
                secondaryColor="#e5e7eb"
              />{" "}
              Saving
            </div>
          ) : (
            <p>Save</p>
          )}
        </button>
      </div>
    </form>
  );
}
