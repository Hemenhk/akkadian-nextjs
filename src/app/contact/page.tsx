import React from "react";

export default function ContactPage() {
  return (
    <div className="flex flex-col justify-center items-center p-10 gap-10 h-[530px]">
      <h1 className="text-3xl font-bold uppercase">Contact Us</h1>
      <div className="flex flex-col gap-5 text-lg w-[60%]">
        <p>
          If you have any questions, comments or concerns, feel free to reach
          out to us. We would love to hear from you!
        </p>
        <p>email address</p>
        <div>
          <h2>Address</h2>
          <p>Random gata, 52222, Stockholm Sverige</p>
        </div>
      </div>
    </div>
  );
}
