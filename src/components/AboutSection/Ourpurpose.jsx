import React from "react";
import Image from "next/image";

const PurposeSection = () => {
  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden h-[100vh] w-full">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=1800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b2ZmaWNlJTIwcGVvcGxlfGVufDB8fDB8fHww"
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
          <h2 className="text-3xl md:text-4xl font-bold">Our purpose</h2>

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

          <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition duration-300">
            Explore what drives us
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurposeSection;
