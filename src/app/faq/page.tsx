import React from "react";

export default function FaqPage() {
  return (
    <div className="flex flex-col m-auto gap-5 mb-40 text-center w-[40%]">
      <h1 className="m-10">FAQ</h1>
      <p>
        <strong>Question</strong>: How long are your delivery times?
      </p>
      <p className="border-b pb-5">
        <strong>Answer</strong>: We try to send out our orders the same day if
        the order is placed before 12:00. Otherwise, it usually takes one
        working day. Then it takes 2-4 days for the post office to deliver the
        packages. For international shipments, the usual time is betwen 3-5
        days, depending on where you are.
      </p>
      <p>
        <strong>Question</strong>: I did not like how a certain product worked.
        Can I return it?
      </p>
      <p className="border-b pb-5">
        <strong>Answer</strong>: Only unused and unopened products can be
        returned. The customer is responsible for returning the product within
        14 days of receiving it. The customer is responsible for the cost of
        returned shipping. The refund is made within 14 days after we have
        received the returned item.
      </p>
    </div>
  );
}
