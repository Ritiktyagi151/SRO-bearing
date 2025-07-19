import { motion } from "framer-motion";
import { FaRocket, FaLightbulb, FaChartLine, FaTrophy } from "react-icons/fa";

export default function OurJourney() {
  const milestones = [
    {
      year: "2015",
      title: "Founded",
      description:
        "Started in a small office with just 3 team members and big dreams.",
      icon: <FaRocket className="text-blue-500 text-2xl" />,
    },
    {
      year: "2017",
      title: "First Breakthrough",
      description:
        "Launched our flagship product that revolutionized our industry.",
      icon: <FaLightbulb className="text-yellow-500 text-2xl" />,
    },
    {
      year: "2019",
      title: "Expansion",
      description: "Opened international offices and grew to 50+ employees.",
      icon: <FaChartLine className="text-green-500 text-2xl" />,
    },
    {
      year: "2023",
      title: "Industry Recognition",
      description:
        "Awarded 'Best Innovation Company' for three consecutive years.",
      icon: <FaTrophy className="text-purple-500 text-2xl" />,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Journey
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            From humble beginnings to industry leaders - our story of growth and
            innovation.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden sm:block absolute left-1/2 h-full w-1 bg-gray-200 transform -translate-x-1/2"></div>

          <div className="space-y-12 sm:space-y-0">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col sm:flex-row items-center ${
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Mobile dot */}
                <div className="sm:hidden absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-6 h-6 rounded-full bg-white border-4 border-blue-500 z-10"></div>

                {/* Desktop dot */}
                <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-blue-500 z-10"></div>

                {/* Content */}
                <div
                  className={`sm:w-5/12 p-6 rounded-xl bg-white shadow-md ${
                    index % 2 === 0 ? "sm:mr-8" : "sm:ml-8"
                  } hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-center mb-3">
                    <div className="mr-3">{milestone.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {milestone.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{milestone.description}</p>
                  <div className="mt-4 text-sm font-medium text-blue-600">
                    {milestone.year}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600">And our journey continues...</p>
        </motion.div>
      </div>
    </section>
  );
}
