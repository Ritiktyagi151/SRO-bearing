import { motion } from "framer-motion";
import {
  FiUsers,
  FiShield,
  FiTrendingUp,
  FiGlobe,
  FiHeart,
  FiTarget,
  FiEye,
  FiAward,
} from "react-icons/fi";
import Image from "next/image";

// Generate random image URLs from Picsum Photos
const getRandomImage = (seed) => {
  const width = 600;
  const height = 400;
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};

export default function ValuesAndMission() {
  // Mission data
  const mission = {
    statement:
      "To empower businesses and individuals through innovative solutions that simplify complexity, drive sustainable growth, and create meaningful connections in an increasingly digital world.",
    icon: <FiTarget className="w-10 h-10 text-blue-600" />,
    image: getRandomImage("mission"),
  };

  // Vision data
  const vision = {
    statement:
      "To be recognized globally as the most trusted partner for transformative digital solutions, setting the standard for innovation, quality, and positive impact in our industry.",
    icon: <FiEye className="w-10 h-10 text-purple-600" />,
    image: getRandomImage("vision"),
  };

  // Core values data
  const values = [
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "People First",
      description:
        "We prioritize relationships and believe success comes from putting people first.",
      image: getRandomImage("people"),
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Integrity",
      description:
        "We do what's right, not what's easy. Honesty and ethics guide every decision.",
      image: getRandomImage("integrity"),
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Continuous Growth",
      description:
        "We embrace learning and innovation to constantly improve ourselves and our solutions.",
      image: getRandomImage("growth"),
    },
    {
      icon: <FiGlobe className="w-8 h-8" />,
      title: "Global Impact",
      description:
        "We think beyond borders to create solutions with worldwide relevance.",
      image: getRandomImage("global"),
    },
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: "Passion",
      description:
        "We love what we do, and it shows in the quality of our work.",
      image: getRandomImage("passion"),
    },
  ];

  return (
    <div className="bg-white">
      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://media.istockphoto.com/id/472189801/photo/bearing-with-grease.jpg?s=612x612&w=0&k=20&c=OL7XxQzkCuRzyPcs8isjzAN_cc4omJ4jwsz3hBb393Y="
                alt="Our Mission"
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-500"
                unoptimized // Picsum photos don't need optimization
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2 text-center md:text-left"
          >
            <div className="flex justify-center md:justify-start mb-4">
              <div className="p-3 bg-blue-100 rounded-full">{mission.icon}</div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Our Mission
            </h2>
            <div className="max-w-4xl">
              <p className="text-lg text-gray-700 font-medium leading-relaxed">
                {mission.statement}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 flex flex-col"
              >
                <div className="relative h-40 w-full rounded-lg overflow-hidden mb-4">
                  <Image
                    src={value.image}
                    alt={value.title}
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="flex justify-center text-blue-600 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-600  to-green-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://media.istockphoto.com/id/1480114138/photo/bearings-of-different-types-micrometer-caliper-and-ruler-on-the-drawings-of-technical.jpg?s=612x612&w=0&k=20&c=fGXrh-wsT5LiMKi40qAfzuQQ_uyrTVBS9t2rDEyqolw="
                alt="Our Vision"
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2 text-center md:text-left"
          >
            <div className="flex justify-center md:justify-start mb-4">
              <div className="p-3 bg-purple-100 rounded-full bg-opacity-20">
                {vision.icon}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              Our Vision
            </h2>
            <div className="max-w-4xl">
              <p className="text-lg text-white font-medium leading-relaxed">
                {vision.statement}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://media.istockphoto.com/id/1254494227/photo/mechanic-is-putting-yellow-grease-in-the-into-bearing.jpg?s=612x612&w=0&k=20&c=ExJyioZTrJsb5ynFb6gxOZPWT--_rzJ8j5F8jZ2huVM="
                alt="Our Promise"
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2 text-center md:text-left"
          >
            <div className="inline-flex items-center justify-center p-4 bg-yellow-100 rounded-full mb-6">
              <FiAward className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
              Our Promise
            </h2>
            <div className="max-w-3xl">
              <p className="text-lg text-gray-700">
                We commit to delivering exceptional value, maintaining the
                highest standards of quality, and building lasting relationships
                based on trust and mutual success.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
