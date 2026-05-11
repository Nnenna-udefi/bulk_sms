"use client";
import { AnimatePresence, motion } from "framer-motion";
import { History, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./context/authContext";
import { GrDashboard } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
// import { Avatar, AvatarFallback } from "./ui/avatar";

const navItems = [
  { id: 1, link: "/", text: "Home" },
  { id: 2, link: "/about_us", text: "About Us" },
  { id: 3, link: "/#faq", text: "FAQ" },
  { id: 4, link: "/contact", text: "Contact" },
];
const Nav = () => {
  const [nav, showNav] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [profileMenu, setProfileMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedButton = buttonRef.current?.contains(target);
      const clickedMenu = menuRef.current?.contains(target);

      if (!clickedButton && !clickedMenu) {
        setProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <div className="flex items-center justify-between w-full">
        <Link href="/">
          <h1 className="font-bold">Nulky</h1>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative">
              {/* <Avatar
                className="h-9 w-9 cursor-pointer"
                onClick={() => setProfileMenu((prev) => !prev)}
              >
                <AvatarFallback className="bg-white text-black font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{user.name}</span> */}
              <button
                ref={buttonRef}
                onClick={() => setProfileMenu((prev) => !prev)}
                className="flex items-center gap-3 rounded-full cursor-pointer bg-gray-800 px-3 py-2"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black font-bold">
                  {user.name.charAt(0)}
                </div>

                <span className="font-medium">{user.name}</span>
              </button>

              {profileMenu && (
                <div
                  ref={menuRef}
                  className="absolute border right-0 mt-3 w-56 rounded-2xl bg-[#fafafa] p-2 text-black shadow-xl"
                >
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="w-full flex gap-2 items-center rounded-xl px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
                  >
                    <GrDashboard size={20} />
                    Dashboard
                  </button>

                  <button
                    onClick={() => router.push("/dashboard/history")}
                    className="w-full flex gap-2 items-center rounded-xl px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
                  >
                    <History size={20} />
                    Message History
                  </button>

                  <button
                    onClick={() => router.push("/dashboard/profile")}
                    className="w-full flex gap-2 items-center rounded-xl px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
                  >
                    <CgProfile size={20} />
                    Manage Profile
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      router.push("/");
                    }}
                    className="w-full flex gap-2 items-center rounded-xl px-4 py-3 text-left cursor-pointer text-red-500 hover:bg-red-50"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <ul className="md:flex gap-6 hidden">
                {navItems.map((item) => {
                  const isActive = pathname === item.link;
                  return (
                    <Link key={item.id} href={item.link}>
                      <li
                        className={`${isActive ? "border-b" : ""} hover:border-b`}
                      >
                        {item.text}
                      </li>
                    </Link>
                  );
                })}
              </ul>
              <Link href="/auth/login">Login</Link>

              <Link
                href="/auth/signup"
                className="rounded-xl bg-white px-5 py-2 text-black"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <div className="block md:hidden cursor-pointer" onClick={handleNav}>
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

              <div className="flex h-full flex-col">
                {/* Top Section */}
                <div className="border-b border-gray-200 p-6">
                  <Link href="/">
                    <h1 className="font-sora text-2xl font-bold">Nulky</h1>
                  </Link>

                  {user ? (
                    <div className="mt-8 flex items-center gap-4 cursor-pointer">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl font-bold text-white">
                        {user.name.charAt(0)}
                      </div>

                      <div>
                        <h3 className="font-semibold text-black">
                          {user.name}
                        </h3>

                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-8 flex flex-col gap-3">
                      <button
                        onClick={() => {
                          showNav(false);
                          router.push("/auth/login");
                        }}
                        className="rounded-xl cursor-pointer border border-gray-300 px-4 py-3 font-medium"
                      >
                        Login
                      </button>

                      <button
                        onClick={() => {
                          showNav(false);
                          router.push("/auth/signup");
                        }}
                        className="rounded-xl cursor-pointer bg-black px-4 py-3 font-medium text-white"
                      >
                        Create Account
                      </button>
                    </div>
                  )}
                </div>

                {/* Main Nav */}
                <div className="flex-1 overflow-y-auto px-6 py-8">
                  <ul className="space-y-2">
                    {user && (
                      <>
                        <li>
                          <button
                            onClick={() => {
                              showNav(false);
                              router.push("/dashboard");
                            }}
                            className="w-full flex gap-2 items-center rounded-xl px-4 py-3 text-left text-lg hover:bg-gray-100"
                          >
                            <GrDashboard size={20} />
                            Dashboard
                          </button>
                        </li>

                        <li>
                          <button
                            onClick={() => {
                              showNav(false);
                              router.push("/dashboard/history");
                            }}
                            className="w-full flex gap-2 items-center rounded-xl px-4 py-3 text-left text-lg hover:bg-gray-100"
                          >
                            <History size={20} />
                            Message History
                          </button>
                        </li>

                        <li>
                          <button
                            onClick={() => {
                              showNav(false);
                              router.push("/dashboard/profile");
                            }}
                            className="w-full flex gap-2 items-center rounded-xl px-4 py-3 text-left text-lg hover:bg-gray-100"
                          >
                            <CgProfile size={20} />
                            Manage Profile
                          </button>
                        </li>

                        <div className="my-6 border-t border-gray-200" />
                      </>
                    )}
                    {!user && (
                      <>
                        {navItems.map((item) => {
                          const isActive = pathname === item.link;

                          return (
                            <li key={item.text}>
                              <button
                                onClick={() => handleNavClick(item.link)}
                                className={`w-full rounded-xl px-4 py-3 text-left text-lg transition ${
                                  isActive
                                    ? "bg-black text-white"
                                    : "hover:bg-gray-100"
                                }`}
                              >
                                {item.text}
                              </button>
                            </li>
                          );
                        })}
                      </>
                    )}
                  </ul>
                </div>

                {/* Bottom Section */}
                {user && (
                  <div className="border-t border-gray-200 p-6">
                    <button
                      onClick={() => {
                        logout();
                        showNav(false);
                        router.push("/");
                      }}
                      className="w-full flex gap-2 items-center rounded-xl cursor-pointer bg-red-50 px-4 py-3 font-medium text-red-500"
                    >
                      <LogOut size={20} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Nav;
