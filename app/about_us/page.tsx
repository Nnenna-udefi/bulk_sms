"use client";
import React from "react";
import AboutImg from "@/image/bulk-about.png";
import Image from "next/image";

const About = () => {
  return (
    <div className="bg-[#fff6f3] text-[#0e1726] px-12 md:px-24 py-16 md:py-24 flex flex-col-reverse md:flex-col gap-6 justify-between">
      <div className="flex flex-col gap-2 py-4">
        <p>
          We believe communication should be simple, fast, and dependable. Our
          platform was built to help businesses connect with their audience
          without barriers, whether it's sending alerts, promotions, reminders,
          or critical updates.
        </p>
        <p>
          We combine powerful technology with a user-friendly experience, giving
          you full control over your messaging while ensuring high delivery
          rates and real-time performance.{" "}
        </p>
        <p>
          From small businesses to large organizations, we are committed to
          helping you stay connected to what matters most—your people.
        </p>
      </div>
      <div className="rounded-2xl">
        <Image src={AboutImg} alt="about us image" />
      </div>
    </div>
  );
};

export default About;
