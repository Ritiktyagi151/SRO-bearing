import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const bearingProducts = [
  {
    id: "spherical-roller",
    name: "Spherical Roller Bearings",
    description:
      "Self-aligning bearings that accommodate heavy radial and axial loads in applications with misalignment",
    features: [
      "±2.5° self-alignment capability",
      "High load capacity design",
      "Extended service life",
      "Robust construction",
    ],
    applications: "Mining equipment, paper mills, gearboxes",
    image: "/image/product-slider-img/shperical-newone.png",
    link: "/products/spherical-roller-bearings",
  },
  {
    id: "taper-roller",
    name: "Taper Roller Bearings",
    description:
      "Precision bearings designed to handle combined radial and thrust loads in various configurations",
    features: [
      "Optimized load distribution",
      "Single, double, and four-row designs",
      "Precision ground surfaces",
      "Interchangeable components",
    ],
    applications: "Automotive wheels, heavy machinery, axles",
    image:
      "https://t3.ftcdn.net/jpg/14/85/56/42/240_F_1485564273_CGlyVvIj9lZwjMuBaM0zSSgLl7ePYNjF.jpg",
    link: "/products/taper-roller-bearings",
  },
  {
    id: "thrust",
    name: "Thrust Bearings",
    description:
      "Specialized bearings designed exclusively for axial load applications in various configurations",
    features: [
      "Ball or roller designs available",
      "High axial stiffness",
      "Low friction operation",
      "Precision alignment",
    ],
    applications: "Gearboxes, turbines, crane hooks",
    image:
      "https://t3.ftcdn.net/jpg/13/98/64/88/240_F_1398648863_FeFguQFsVwSbpD0p9ArojKMILj4zOCtC.jpg",
    link: "/products/thrust-bearings",
  },
  {
    id: "multi-row",
    name: "Multi Row Bearings",
    description:
      "High-capacity bearings featuring multiple rows of rollers for extreme load conditions",
    features: [
      "2, 3, or 4 row configurations",
      "Compact design",
      "High radial load capacity",
      "Precision alignment",
    ],
    applications: "Rolling mills, large gearboxes",
    image:
      "https://www.krw.de/fileadmin/_processed_/0/f/csm_Mehrreihig_Kerola_201910_5f327d1bda.png",
    link: "/products/multi-row-bearings",
  },
  {
    id: "pillow-block",
    name: "Pillow Block Bearing",
    description:
      "Mounted bearing units with housings for easy installation and maintenance",
    features: [
      "Various sealing options",
      "Cast iron or steel housings",
      "Self-locking seals",
      "Adapter sleeve mounting",
    ],
    applications: "Conveyors, fans, agricultural equipment",
    image: "/image/product-slider-img/pillow-block-bearing.png",
    link: "/products/pillow-block-bearing",
  },
  {
    id: "plummer-blocks",
    name: "Plummer Blocks",
    description:
      "Heavy-duty bearing housings designed for industrial applications",
    features: [
      "Split housing design",
      "High load capacity",
      "Easy maintenance",
      "Various sealing options",
    ],
    applications: "Large fans, pumps, marine equipment",
    image: "/image/product-slider-img/Plummer-Blocks.png",
    link: "/products/plummer-blocks",
  },
  {
    id: "roller-chains",
    name: "Roller Chains",
    description:
      "High-strength power transmission chains for industrial applications",
    features: [
      "Heat-treated components",
      "Precision roller bushings",
      "Corrosion-resistant options",
      "Multiple pitch sizes",
    ],
    applications: "Conveyors, industrial machinery, motorcycles",
    image: "/image/product-slider-img/Roller-Chains.png",
    link: "/products/roller-chains",
  },
];

export default function BearingGrid() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [visibleItems, setVisibleItems] = useState(3);
  const sliderRef = useRef(null);
  const autoSlideInterval = useRef(null);

  // Handle responsive visible items
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else if (window.innerWidth < 1280) {
        setVisibleItems(3);
      } else {
        setVisibleItems(4); // Show 4 items on large screens
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto slide functionality
  useEffect(() => {
    if (!isHovering) {
      autoSlideInterval.current = setInterval(() => {
        setCurrentIndex(
          (prev) => (prev + 1) % (bearingProducts.length - visibleItems + 1)
        );
      }, 3000);
    } else {
      clearInterval(autoSlideInterval.current);
    }

    return () => clearInterval(autoSlideInterval.current);
  }, [isHovering, visibleItems]);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, bearingProducts.length - visibleItems)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section
      className="max-w-8xl mx-auto px-4 py-8 relative overflow-hidden bg-gray-100"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      ref={sliderRef}
    >
      <div className="relative">
        {/* Slider container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
          }}
        >
          {bearingProducts.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 px-4"
              style={{ width: `${100 / visibleItems}%` }}
            >
              <div className="flex flex-col items-center text-gray-700 h-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-64 w-64 mb-2 object-cover"
                  loading="lazy"
                />
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                  {product.name}
                </h3>
                <p className="text-sm mb-4 px-2">{product.description}</p>
                <a
                  href={product.link}
                  className="flex items-center text-[#00974A] font-medium hover:underline mt-auto"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Explore products
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        {isHovering && (
          <>
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 bg-gray-500 p-2 rounded-full shadow-md hover:bg-gray-600 transition ${
                currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ChevronLeft className="h-6 w-6 text-gray-200" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= bearingProducts.length - visibleItems}
              className={`absolute right-0 top-1/2 -translate-y-1/2 bg-gray-500 p-2 rounded-full shadow-md hover:bg-gray-600 transition ${
                currentIndex >= bearingProducts.length - visibleItems
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <ChevronRight className="h-6 w-6 text-gray-200" />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
