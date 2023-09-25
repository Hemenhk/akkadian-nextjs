import Link from "next/link";
import React from "react";

import classes from "./styles/HeroBanner.module.css"

export default function HeroBanner() {
  return (
    <div className={`flex flex-col justify-center pl-10 w-[60%] gap-5 ${classes.container}`}>
      <h1 className="tracking-wider text-white text-2xl font-bold">
        Style your hair with the sea!
      </h1>
      <p className="tracking-wider font-medium text-[#dbdbdb] ">
        Unlock incredible texture and a high hold with a matte finish, with our
        sea salt spray!
      </p>
      <Link href={"/product/sea-salt-spray"}>
        <button className={classes.btn}>
        View Product
        </button>
      </Link>
    </div>
  );
}
