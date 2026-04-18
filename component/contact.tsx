import React from "react";
import contactImg from "@/image/contact.png";
import Image from "next/image";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

const Contact = () => {
  return (
    <div className="bg-white text-[#0e1726]">
      <div className="w-full">
        <Image
          src={contactImg}
          alt="contact hero image"
          className="bg-cover no-repeat"
        />
      </div>

      <div>
        <div className="bg-[#fff6f3] py-10 px-12 md:px-16 flex flex-col gap-2">
          <p>
            For all support related issues or to reach our support team, please
            check out our Help Center.
          </p>
          <p>+234 703 641 0352 | support@nulky.com</p>
          <div className="flex gap-4 pt-4">
            <SiFacebook />
            <SiInstagram />
            <SiX />
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center py-10 px-12 md:px-16">
          <h2 className="font-bold text-black text-lg">
            You can send us a message below
          </h2>
          <form className="flex flex-col gap-4 w-full">
            <input
              type="text"
              placeholder="Your Name"
              className="border rounded-md w-full p-2 border-[#0e1726] text-[#0e1726] bg-none placeholder:text-[#4f4e4c]"
            />
            <input
              type="email"
              placeholder="Your Email Address"
              className="border rounded-md p-2 w-full border-[#0e1726] text-[#0e1726] bg-none placeholder:text-[#4f4e4c]"
            />
            <textarea
              placeholder="Your message"
              cols={5}
              className="border rounded-md p-2 w-full border-[#0e1726] text-[#0e1726] bg-none placeholder:text-[#4f4e4c]"
            />

            <button className="px-4 py-2  md:text-lg font-bold rounded-full bg-[#0e1726] text-white hover:bg-white hover:text-[#0e1726] w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
