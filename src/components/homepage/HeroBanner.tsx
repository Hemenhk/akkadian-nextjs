import Link from "next/link";
import { useFetchDashboard } from "@/hooks/useFetchDashboard";

import classes from "./styles/HeroBanner.module.css";

export default function HeroBanner() {
  const { data: hero } = useFetchDashboard();

  return (
    <div
      className={`flex flex-col justify-center pl-10 w-[60%] gap-5 ${classes.container}`}
    >
      <h1 className="tracking-wider text-white text-2xl lg:text-3xl font-bold">
        {hero?.heroHeading}
      </h1>
      <p className="tracking-wider font-medium text-[#dbdbdb] lg:text-lg ">
        {hero?.heroSubHeading}
      </p>
      <Link href={"/product/sea-salt-spray"}>
        <button className={classes.btn}>{hero?.heroButtonText}</button>
      </Link>
    </div>
  );
}
