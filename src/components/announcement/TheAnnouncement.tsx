"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAdminValues } from "@/axios-instances/axios";

export default function TheAnnouncement() {
  const { data: adminValues } = useQuery({
    queryKey: ["admin"],
    queryFn: fetchAdminValues,
  });


  return (
    <div
      className={`flex justify-center items-center h-[5vh]`}
      style={{ background: adminValues?.announcementColor }}
    >
      <p className="tracking-widest text-white uppercase">{adminValues?.announcementText}</p>
    </div>
  );
}
