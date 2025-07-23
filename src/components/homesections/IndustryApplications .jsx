import React from "react";
import {
  Building2,
  Heart,
  ShoppingCart,
  Factory,
  Banknote,
  GraduationCap,
  Truck,
  Shield,
} from "lucide-react";

const CompactIndustryApplications = () => {
  const industries = [
    {
      icon: <Heart className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Healthcare",
      applications: ["Patient Management", "Telemedicine"],
    },
    {
      icon: <Banknote className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Finance",
      applications: ["Risk Management", "Digital Banking"],
    },
    {
      icon: <Factory className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Manufacturing",
      applications: ["Quality Control", "Automation"],
    },
    {
      icon: <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Retail",
      applications: ["Inventory", "Personalization"],
    },
  ];

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
          {/* Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Driving Performance Across Industries
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-6">
              At SRO Bharat, we deliver precision-bearing solutions and allied
              products to meet the demanding needs of multiple industries. Our
              products are engineered for durability, efficiency, and
              performance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-green-100 rounded-md mr-3">
                      {industry.icon}
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                      {industry.title}
                    </h3>
                  </div>
                  <ul className="text-sm sm:text-base text-gray-600 pl-11">
                    {industry.applications.map((app, i) => (
                      <li key={i} className="mb-1 last:mb-0">
                        • {app}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2">
            <img
              src="https://media.istockphoto.com/id/177025972/photo/close-up-snapshot-of-small-gears-from-an-automobile-engine.jpg?s=612x612&w=0&k=20&c=PT5H4E8F_oaDOkxOI1Abi4auEwbX97HCOHoEdgYzY0I="
              alt="Precision engineering for multiple industries"
              className="rounded-xl shadow-md w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompactIndustryApplications;
