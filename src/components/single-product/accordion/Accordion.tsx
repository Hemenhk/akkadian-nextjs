import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ReviewAccordion from "../review/ReviewAccordion";
import ReviewForm from "../review/ReviewForm";

type AccordionProps = {
  productHandle: string;
  metafields: any;
};

export default function TheAccordion({
  metafields,
  productHandle,
}: AccordionProps) {
  const mappedMetafields = metafields?.slice(0, 3).map((field, idx) => (
    <AccordionItem key={idx} value={field?.key}>
      <AccordionTrigger className="uppercase text-sm tracking-widest leading-6 font-light">
        {field?.key}
      </AccordionTrigger>
      <AccordionContent className="whitespace-break-spaces">
        {field?.value}
      </AccordionContent>
    </AccordionItem>
  ));
  return (
    <>
      {metafields && metafields[0] !== null ? (
        <Accordion type="single" collapsible className="w-[450px]">
          {mappedMetafields}
          <AccordionItem value="Reviews">
            <AccordionTrigger className="uppercase text-sm tracking-widest leading-6 font-light">
              Reviews 
            </AccordionTrigger>
            <AccordionContent className="whitespace-break-spaces">
              <div className="pb-10">
                <ReviewForm productHandle={productHandle} />
              </div>
              <ReviewAccordion itemHandle={productHandle} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        ""
      )}
    </>
  );
}
