import { DotSquare } from "lucide-react";
import React from "react";
import { features, started } from "./helper/constant";

const Home = () => {
  return (
    <div className="">
      {/* Hero section */}
      <section className="h-screen bg-[url('../image/hero.png')] px-6 md:px-16 py-6 md:py-16 text-white">
        <div className="flex flex-col gap-4 md:gap-6  py-6 md:py-16 w-full md:w-[60%] text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold ">
            Send Messages That Reach
          </h1>

          <p className="text-xl md:text-2xl">
            Power your business communication with fast, secure, and affordable
            bulk SMS. Reach thousands of customers in seconds with no delays &
            no complexity.
          </p>
          <div className="flex gap-4  mt-10 justify-center md:justify-start">
            <button className="px-4 md:px-6 py-2 md:py-4 md:text-lg font-bold rounded-full bg-[#6495ED] text-white hover:bg-white hover:text-[#6495ED] w-fit">
              Get Started
            </button>
            <button className="px-4 md:px-6 py-2 md:py-4 md:text-lg font-bold rounded-full text-white hover:bg-[#6495ED] bg-none hover:border-none border border-white w-fit">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#fafafa] border-y border-gray-200 block py-10 px-12 md:px-24  md:flex justify-between">
        <div className="text-xl md:text-2xl flex gap-4 items-center">
          <p>Instantly</p>
          <DotSquare />
          <p> Reliably</p>
          <DotSquare />
          <p>At Scale</p>
        </div>
        <button className="px-4 py-2  md:text-lg font-bold rounded-md bg-[#0e1726] text-white hover:bg-white hover:border hover:text-[#6495ED] w-fit">
          Sign Up Here
        </button>
      </section>

      <section className="py-10 bg-[#fff6f3] px-12 md:px-24 text-[#0e1726]">
        <div className="flex flex-col items-center">
          <h2 className="text-xs font-medium uppercase text-[#4f4e4c] ">
            Features
          </h2>
          <p className="text-xl md:text-2xl text-center font-bold pt-3">
            Everything You Need to Send Smarter SMS
          </p>
        </div>
        <div className="py-10 md:py-18">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {features.map((feature) => (
              <div key={feature.id} className="flex gap-4 py-6 ">
                <div className="bg-[#0e1726] rounded-md p-4 text-white h-fit">
                  <feature.icon />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-base md:text-xl">
                    {feature.title}
                  </h3>
                  <p className="w-full md:w-[70%]">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-[#fff6f3] px-12 md:px-24 text-[#0e1726]">
        <div className="flex flex-col items-center">
          <h3 className="text-xl md:text-2xl text-center font-bold pt-3">
            Getting Started
          </h3>
        </div>
        <div className="py-10 md:py-18">
          <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6 md:gap-10">
            {started.map((steps) => (
              <div
                key={steps.id}
                className="flex gap-4 py-6 bg-white px-6 rounded-2xl"
              >
                <div className="flex flex-col gap-3 md:gap-6">
                  <div className="border border-gray-200 rounded-md p-4 w-fit">
                    <steps.icon />
                  </div>
                  <h3 className="font-medium text-base md:text-xl">
                    {steps.step}
                  </h3>
                  <p className="w-full md:w-[70%]">{steps.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
