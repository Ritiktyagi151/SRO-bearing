// components/AboutSection.jsx
import Link from "next/link";
import React from "react";

const AboutSection = () => {
  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 md:flex md:items-center md:gap-12">
        {/* Image */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1718824331840-399943ff5c1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hY2hpbmV8ZW58MHx8MHx8fDA%3D"
            alt="Team Member"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* Text content */}
        <div className="md:w-1/2">
          <p className="text-gray-500 text-sm mb-2">Get to Know Us</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            People think we’re just a <br className="hidden md:block" />
            bearing company
          </h2>
          <p className="text-gray-700 mb-6 max-w-xl">
            We’re often seen as just a bearing manufacturer. But SRO Bearings is
            powered by a team of passionate individuals across engineering,
            manufacturing, customer service, and innovation. Get to know our
            team and discover why SRO is a great place to work and grow.
          </p>
          <Link
            href="/"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-md transition"
          >
            Why work at SRO Bearings
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
