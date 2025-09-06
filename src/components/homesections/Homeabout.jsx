import { motion } from "framer-motion";
import { useState } from "react";

const AboutSnapshot = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const navigateToProducts = () => {
    // In a real Next.js app, you would use router.push("/products")
    // For demo purposes, we'll use window.location or handle differently
    window.location.href = "/products";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          {/* Left side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="md:w-1/2 space-y-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold text-green-600 leading-tight"
            >
              Experience. Quality. Trust.
            </motion.h2>

            <motion.h3
              variants={itemVariants}
              className="text-lg font-semibold text-gray-600"
            >
              40+ Years of Bearing Excellence at SRO Bharat
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-lg leading-relaxed"
            >
              Since 19**, SRO Bharat has delivered precision-engineered bearing
              solutions to power industries across the globe — from Steel Plants
              and Cement to Automotive, Mining, Sugar, and more.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-lg leading-relaxed"
            >
              Alongside our wide bearing range, we provide essential industrial
              products including Bearing Sleeves, Housings, Roller Chains,
              Tools, Maintenance Kits, Lubricants, and Condition Monitoring
              Equipment — all with unmatched quality and competitive pricing.
            </motion.p>

            <motion.div variants={itemVariants} className="pt-4">
              <motion.button
                onClick={navigateToProducts}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label="Navigate to products page"
              >
                View Product Range
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right side - Animated Image */}
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.02, rotateY: -2 }}
              className="relative h-96 w-full rounded-xl overflow-hidden shadow-2xl border-4 border-white"
              style={{ perspective: "1000px" }}
            >
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r  animate-pulse" />
              )}

              <motion.img
                src="https://media3.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dXIxM3owYWh2eXNpMWVkeGlwOGNmNHhtNTZxYjZmOHhraW5yN2gzbyZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/llxkS0wUmLOMuPHRqy/giphy.webp"
                alt="High precision industrial bearing equipment"
                className="w-full h-full object-cover transition-transform duration-700"
                onLoad={() => setImageLoaded(true)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-gray-800/10" />

              {/* Subtle animated border */}
              <motion.div
                className="absolute inset-0 border-2 border-green-400/30 rounded-xl"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(34, 197, 94, 0.1)",
                    "0 0 30px rgba(34, 197, 94, 0.2)",
                    "0 0 20px rgba(34, 197, 94, 0.1)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSnapshot;
