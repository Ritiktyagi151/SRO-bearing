import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    image:
      "https://t4.ftcdn.net/jpg/02/45/90/93/240_F_245909308_iHuv1XDuOMwTEilzf4xDN4Pth2mm1TrZ.jpg",
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
    image:
      "https://t4.ftcdn.net/jpg/14/66/64/83/240_F_1466648372_V5UrfA04n979R7fMouYgzbEGPGn4X4yc.jpg",
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
    image:
      "https://t3.ftcdn.net/jpg/00/47/22/66/240_F_47226630_KBdThTIFWAM5elV9gqxPx0z2HWfySxKd.jpg",
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
    image:
      "https://t3.ftcdn.net/jpg/01/92/10/30/240_F_192103089_xYWwLjM8OK3wgnyBj1whxGx8kPzBfhnT.jpg",
    link: "/products/roller-chains",
  },
];

export default function ProductSlider() {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const cardWidth = 320;
  const cardGap = 24;

  // Calculate number of cards based on container width
  useEffect(() => {
    const updateVisibleCards = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newVisibleCards = Math.max(
          1,
          Math.floor(containerWidth / (cardWidth + cardGap))
        );
        setVisibleCards(Math.min(newVisibleCards, bearingProducts.length));
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const totalGroups = Math.ceil(bearingProducts.length / visibleCards);

  const scrollTo = (index) => {
    if (sliderRef.current) {
      const scrollAmount = index * (cardWidth + cardGap) * visibleCards;
      sliderRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const scroll = (direction) => {
    const newIndex =
      direction === "left"
        ? (currentIndex - 1 + totalGroups) % totalGroups
        : (currentIndex + 1) % totalGroups;
    scrollTo(newIndex);
  };

  // Auto-scroll effect
  useEffect(() => {
    if (totalGroups <= 1) return; // Don't auto-scroll if all cards fit

    const interval = setInterval(() => {
      if (!isHovering) {
        scroll("right");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isHovering, totalGroups]);

  return (
    <div
      ref={containerRef}
      className="relative py-12 px-4 max-w-7xl mx-auto"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-600">
        Our Bearing Products
      </h2>

      {/* Navigation Arrows */}
      {totalGroups > 1 && (
        <>
          <button
            onClick={() => scroll("left")}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gray-100 p-3 rounded-full shadow-md hover:bg-gray-400 transition-all ${
              isHovering ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
            aria-label="Previous products"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gray-100 p-3 rounded-full shadow-md hover:bg-gray-400 transition-all ${
              isHovering ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
            aria-label="Next products"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </>
      )}

      {/* Products Slider */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
      >
        {bearingProducts.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[300px] md:w-[320px] bg-gray-100 rounded-xl border border-gray-300 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 snap-start"
          >
            <div className="h-48 w-full flex items-center justify-center mb-5">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-600">
              {product.name}
            </h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <ul className="text-sm list-disc list-inside mb-4 space-y-1 text-gray-700">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 italic mb-5">
              <span className="font-medium">Applications:</span>{" "}
              {product.applications}
            </p>
            <a
              href={product.link}
              className="inline-block px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              View Details
            </a>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      {totalGroups > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalGroups }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index
                  ? "bg-blue-600 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
