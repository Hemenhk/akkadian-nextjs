import Link from "next/link";
import React from "react";

const links = [
  { title: "Logo", href: "/admin/design/logo" },
  { title: "Announcement", href: "/admin/design/announcement" },
  { title: "Hero Banner", href: "/admin/design/hero-banner" },
  { title: "Hero Image", href: "/admin/design/hero-image" },
  { title: "Footer", href: "/admin/design/footer" },
];
export default function DesignNav() {
  return (
    <div className="w-[80%]">
      <ul className="flex flex-col gap-2 relative w-full">
        {links.map((link) => (
          <li
            key={link.href}
            className="flex items-center text-left uppercase p-3 w-full rounded-sm transition duration-300 ease-out hover:bg-gray-100"
          >
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
