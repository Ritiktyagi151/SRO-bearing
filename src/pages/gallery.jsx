import Head from "next/head";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("photos");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const videoRefs = useRef([]);

  // Sample gallery data
  const photos = [
    {
      id: 1,
      title: "Precision Bearings",
      description: "High-precision bearings for industrial applications",
      img: "https://t4.ftcdn.net/jpg/02/57/85/97/240_F_257859760_nK3BTo0WwjDRD2XWstjyz6KQacMhxXaa.jpg",
    },
    {
      id: 2,
      title: "Industrial Solutions",
      description: "Custom solutions for heavy machinery",
      img: "https://t4.ftcdn.net/jpg/02/38/68/37/240_F_238683726_0RvkNoGLk2OgLiNGggE6QHGLcwgCa8TQ.jpg",
    },
    {
      id: 3,
      title: "Quality Assurance",
      description: "Our quality control process in action",
      img: "https://t3.ftcdn.net/jpg/03/10/56/86/240_F_310568606_wIioDApZGPpMpqDqcEKzHysUrEqOXK1K.jpg",
    },
    {
      id: 4,
      title: "Global Distribution",
      description: "Our worldwide logistics network",
      img: "https://t3.ftcdn.net/jpg/03/10/56/86/240_F_310568606_wIioDApZGPpMpqDqcEKzHysUrEqOXK1K.jpg",
    },
    {
      id: 5,
      title: "Technical Expertise",
      description: "Our engineering team at work",
      img: "https://t4.ftcdn.net/jpg/00/52/18/53/240_F_52185386_7nqno8rIicMlkirfO9aIEQRrGe5Q7Rc5.jpg",
    },
    {
      id: 6,
      title: "Customer Support",
      description: "24/7 support for all your needs",
      img: "https://t3.ftcdn.net/jpg/02/20/96/50/240_F_220965089_RHuxKpLIaWEa7xDLpakoWLRqJWCOmLS3.jpg",
    },
  ];

  const videos = [
    {
      id: 1,
      title: "Manufacturing Process",
      description: "See how our bearings are made",
      src: "https://v.ftcdn.net/15/66/93/00/240_F_1566930046_Z8WXMwY1em5k8XWgUUcXvWwYeypRJ6dd_ST.mp4",
      poster: "/video-poster-1.jpg",
    },
    {
      id: 2,
      title: "Quality Testing",
      description: "Our rigorous testing procedures",
      src: "https://v.ftcdn.net/15/27/66/21/240_F_1527662157_Po70SnNylklc83RN1dZgHL7Ri1Orb1Xe_ST.mp4",
      poster: "/video-poster-2.jpg",
    },
    {
      id: 3,
      title: "Installation Guide",
      description: "Proper bearing installation techniques",
      src: "https://v.ftcdn.net/14/33/87/92/240_F_1433879299_rdZ2BVVGcO566EpkXylsSE11D3k0c5Sy_ST.mp4",
      poster: "/video-poster-3.jpg",
    },
  ];

  const handleVideoHover = (index, isHovering) => {
    if (videoRefs.current[index]) {
      isHovering
        ? videoRefs.current[index].play()
        : videoRefs.current[index].pause();
    }
  };

  return (
    <>
      <Head>
        <title>Gallery | SRO Bearing</title>
        <meta
          name="description"
          content="Explore our bearing products gallery"
        />
      </Head>

      {/* Photo Zoom Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-6xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-10 right-0 text-white text-3xl z-10"
                onClick={() => setSelectedPhoto(null)}
              >
                &times;
              </button>
              <div className="bg-white rounded-lg overflow-hidden">
                <img
                  src={selectedPhoto.img}
                  alt={selectedPhoto.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <div className="p-6 bg-gray-50">
                  <h3 className="text-2xl font-bold text-emerald-700 mb-2">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-gray-600">{selectedPhoto.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative">
        <div className="relative w-full h-[70vh] overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="https://media.istockphoto.com/id/2194284479/video/macro-metal-balls-rolling-toward-the-camera.mp4?s=mp4-640x640-is&k=20&c=0YsV1hJ2cia-Mub37pUWjaFeXYhfb2oCrAIxXL6TeLE="
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center px-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                SRO Bearing Gallery
              </h1>
              <p className="text-lg text-white max-w-2xl mx-auto">
                Discover our premium bearing solutions through our visual
                showcase
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Centered Content Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-semibold text-emerald-700 mb-6">
            Our Product Gallery
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            As leading traders of high-quality bearings, SRO Bearing offers a
            wide range of precision-engineered products designed for durability
            and performance. Explore our collection below.
          </p>

          {/* Centered Tab Buttons */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex space-x-2 p-1 bg-gray-100 rounded-lg">
              {["photos", "videos"].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-emerald-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "photos" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                    }}
                    className="bg-gray-100 h-64 rounded-xl overflow-hidden relative group cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img
                      src={photo.img}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div>
                        <h3 className="text-white font-semibold text-lg">
                          {photo.title}
                        </h3>
                        <p className="text-gray-200 text-lg">
                          {photo.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-100 rounded-xl overflow-hidden relative group"
                    onMouseEnter={() => handleVideoHover(index, true)}
                    onMouseLeave={() => handleVideoHover(index, false)}
                  >
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      className="w-full h-48 object-cover"
                      muted
                      loop
                      playsInline
                      poster={video.poster}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                      <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-emerald-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-semibold text-gray-800">
                        {video.title}
                      </h3>
                      <p className="text-lg text-gray-600">
                        {video.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
