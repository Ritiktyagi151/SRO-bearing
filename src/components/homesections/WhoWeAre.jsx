import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function WhatWeDoSection() {
  const categories = [
    {
      title: "Products",
      description:
        "Bearings, seals, lubrication systems and surrounding equipment for enhanced reliability and performance.",
      link: "View products",
    },
    {
      title: "Services",
      description:
        "Engineering, maintenance, condition monitoring, and remanufacturing for full life cycle management.",
      link: "View services",
    },
    {
      title: "Industries",
      description:
        "Industry-specific solutions tailored to the needs and challenges of your sector.",
      link: "View industries",
    },
  ];

  return (
    <section className="bg-gray-100 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-500 mb-4">
            What we do
          </h2>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group bg-gray-100 rounded-xl p-8 hover:bg-gray-300 transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-gray-600"
            >
              <h3 className="text-2xl font-bold text-green-500 mb-4">
                {category.title}
              </h3>
              <p className="text-gray-600 mb-6">{category.description}</p>
              <Link
                href="/"
                className="inline-flex items-center text-green-600 font-medium hover:text-green-700 group-hover:underline"
              >
                {category.link}
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
