import Link from "next/link";
import React from "react";

export default function AdminNav() {
  const adminNavLinks = [
    { title: "Home", href: "/" },
    { title: "Announcement", href: "/admin/announcement" },
    { title: "Hero Banner", href: "/2" },
    { title: "Change Password", href: "/admin/change-password" },
  ];

  return (
    <div className="w-[80%]">
      <ul className="flex flex-col gap-4 relative top-96 w-full">
        {adminNavLinks.map((link) => (
          <li key={link.href} className="flex items-center text-left p-2 w-full rounded-sm transition duration-300 ease-out hover:bg-gray-100">
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
