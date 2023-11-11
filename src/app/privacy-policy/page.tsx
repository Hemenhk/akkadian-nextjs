"use client";

import { fetchPrivacyPolicy } from "@/shopify/shopify-req";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function PrivacyPolicyPage() {
  const { data: privacyData } = useQuery({
    queryKey: ["privacy-policy"],
    queryFn: fetchPrivacyPolicy,
  });

  const replaceLineBreaks = (htmlString: string) => {
    return { __html: htmlString?.replace(/<br\s*\/?>/g, "<br />") };
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold pt-10">{privacyData?.title}</h1>
      <p
        dangerouslySetInnerHTML={replaceLineBreaks(privacyData?.body)}
        className="text-center p-10"
      />
    </div>
  );
}
