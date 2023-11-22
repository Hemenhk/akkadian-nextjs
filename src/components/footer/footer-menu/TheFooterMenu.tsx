import Link from "next/link";
import React from "react";

export default function TheFooterMenu() {
  return (
    <div className="flex flex-col gap-2">
      <p className="tracking-wide">
        <Link href={"/terms-policy"}>Terms & Conditions</Link>
      </p>
      <p className="tracking-wide">
        <Link href={"/privacy-policy"}>Privacy Policy</Link>
      </p>
      <p className="tracking-wide">
        <Link href={"/refund-policy"}>Refund Policy</Link>
      </p>
      <p className="tracking-wide"><Link href={"/contact"}>Contact Us</Link></p>
    </div>
  );
}
