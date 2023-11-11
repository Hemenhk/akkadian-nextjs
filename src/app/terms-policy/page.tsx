"use client";
import { fetchTermsPolicy } from "@/shopify/shopify-req";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function TermsPolicy() {
  const { data: termsData } = useQuery({
    queryKey: ["terms"],
    queryFn: fetchTermsPolicy,
  });

  const replaceLineBreaks = (htmlString) => {
    return { __html: htmlString?.replace(/<br\s*\/?>/g, "<br />") };
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold pt-10">{termsData?.title}</h1>
      <p
        dangerouslySetInnerHTML={replaceLineBreaks(termsData?.body)}
        className="text-center p-10"
      />
    </div>
  );
}
