"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

export default function TheAnnouncement() {
  const [announcementColor, setAnnouncementColor] = useState("");
  const [announcementText, setAnnouncementText] = useState("");

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const data = await axios.get("/api/auth/admin-dashboard/announcement");
      console.log("Announcement data", data.data.announcementValue[0]);
      setAnnouncementText(data.data.announcementValue[0].announcementText);
      setAnnouncementColor(data.data.announcementValue[0].announcementColor);
    };
    fetchAnnouncement();
  }, []);

  try {
  } catch (error) {
    console.log(error);
  }

  return (
    <div
      className={`flex justify-center items-center bg-[${announcementColor}] h-[5vh]`}
    >
      <p className="tracking-widest text-white uppercase">
        {/* ALWAYS FREE SHIPPING WORLD WIDE */}
        {announcementText}
      </p>
    </div>
  );
}
