import React from "react";

const SustainabilitySection = () => {
  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Text Content - Left Side */}
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-green-500 mb-6">
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

        {/* Video - Right Side */}
        <div className="md:w-1/2">
          <div className="relative h-80 w-full rounded-lg overflow-hidden">
            <video
              src="https://cdn.pixabay.com/video/2023/06/11/166822-835638759_large.mp4" // replace with your video link
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilitySection;
