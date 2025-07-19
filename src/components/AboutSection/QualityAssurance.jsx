import { motion } from "framer-motion";
import {
  CheckCircle,
  Layers,
  Settings,
  BarChart2,
  Monitor,
  Shield,
} from "lucide-react";

export default function QualityAssurance() {
  const features = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Rigorous Testing",
      description:
        "Every product undergoes multiple testing phases to ensure flawless performance.",
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Multi-Layer Validation",
      description:
        "We validate at every stage - from concept to final delivery.",
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Process Excellence",
      description:
        "Certified processes that meet international quality standards.",
    },
    {
      icon: <BarChart2 className="w-8 h-8" />,
      title: "Continuous Monitoring",
      description: "Real-time quality metrics and performance tracking.",
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Automated Checks",
      description:
        "Automated testing pipelines catch issues before human review.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security Focus",
      description: "Quality includes robust security at every level.",
    },
  ];

  const stats = [
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "24/7", label: "Monitoring" },
    { value: "100+", label: "Quality Checks" },
    { value: "0", label: "Critical Bugs" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const floatingAnimation = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 2, 0, -2, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-green-100 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-200 rounded-full opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-block px-4 py-2 text-lg font-semibold text-green-700 bg-green-100 rounded-full mb-6 shadow-sm cursor-pointer"
          >
            Quality Assurance
          </motion.span>

          <motion.h2
            className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Commitment to
            <motion.span
              className="text-green-600 block"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Excellence
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            We don't just meet standards - we redefine them through meticulous
            quality processes and unwavering dedication.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -15,
                scale: 1.03,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
              className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-green-300 transition-all duration-500 shadow-sm group relative overflow-hidden"
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ scale: 0, rotate: 45 }}
                whileHover={{ scale: 1.5, rotate: 0 }}
                transition={{ duration: 0.5 }}
              />

              <div className="relative z-10">
                <motion.div
                  className="flex justify-center text-green-600 mb-6 group-hover:text-green-700 transition-colors duration-300"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="p-3 bg-green-50 rounded-full"
                    {...pulseAnimation}
                  >
                    {feature.icon}
                  </motion.div>
                </motion.div>

                <motion.h3
                  className="text-lg font-semibold text-center text-gray-900 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {feature.title}
                </motion.h3>

                <motion.p
                  className="text-gray-600 text-center leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  viewport={{ once: true }}
                >
                  {feature.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Process Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-green-50 via-gray-50 to-green-50 p-10 rounded-3xl border border-green-100 shadow-sm relative overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-green-300 rounded-full opacity-30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-20, 20],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <motion.h3
              className="text-3xl font-bold text-center text-gray-600 mb-12 relative z-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our Quality Assurance Process
            </motion.h3>

            {/* Process Steps Container */}
            <div className="relative z-10">
              {/* Animated bearing/gear background */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-96 h-96 rounded-full border-4 border-green-200 border-dashed opacity-20">
                  <div className="relative w-full h-full">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-4 h-4 bg-green-300 rounded-full opacity-40"
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: `translate(-50%, -50%) rotate(${
                            i * 45
                          }deg) translateY(-180px)`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Inner rotating bearing */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-64 h-64 rounded-full border-2 border-gray-800 border-dotted opacity-30">
                  <div className="relative w-full h-full">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-gray-900 rounded-full opacity-50"
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: `translate(-50%, -50%) rotate(${
                            i * 60
                          }deg) translateY(-120px)`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Process Steps */}
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-8 sm:space-y-0 relative z-20">
                {[
                  "Planning",
                  "Development",
                  "Testing",
                  "Review",
                  "Deployment",
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.2,
                      duration: 0.8,
                      type: "spring",
                      stiffness: 100,
                    }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center relative"
                    {...floatingAnimation}
                  >
                    {/* Micro bearing around each step */}
                    <motion.div
                      className="absolute w-24 h-24 rounded-full border border-green-700 opacity-30"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20 + index * 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className="relative w-full h-full">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-green-600 rounded-full"
                            style={{
                              top: "50%",
                              left: "50%",
                              transform: `translate(-50%, -50%) rotate(${
                                i * 90
                              }deg) translateY(-45px)`,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      className="w-18 h-18 rounded-full bg-white border-3 border-green-500 flex items-center justify-center text-green-600 font-bold mb-4 shadow-md relative z-10"
                      whileHover={{
                        scale: 1.2,
                        rotate: 360,
                        boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      animate={{
                        boxShadow: [
                          "0 5px 15px rgba(34, 197, 94, 0.2)",
                          "0 8px 25px rgba(34, 197, 94, 0.4)",
                          "0 5px 15px rgba(34, 197, 94, 0.2)",
                        ],
                      }}
                    >
                      <motion.span
                        className="text-lg"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        {index + 1}
                      </motion.span>
                    </motion.div>

                    <motion.span
                      className="font-semibold text-gray-800 text-center"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.2 + 0.4, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {step}
                    </motion.span>

                    {index < 4 && (
                      <motion.div
                        className="hidden sm:block absolute top-9 left-full h-1 bg-green-300 rounded-full"
                        style={{ marginLeft: "0.5rem" }}
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: "4rem", opacity: 1 }}
                        transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                        viewport={{ once: true }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.1,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
              }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all duration-500 group cursor-pointer"
            >
              <motion.p
                className="text-4xl font-bold text-green-600 mb-3 group-hover:text-green-700 transition-colors"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: index * 0.1 + 0.3,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 200,
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.p>
              <motion.p
                className="text-gray-600 font-medium"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-green-700 transition-all duration-300 hover:shadow-xl relative overflow-hidden"
            animate={{
              boxShadow: [
                "0 5px 15px rgba(34, 197, 94, 0.2)",
                "0 8px 25px rgba(34, 197, 94, 0.3)",
                "0 5px 15px rgba(34, 197, 94, 0.2)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.span
              className="relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Learn More About Our Process
            </motion.span>

            {/* Button ripple effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 0.1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
