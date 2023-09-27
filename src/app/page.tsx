import HeroBanner from "@/components/hero/HeroBanner";


import classes from "./Home.module.css";
import FeaturedCollection from "@/components/featured-collection/FeaturedCollection";



export default function Home() {


  return (
    <div className="flex flex-col items-center justify-center gap-5 pb-10">
      <div
        className={`flex flex-col justify-start gap-10 h-[600px] w-screen ${classes.bg}`}
      >
        <div className="relative top-[40%] pl-8 ">
          <HeroBanner />
        </div>
     
      </div>   <FeaturedCollection handle="hair" /> 
    </div>
  );
}
