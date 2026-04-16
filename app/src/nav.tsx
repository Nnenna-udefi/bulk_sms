import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";

const navItems = [
  { id: 1, link: "/", text: "Home" },
  { id: 2, link: "/about_us", text: "About Us" },
  { id: 3, link: "/faq", text: "FAQ" },
  { id: 4, link: "/login", text: "Login" },
  { id: 5, link: "/signup", text: "Sign Up" },
];
const Nav = () => {
  return (
    <div className="py-4 md:py-6 md:text-lg text-base px-8 md:px-16 bg-gray-900 text-white">
      <div className="flex justify-between w-full">
        <Link href="/">
          <h1 className="font-bold">BulkSMS</h1>
        </Link>

        <ul className="md:flex gap-6 hidden">
          {navItems.map((item) => (
            <Link key={item.id} href={item.link}>
              <li>{item.text}</li>
            </Link>
          ))}
        </ul>

        <div className="block md:hidden">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Nav;
