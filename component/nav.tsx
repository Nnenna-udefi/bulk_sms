"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const navItems = [
  { id: 1, link: "/", text: "Home" },
  { id: 2, link: "/about_us", text: "About Us" },
  { id: 3, link: "#faq", text: "FAQ" },
  { id: 4, link: "/contact", text: "Contact" },
  { id: 4, link: "/auth/login", text: "Login" },
  { id: 5, link: "/auth/signup", text: "Sign Up" },
];
const Nav = () => {
  const [nav, showNav] = useState(false);
  const router = useRouter();

  const pathname = usePathname();

  const handleNav = () => {
    showNav((prev) => !prev);
  };
  const handleNavClick = (link: string) => {
    showNav(false); // Close the mobile nav

    if (link.startsWith("#")) {
      if (pathname !== "/") {
        // If not on home, go to home with anchor
        router.push(`/${link}`);
      } else {
        // If already on home, scroll to section
        const el = document.querySelector(link);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      router.push(link);
    }
  };
  return (
    <div className="py-4 md:py-6 md:text-lg text-base px-8 md:px-16 bg-gray-900 text-white">
      <div className="flex justify-between w-full">
        <Link href="/">
          <h1 className="font-bold">Nulky</h1>
        </Link>

        <ul className="md:flex gap-6 hidden">
          {navItems.map((item) => (
            <Link key={item.id} href={item.link}>
              <li className="hover:border-b">{item.text}</li>
            </Link>
          ))}
        </ul>

        <div className="block md:hidden" onClick={handleNav}>
          <Menu />
        </div>
      </div>

      <AnimatePresence>
        {nav && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black cursor-pointer bg-opacity-10 backdrop-blur-sm z-10"
            />
            {/* Animated Mobile Nav */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-screen pt-13 fixed inset-0 w-[80%] bg-white text-[#0e1726] z-20"
            >
              <div
                className="absolute top-4 right-4 cursor-pointer"
                onClick={handleNav}
              >
                <X />
              </div>

              <ul className="space-y-7.5 text-[18px] pl-2 mx-3 text-center pt-10">
                {navItems.map((item) => {
                  const isActive = pathname === item.link;

                  return (
                    <li key={item.text}>
                      <button
                        onClick={() => handleNavClick(item.link)}
                        className={`${
                          isActive
                            ? "font-bold"
                            : "text-[#0e1726] hover:text-[#4f4e4c]"
                        } w-full text-[18px]`}
                      >
                        {item.text}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Nav;
