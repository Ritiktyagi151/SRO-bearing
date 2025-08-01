import React from "react";
import Link from "next/link";

const CoInnovationSection = () => {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 px-6 md:px-16 py-16">
      {/* Left Text Content */}
      <div className="md:w-1/2 max-w-xl mb-10 md:mb-0">
        <p className="text-gray-600 mb-2 text-sm">
          Research and technology development
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold text-black leading-tight mb-6">
          Co-innovation creates <br /> tomorrow’s technologies
        </h2>
        <p className="text-gray-700 text-base mb-6">
          Roughly 20% of global energy goes to overcoming friction. Through
          collaboration and knowledge sharing, the industry has a real
          possibility to pull that number down. Let’s join forces in the fight
          against friction.
        </p>

        {/* ✅ Correct usage of Link */}
        <Link
          href="/research"
          className="inline-block bg-gray-700 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition"
        >
          Learn more
        </Link>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2">
        <img
          src="https://t4.ftcdn.net/jpg/09/59/42/25/240_F_959422571_1J11pfbb7eBuPgqSg61TOaSgk1ZwmOhb.jpg"
          alt="Bearing Technology"
          className="rounded-lg object-cover w-full h-auto shadow-md"
        />
      </div>
    </section>
  );
};

export default CoInnovationSection;
