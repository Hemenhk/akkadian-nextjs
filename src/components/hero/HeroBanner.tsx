import React, { useEffect, useState } from "react";
import Link from "next/link";

import axios from "axios";

import classes from "./styles/HeroBanner.module.css";

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
        const cachedHeroValues = localStorage.getItem("heroValues");
        if (cachedHeroValues) {
          setHeroValues(JSON.parse(cachedHeroValues));
        }
        const res = await axios.get("/api/auth/admin-dashboard/hero-banner");
        console.log("Hero", res);
        const data = res.data.heroValues[0];
        localStorage.setItem("heroValues", JSON.stringify(data));
        setHeroValues({
          heroImage: data?.heroImage,
          heroHeading: data?.heroHeading,
          heroSubHeading: data?.heroSubHeading,
          heroButtonText: data?.heroButtonText,
          heroButtonColor: data?.heroButtonColor,
        });
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
      <h1 className="tracking-wider text-white text-2xl lg:text-3xl font-bold">
        {heroValues.heroHeading}
      </h1>
      <p className="tracking-wider font-medium text-[#dbdbdb] lg:text-lg ">
        {heroValues.heroSubHeading}
      </p>
      <Link href={"/product/sea-salt-spray"}>
        <button className={classes.btn}>{heroValues.heroButtonText}</button>
      </Link>
    </div>
  );
}
