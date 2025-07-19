import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const [visibleItems, setVisibleItems] = useState(2);
  const sliderRef = useRef(null);

  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(1);
      } else {
        setVisibleItems(2);
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  const navigateToProduct = (link) => {
    window.location.href = link;
  };

  const goToNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + visibleItems) % bearingProducts.length);
  };

  const goToPrev = () => {
    setDirection("left");
    setCurrentIndex(
      (prev) =>
        (prev - visibleItems + bearingProducts.length) % bearingProducts.length
    );
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction) => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  const getCurrentProducts = () => {
    const products = [];
    for (let i = 0; i < visibleItems; i++) {
      const index = (currentIndex + i) % bearingProducts.length;
      products.push(bearingProducts[index]);
    }
    return products;
  };

  const ProductCard = ({ product }) => (
    <div
      className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl w-full h-full min-h-[450px] max-h-[550px] md:min-h-[500px] md:max-h-[600px] cursor-pointer overflow-hidden group transition-all duration-300 flex flex-col mx-auto"
      onClick={() => navigateToProduct(product.link)}
    >
      <div className="w-full h-40 sm:h-48 md:h-56 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-green-800/10"></div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>

        <div className="absolute top-3 left-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-2 py-1 rounded-full text-[10px] xs:text-xs font-semibold shadow-md">
          {product.id.split("-").join(" ").toUpperCase()}
        </div>

        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-green-700 px-2 py-1 rounded-full text-[10px] xs:text-xs font-medium shadow-sm">
          Premium Grade
        </div>
      </div>

      <div className="w-full p-4 sm:p-5 md:p-6 flex flex-col flex-grow bg-gradient-to-br from-white to-gray-50">
        <h3 className="text-lg sm:text-lg md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 leading-tight">
          {product.name}
        </h3>

        <p className="text-gray-600 text-lg sm:text-base mb-3 sm:mb-4 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto pt-3 sm:pt-4">
          <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-gray-50 rounded-lg md:rounded-xl border border-gray-200 text-xs sm:text-lg">
            <h4 className="font-bold text-gray-800 mb-1 sm:mb-2 flex items-center">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-2 sm:mr-3"></div>
              Applications
            </h4>
            <p className="text-gray-600">{product.applications}</p>
          </div>

          <button
            className="w-full py-2 px-1 sm:px-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg md:rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 text-xs sm:text-lg"
            onClick={(e) => {
              e.stopPropagation();
              navigateToProduct(product.link);
            }}
          >
            View Detailed Specifications
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-10 md:py-12 px-4 sm:px-6">
      <div className="relative w-full max-w-7xl mx-auto" ref={sliderRef}>
        <div className="text-center mb-6 sm:mb-8 px-2">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            Premium Bearing Solutions
          </h1>
          <p className="text-lg xs:text-base sm:text-lg md:text-lg text-gray-600 max-w-2xl mx-auto mb-4 sm:mb-6">
            Discover our comprehensive range of high-quality bearings engineered
            for industrial excellence
          </p>
        </div>

        <div className="relative w-full h-auto min-h-[450px] sm:min-h-[500px] md:min-h-[550px] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 md:p-6"
            >
              <div
                className={`grid ${
                  visibleItems === 1
                    ? "grid-cols-1"
                    : "grid-cols-1 md:grid-cols-2"
                } gap-3 sm:gap-4 md:gap-6 w-full max-w-6xl mx-auto`}
              >
                {getCurrentProducts().map((product, index) => (
                  <div
                    key={`${product.id}-${index}`}
                    className="w-full h-full px-1 sm:px-2"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        {bearingProducts.length > visibleItems && (
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 sm:px-3 md:px-4">
            <button
              onClick={goToPrev}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/95 backdrop-blur-sm shadow-md sm:shadow-lg flex items-center justify-center text-gray-700 hover:text-green-600 hover:bg-white transition-all duration-300 pointer-events-auto group border border-gray-200"
              aria-label="Previous products"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/95 backdrop-blur-sm shadow-md sm:shadow-lg flex items-center justify-center text-gray-700 hover:text-green-600 hover:bg-white transition-all duration-300 pointer-events-auto group border border-gray-200"
              aria-label="Next products"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Product Counter */}
        <div className="flex justify-center mt-4 sm:mt-5 md:mt-6">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow-sm sm:shadow-md border border-gray-200">
            <span className="text-xs sm:text-lg text-gray-600">
              <span className="font-semibold text-green-600">
                {currentIndex + 1}-
                {Math.min(currentIndex + visibleItems, bearingProducts.length)}
              </span>
              <span className="mx-1">of</span>
              <span className="font-semibold text-gray-800">
                {bearingProducts.length}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
