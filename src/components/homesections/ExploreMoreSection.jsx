import React from "react";
import Link from "next/link";
const exploreItems = [
  {
    title: "Industry",
    description:
      "Explore how SRO bearings power critical operations across industries like automotive, manufacturing, and energy with precision and reliability.",
    image:
      "https://images.unsplash.com/photo-1542274368-443d694d79aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kdXN0cnl8ZW58MHx8MHx8fDA%3D",
    linkText: "Explore our industry solutions",
    href: "/industries",
  },
  {
    title: "Services",
    description:
      "We offer expert support and tailored bearing services to maximize equipment uptime and extend product life. Discover what we can do for you.",
    image:
      "https://plus.unsplash.com/premium_photo-1683120929511-af05758ec1e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fFNlcnZpY2VzfGVufDB8fDB8fHww",
    linkText: "Explore our services",
    href: "/services",
  },
  {
    title: "Contact",
    description:
      "Need help or have a question? Our experts are here to assist you with inquiries, support, and tailored solutions for your business.",
    image:
      "https://images.unsplash.com/photo-1703669020883-66f3e77ae929?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGNvbnRhY3R8ZW58MHx8MHx8fDA%3D",
    linkText: "Get in touch with us",
    href: "/contact",
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
