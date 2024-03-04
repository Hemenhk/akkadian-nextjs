"use client";

import { useFetchDashboard } from "@/hooks/useFetchDashboard";

export default function TheAnnouncement() {
  const { data: announcementColor } = useFetchDashboard();

  return (
    <div
      className={`flex justify-center items-center h-[5vh]`}
      style={{ background: announcementColor?.announcementColor }}
    >
      <p className="tracking-widest text-white uppercase">
        {announcementColor?.announcementText}
      </p>
    </div>
  );
}
