import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Settings, Zap, ArrowRight, Activity, Cpu, Layers } from "lucide-react";
import ExploreMoreSection from "@/components/homesections/ExploreMoreSection";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Research() {
  const researchPillars = [
    {
      icon: Layers,
      title: "Advanced Materials & Metallurgy",
      desc: "Developing high-purity carbon chromium steels and ceramic silicon nitride hybrids to withstand critical structural stress and prevent fatigue micro-fractures.",
    },
    {
      icon: Zap,
      title: "Surface Engineering & Tribology",
      desc: "Optimizing micro-textures and nano-coatings to support low-viscosity greases, reducing rolling resistance and frictional coefficients by up to 20%.",
    },
    {
      icon: Cpu,
      title: "Smart Telemetry & Predictive AI",
      desc: "Integrating embedded smart sensors to track temperature spikes, radial load vibrations, and acoustic harmonics for zero-downtime maintenance.",
    },
  ];

  return (
    <>
      <Head>
        <title>Research & Co-Innovation | SRO Bearings</title>
      </Head>

      <div className="bg-gray-50 min-h-screen font-sans overflow-hidden">
        {/* HERO SECTION */}
        <div className="relative bg-gradient-to-br from-green-950 via-[#03301a] to-slate-950 text-white py-24 md:py-32 px-6 md:px-16 flex items-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10 text-center md:text-left space-y-6">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-green-950 border border-green-500/30 text-green-400 text-xs px-3.5 py-1.5 rounded-full font-semibold uppercase tracking-wider"
            >
              Technology & Research
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
            >
              Co-innovation creates <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                tomorrow’s technologies
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-300 leading-relaxed max-w-2xl"
            >
              Roughly 20% of global industrial energy goes to overcoming friction. Through material innovation and predictive telemetry, SRO is dedicated to fighting friction and driving mechanical efficiency.
            </motion.p>
          </div>
        </div>

        {/* METRICS / STATS SECTION */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 -mt-10 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { val: "20%", label: "Reduction in Mechanical Friction" },
              { val: "99.2%", label: "Precision Operational Uptime" },
              { val: "2.4x", label: "Extended Fatigue Life Expectancy" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 + 0.3 }}
                className="bg-white border border-gray-200 p-8 rounded-2xl shadow-md flex items-center justify-between"
              >
                <div className="space-y-1">
                  <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <p className="text-4xl font-extrabold text-green-700">
                    {stat.val}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                  <Activity className="w-6 h-6" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* PILLARS OF DEVELOPMENT */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Core Research Pillars
            </h2>
            <p className="text-gray-600">
              At SRO Bearings, our technical analysts design future-proof bearings by combining core mechanical research with advanced digital integrations.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {researchPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white border border-gray-200 hover:border-green-300 rounded-2xl p-8 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6">
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* PARTNERSHIP BANNER */}
        <div className="bg-white border-t border-b border-gray-200 py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Partner With SRO Co-Innovation Teams
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Are you developing wind turbines, aerospace powertrains, or electric vehicle gearboxes? Join forces with our research division to configure optimized low-torque bearings.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 py-3 px-8 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-sm shadow transition-all duration-300 hover:scale-105"
              >
                Contact Research Division
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* FOOTER SECTION EXPLORE */}
        <ExploreMoreSection />
      </div>
    </>
  );
}
