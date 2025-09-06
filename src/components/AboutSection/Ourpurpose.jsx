import React from "react";
import Image from "next/image";

const PurposeSection = () => {
  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden h-[100vh] w-full">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://media.istockphoto.com/id/1283024969/photo/female-civil-engineer.jpg?s=612x612&w=0&k=20&c=HvvX9yxEoXKa93Tp5tAZHa2ec4C_saqNjptDQt6FdVQ="
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-200/60" />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12 h-full">
        {/* Text Content - Left Side */}
        <div className="md:w-1/2 space-y-6 text-white">
          <h2 className="text-3xl md:text-4xl font-bold  text-green-500">
            Our purpose
          </h2>

          <div className="space-y-4">
            <p className="text-2xl md:text-3xl font-medium leading-tight">
              Our purpose guides our
            </p>
            <p className="text-2xl md:text-3xl font-medium leading-tight">
              everyday actions and
            </p>
            <p className="text-2xl md:text-3xl font-medium leading-tight">
              decisions
            </p>
          </div>

          <button className="mt-8 bg-green-400 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-md transition duration-300">
            Explore what drives us
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurposeSection;
