import { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TeamSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const teamMembers = [
    {
      id: 1,
      name: "sro bearings",
      position: "MD",
      image:
        "https://images.unsplash.com/photo-1700831359498-7e367ee09472?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JlZW4lMjBuYXR1cmV8ZW58MHx8MHx8fDA%3D",
      bio: "Visionary leader with 15+ years in packaging innovation. Passionate about sustainable solutions.",
    },
    {
      id: 2,
      name: "sro bearings",
      position: "MD",
      image:
        "https://plus.unsplash.com/premium_photo-1676236297596-59f23505b6bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JlZW4lMjBuYXR1cmV8ZW58MHx8MHx8fDA%3D",
      bio: "Operations expert with a decade of experience in streamlining packaging processes.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.4, 1],
      },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 },
    },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-8 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-emerald-400 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-green-400 mix-blend-multiply filter blur-xl animate-blob"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex flex-col items-center text-center mb-16"
        >
          <motion.h3
            className="text-4xl font-bold text-green-800 mb-4"
            variants={textVariants}
          >
            Meet Our Leadership
          </motion.h3>
          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
            variants={textVariants}
          ></motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="flex flex-col lg:flex-row gap-8 items-center"
            >
              {/* Team Member Card */}
              <motion.div
                className="relative group w-full max-w-md lg:w-1/2"
                whileHover="hover"
                variants={imageVariants}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-emerald-400/20 rounded-3xl transform rotate-6 -z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-emerald-400/10 rounded-3xl transform -rotate-3 -z-10"></div>

                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-auto rounded-2xl shadow-2xl object-cover border-4 border-white"
                  initial={{ scale: 0.95 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Team Member Info */}
              <motion.div
                variants={textVariants}
                className="w-full lg:w-1/2 text-center lg:text-left space-y-4"
              >
                <motion.h4
                  className="text-2xl font-semibold text-gray-800"
                  initial={{ x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {member.name}
                </motion.h4>

                <motion.p
                  className="text-green-600 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {member.position}
                </motion.p>

                <motion.p
                  className="text-gray-600 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {member.bio}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
