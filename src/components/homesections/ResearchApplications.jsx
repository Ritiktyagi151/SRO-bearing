// components/CoInnovationSection.jsx
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const CoInnovationSection = () => {
  // Re-usable animation variants
  const slideInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    // Add overflow-hidden to the parent section
    <section className="bg-gray-100 min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:flex md:items-center md:gap-20">
        {/* Text content - Animated */}
        <motion.div
          className="md:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          variants={slideInFromLeft}
        >
          <p className="text-[#00974A] text-sm mb-2">
            Research and technology development
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#00974A] mb-6 leading-tight">
            Co-innovation creates <br className="hidden md:block" /> tomorrow’s
            technologies
          </h2>
          <p className="text-gray-700 mb-6 max-w-[36rem]">
            Roughly 20% of global energy goes to overcoming friction. Through
            collaboration and knowledge sharing, the industry has a real
            possibility to pull that number down. Let’s join forces in the fight
            against friction.
          </p>
          <Link
            href="/research"
            className="inline-block bg-[#00974A] hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition"
          >
            Learn more
          </Link>
        </motion.div>

        {/* Image - Animated */}
        <motion.div
          className="md:w-1/2 mb-10 md:mb-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          variants={slideInFromRight}
        >
          <img
            src="/image/about/Indian-lady-sro.jpg"
            alt="Bearing Technology"
            className="rounded-lg shadow-lg w-full h-[80vh] object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CoInnovationSection;
