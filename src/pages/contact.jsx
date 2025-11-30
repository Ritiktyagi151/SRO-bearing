import Head from "next/head";

import { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheck,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Contact Us | SRO Bearing</title>
        <meta
          name="description"
          content="Contact SRO Bearings for premium bearing solutions and expert support."
        />
      </Head>
      {/* Top Banner Video with Title */}
      <div className="relative h-[70vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={() => setIsVideoLoaded(true)}
          poster="https://t4.ftcdn.net/jpg/04/86/06/43/240_F_486064333_ueCjCQfwPt6rlXAEcphciGbxp4n6imuh.jpg" // Fallback image
        >
          <source
            src="https://videocdn.cdnpk.net/videos/a50cc503-4e76-522c-b8bf-2ea1ab341869/horizontal/previews/clear/small.mp4?token=exp=1752585333~hmac=7e5fafcfcfe4c164c3ba385fe2dd3da73096c975e93b4f077740d5cdb957e075"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Banner content */}
        <div
          className={`relative h-full flex flex-col justify-center items-center text-center text-white transition-opacity duration-500 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            SRO Contact
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl max-w-2xl mx-auto"
          >
            Reach out to us for premium bearing solutions
          </motion.p>
        </div>
      </div>

      {/* Contact Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-wrap -mx-4"
          >
            <motion.div
              variants={itemVariants}
              className="w-full md:w-1/3 px-4 mb-8 md:mb-0"
            >
              <motion.div
                variants={cardHoverVariants}
                whileHover="hover"
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col items-center text-center border border-gray-100"
              >
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  className="bg-emerald-50 p-4 rounded-full mb-6 text-emerald-600"
                >
                  <FaEnvelope className="text-2xl" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  Email
                </h3>
                <p className="text-gray-600">
                  <a
                    href="mailto:srobearings@outlook.com"
                    className="hover:text-emerald-600 transition-colors"
                  >
                    srobearings@outlook.com
                  </a>
                  <br />
                  <a
                    href="mailto:info@srobearings.com"
                    className="hover:text-emerald-600 transition-colors"
                  >
                    info@srobearings.com
                  </a>
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-full md:w-1/3 px-4 mb-8 md:mb-0"
            >
              <motion.div
                variants={cardHoverVariants}
                whileHover="hover"
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col items-center text-center border border-gray-100"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  className="bg-gray-100 p-4 rounded-full mb-6 text-gray-600"
                >
                  <FaPhoneAlt className="text-2xl" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  Phone No.
                </h3>
                <p className="text-gray-600">
                  <a
                    href="tel:+919873334405"
                    className="hover:text-emerald-600 transition-colors"
                  >
                    +91-9873334405
                  </a>
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-full md:w-1/3 px-4"
            >
              <motion.div
                variants={cardHoverVariants}
                whileHover="hover"
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col items-center text-center border border-gray-100"
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="bg-emerald-50 p-4 rounded-full mb-6 text-emerald-600"
                >
                  <FaMapMarkerAlt className="text-2xl" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  Address
                </h3>

                <p className="text-gray-600">
                  SRO Bearings Marketing office : 91, Mausam Vihar,
                  <br />
                  Near Preeti Vihar Metro Station,
                  <br />
                  Delhi-110051, INDIA.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Get in <span className="text-emerald-600">Touch</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              You will find yourself working in a true partnership that results
              in an incredible experience, and an end product that is the best.
            </p>
          </motion.div>

          <div className="flex flex-wrap -mx-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0"
            >
              <div className="h-full rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.3056109682166!2d77.21916737046456!3d28.65056665329916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd147bb1d049%3A0x24187c04f0ea11bd!2sShradhanand%20Marg%2C%20Shah%20Ganj%2C%20Chandni%20Chowk%2C%20Delhi%2C%20110006!5e0!3m2!1sen!2sin!4v1700911452599!5m2!1sen!2sin"
                  width="100%"
                  height="500"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full lg:w-1/2 px-4"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-200"
              >
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl font-bold mb-6 text-gray-800 flex items-center"
                >
                  <FaPaperPlane className="mr-3 text-emerald-600" />
                  Send Us a Message
                </motion.h3>

                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="relative"
                    onFocus={() => setActiveField("name")}
                    onBlur={() => setActiveField(null)}
                  >
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none transition-all duration-200 ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } ${
                        activeField === "name"
                          ? "ring-2 ring-emerald-500 border-emerald-500"
                          : ""
                      }`}
                      placeholder="Your Name"
                    />
                    {errors.name && (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-lg mt-1 block"
                      >
                        {errors.name}
                      </motion.span>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.65 }}
                    className="relative"
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField(null)}
                  >
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none transition-all duration-200 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } ${
                        activeField === "email"
                          ? "ring-2 ring-emerald-500 border-emerald-500"
                          : ""
                      }`}
                      placeholder="Email Address"
                    />
                    {errors.email && (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-lg mt-1 block"
                      >
                        {errors.email}
                      </motion.span>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="relative"
                    onFocus={() => setActiveField("phone")}
                    onBlur={() => setActiveField(null)}
                  >
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength="10"
                      className={`w-full p-3 border rounded-lg focus:outline-none transition-all duration-200 ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } ${
                        activeField === "phone"
                          ? "ring-2 ring-emerald-500 border-emerald-500"
                          : ""
                      }`}
                      placeholder="Phone Number"
                    />
                    {errors.phone && (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-lg mt-1 block"
                      >
                        {errors.phone}
                      </motion.span>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.75 }}
                    className="relative"
                    onFocus={() => setActiveField("address")}
                    onBlur={() => setActiveField(null)}
                  >
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200 ${
                        activeField === "address"
                          ? "ring-2 ring-emerald-500 border-emerald-500"
                          : ""
                      }`}
                      placeholder="Your Address"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="relative"
                    onFocus={() => setActiveField("message")}
                    onBlur={() => setActiveField(null)}
                  >
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className={`w-full p-3 border rounded-lg focus:outline-none transition-all duration-200 ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      } ${
                        activeField === "message"
                          ? "ring-2 ring-emerald-500 border-emerald-500"
                          : ""
                      }`}
                      placeholder="Your Message Here..."
                    ></textarea>
                    {errors.message && (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-lg mt-1 block"
                      >
                        {errors.message}
                      </motion.span>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.85 }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                        isSubmitting
                          ? "bg-emerald-400 cursor-not-allowed"
                          : "bg-emerald-600 hover:bg-emerald-700"
                      } text-white shadow-sm hover:shadow-md`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.div>
                </div>

                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-3 bg-emerald-100 text-emerald-700 rounded-lg flex items-center text-lg"
                    >
                      <FaCheck className="mr-2 text-emerald-600" />
                      Thank you! Your message has been sent successfully.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
