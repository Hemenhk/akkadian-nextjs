import Link from "next/link";
import React, { useEffect, useState } from "react";

import classes from "./styles/HeroBanner.module.css";
import axios from "axios";

export default function HeroBanner() {
  const [heroValues, setHeroValues] = useState({
    heroImage: "",
    heroHeading: "",
    heroSubHeading: "",
    heroButtonText: "",
    heroButtonColor: "",
  });

  useEffect(() => {
    const fetchHeroValues = async () => {
      try {
        const data = await axios.get("/api/auth/admin-dashboard/hero-banner");
        console.log("Hero",data)
        setHeroValues({
          heroImage: data.data.heroValues[0].heroImage,
          heroHeading: data.data.heroValues[0].heroHeading,
          heroSubHeading: data.data.heroValues[0].heroSubHeading,
          heroButtonText: data.data.heroValues[0].heroButtonText,
          heroButtonColor: data.data.heroValues[0].heroButtonColor,
        });
        console.log(heroValues.heroHeading)
      } catch (error) {
        console.log(error);
      }
    };
    fetchHeroValues();
  }, []);

  return (
    <div
      className={`flex flex-col justify-center pl-10 w-[60%] gap-5 ${classes.container}`}
    >
      <h1 className="tracking-wider text-white text-2xl font-bold">
        {/* Style your hair with the sea! */}
        {heroValues.heroHeading}
      </h1>
      <p className="tracking-wider font-medium text-[#dbdbdb] ">
        {/* Unlock incredible texture and a high hold with a matte finish, with our
        sea salt spray! */}
        {heroValues.heroSubHeading}
      </p>
      <Link href={"/product/sea-salt-spray"}>
        <button className={classes.btn}>{heroValues.heroButtonText}</button>
      </Link>
    </div>
  );
}
