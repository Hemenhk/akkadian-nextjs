"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TheAnnouncement() {
  const [announcementValues, setAnnouncementValues] = useState({
    announcementColor: "",
    announcementText: "",
  });
  // const [announcementColor, setAnnouncementColor] = useState("");
  // const [announcementText, setAnnouncementText] = useState("");

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const cachedAnnouncementValues =
          localStorage.getItem("announcementValues");
        if (cachedAnnouncementValues) {
          setAnnouncementValues(JSON.parse(cachedAnnouncementValues));
        }
        const res = await axios.get("/api/auth/admin-dashboard/announcement");
        const data = res.data.announcementValue[0];
        // console.log("Announcement data", data.data.announcementValue[0]);
        localStorage.setItem("announcementValues", JSON.stringify(data));
        setAnnouncementValues({
          announcementColor: data.announcementColor,
          announcementText: data.announcementText,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnnouncement();
  }, []);

  return (
    <div
      className={`flex justify-center items-center h-[5vh]`}
      style={{ background: announcementValues.announcementColor }}
    >
      <p className="tracking-widest text-white uppercase">{announcementValues.announcementText}</p>
    </div>
  );
}
