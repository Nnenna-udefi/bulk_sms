import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

const navItems = [
  { id: 1, link: "/", text: "Home" },
  { id: 2, link: "/about_us", text: "About Us" },
  { id: 3, link: "#faq", text: "FAQ" },
  { id: 4, link: "/auth/login", text: "Login" },
  { id: 5, link: "/auth/signup", text: "Sign Up" },
];
const Footer = () => {
  return (
    <div className="bg-[#0e1726] h-full md:h-75 text-white py-16 px-12 md:px-24">
      <div className="block md:flex justify-between gap-8">
        <Link href="/">
          <h1 className="font-bold text-2xl md:text-6xl">Nulky</h1>
        </Link>

        <ul className="flex flex-col gap-3 text-base md:text-xl py-6 md:py-0">
          {navItems.map((item) => (
            <Link key={item.id} href={item.link}>
              <li className="border-b border-gray-400 w-fit">{item.text}</li>
            </Link>
          ))}
        </ul>
        <ul className="flex flex-col gap-3 text-base md:text-xl py-6 md:py-0">
          <li>Terms of service</li>
          <li>Privacy Policy</li>
          <li>Refer and Earn</li>
        </ul>

        <div className="flex flex-col gap-3 text-base md:text-xl py-6 md:py-0">
          <h4>Contact</h4>
          <div className="flex gap-1">
            <Mail />
            <p>nulky@gmail.com</p>
          </div>
          <div className="flex gap-1">
            <Phone />
            <p>+234 703 641 0352</p>
          </div>
          <div className="flex gap-4 pt-4">
            <SiFacebook />
            <SiInstagram />
            <SiX />
          </div>
        </div>
      </div>
      <div className="pt-4 md:pt-10 md:pb-6 pb-2 text-center text-sm">
        © 2026 Nulky. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
