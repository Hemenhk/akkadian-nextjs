import Link from "next/link";

import classes from "./styles/HeroBanner.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminValues } from "@/axios-instances/axios";

export default function HeroBanner() {
  const { data: adminValues } = useQuery({
    queryKey: ["admin"],
    queryFn: fetchAdminValues,
  });

  return (
    <div
      className={`flex flex-col justify-center pl-10 w-[60%] gap-5 ${classes.container}`}
    >
      <h1 className="tracking-wider text-white uppercase text-2xl lg:text-3xl font-bold">
        {adminValues?.heroHeading}
      </h1>
      <p className="tracking-wider font-medium text-[#dbdbdb] lg:text-lg ">
        {adminValues?.heroSubHeading}
      </p>
      <Link href={"/product/sea-salt-spray"}>
        <button className={classes.btn}>{adminValues?.heroButtonText}</button>
      </Link>
    </div>
  );
}
