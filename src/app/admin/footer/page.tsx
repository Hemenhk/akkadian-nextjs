"use client";

import { useRouter } from "next/navigation";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Oval } from "react-loader-spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AdminValues,
  fetchAdminValues,
  updateAdminValues,
} from "@/axios-instances/axios";

const formSchema = z.object({
  footerBackgroundColor: z.string(),
});

export default function FooterPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: footerValue } = useQuery({
    queryKey: ["admin"],
    queryFn: fetchAdminValues,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      footerBackgroundColor: footerValue?.footerBackgroundColor,
    },
  });

  const { mutateAsync: updateFooterMutation, isPending } = useMutation({
    mutationFn: async (data: AdminValues) => {
      updateAdminValues(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["admin"], data);
      queryClient.refetchQueries({ queryKey: ["admin"] });
    },
  });

  const goBackHandler = () => {
    router.push("/admin");
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { footerBackgroundColor } = values;
      await updateFooterMutation({ footerBackgroundColor });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-8 pt-6">
      <div className="flex flex-row justify-between border-b px-5 pb-4">
        <div className="pl-4 text-gray-800 transition ease-out duration-300 hover:text-gray-600">
          <BsFillArrowLeftCircleFill
            size={30}
            cursor={"pointer"}
            onClick={goBackHandler}
          />
        </div>
        <h1 className="tracking-wide uppercase text-base lg:text-xl">
          Edit Footer
        </h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full lg:w-[80%] px-5"
        >
          <FormField
            control={form.control}
            name="footerBackgroundColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Footer Background Color</FormLabel>
                <FormControl>
                  <Input
                    type="color"
                    placeholder="footer background color"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full rounded-sm px-16 uppercase tracking-widest"
            type="submit"
          >
            {isPending ? (
              <div className="flex flex-row items-center justify-center gap-2">
                <Oval
                  height={20}
                  width={20}
                  color="#e5e7eb"
                  secondaryColor="#e5e7eb"
                />
                Saving
              </div>
            ) : (
              <p>Save</p>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
