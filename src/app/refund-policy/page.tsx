"use client"

import { fetchReturnPolicy } from '@/shopify/shopify-req';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

export default function RefundPolicyPage() {
    const { data: refundData } = useQuery({
      queryKey: ["refund"],
      queryFn: fetchReturnPolicy
    });
  
    const replaceLineBreaks = (htmlString) => {
      return { __html: htmlString?.replace(/<br\s*\/?>/g, "<br />") };
    };
    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold pt-10">{refundData?.title}</h1>
        <p
          dangerouslySetInnerHTML={replaceLineBreaks(refundData?.body)}
          className="text-center p-10"
        />
      </div>
    );
  }