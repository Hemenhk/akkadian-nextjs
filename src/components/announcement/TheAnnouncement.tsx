"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";


export default function TheAnnouncement() {
  const [announcementColor, setAnnouncementColor] = useState("");
  const [announcementText, setAnnouncementText] = useState("");

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const data = await axios.get("/api/auth/admin-dashboard/announcement");
        console.log("Announcement data", data.data.announcementValue[0]);
        setAnnouncementText(data.data.announcementValue[0].announcementText);
        setAnnouncementColor(data.data.announcementValue[0].announcementColor);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnnouncement();
  }, []);

  return (
    <div
      className={`flex justify-center items-center h-[5vh]`}
      style={{ background: announcementColor }}
    >
      <p className="tracking-widest text-white uppercase">{announcementText}</p>
    </div>
  );
}
