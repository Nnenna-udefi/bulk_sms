import Link from "next/link";
import React from "react";

const navItems = [
  { id: 1, link: "/", text: "Home" },
  { id: 2, link: "/about_us", text: "About Us" },
  { id: 3, link: "/faq", text: "FAQ" },
  { id: 4, link: "/login", text: "Login" },
  { id: 5, link: "/signup", text: "Sign Up" },
];
const Footer = () => {
  return (
    <div className="bg-[#0e1726] h-75 text-white py-16 px-12 md:px-24">
      <div className="block md:flex gap-8">
        <Link href="/">
          <h1 className="font-bold text-2xl md:text-6xl">Nulky</h1>
        </Link>

        <ul className="flex flex-col gap-3 text-base md:text-xl">
          {navItems.map((item) => (
            <Link key={item.id} href={item.link}>
              <li>{item.text}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
