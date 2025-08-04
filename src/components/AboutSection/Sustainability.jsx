import React from "react";
import Image from "next/image";

const SustainabilitySection = () => {
  return (
    <div className="bg-gray-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Text Content - Left Side */}
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Stratainability
          </h1>

          <p className="text-2xl font-semibold text-gray-800 mb-8">
            We make sustainable movement possible
          </p>

          <p className="text-lg text-gray-600 mb-10">
            Wherever there is movement, our products, solutions, and expertise
            can help optimize it. Ultimately contributing to a more sustainable
            society where we can all do more with less.
          </p>

          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-md transition duration-300">
            Explore sustainability
          </button>
        </div>

        {/* Image - Right Side */}
        <div className="md:w-1/2">
          <div className="relative h-80 w-full rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1675116731363-c17d957f3444?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHN1c3RhaW5hYmxlfGVufDB8fDB8fHww" // Replace with your image path
              alt="Sustainable movement"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilitySection;
