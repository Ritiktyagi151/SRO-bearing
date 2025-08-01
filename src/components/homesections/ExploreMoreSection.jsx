import React from "react";
import Link from "next/link";

const exploreItems = [
  {
    title: "Sustainability",
    description:
      "Sustainability is an integral part of our business. By setting ambitious goals of our own, we aspire to enable the future of a sustainable supply chain.",
    image: "https://source.unsplash.com/600x400/?nature,road",
    linkText: "Explore our sustainability efforts",
    href: "/sustainability",
  },
  {
    title: "Career",
    description:
      "Our company is home to people within many different fields of expertise, located around the world. Are you also looking for an impactful career?",
    image: "https://source.unsplash.com/600x400/?employee,working",
    linkText: "Explore our job opportunities",
    href: "/careers",
  },
  {
    title: "Stories",
    description:
      "From innovations in bearing technology to our impact on critical industries — discover how SRO is shaping the future with precision engineering.",
    image: "https://source.unsplash.com/600x400/?industry,engineering",
    linkText: "Explore the SRO success stories",
    href: "/stories",
  },
];

const ExploreMoreSection = () => {
  return (
    <section className="bg-gray-100 py-20 px-6 md:px-16 text-gray-600">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl font-bold   mb-4">Explore more</h2>
        <p className="text-gray-600">
          Find out more about our commitment to industrial sustainability, the
          opportunities at SRO around the world and our stories in the selected
          sections below.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {exploreItems.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-md overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <Link
                href={item.href}
                className="text-gray-700 font-medium hover:underline flex items-center gap-1"
              >
                <span className="text-lg">→</span>
                {item.linkText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreMoreSection;
