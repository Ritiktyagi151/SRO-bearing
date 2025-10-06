import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Videodemo = () => {
  const slides = [
    {
      src: "/video/srovideo1.mp4",
      topText1: "PRECISION IN",
      topText2: "MOTION",
      bottomText1: "EXCELLENCE IN",
      bottomText2: "DESIGN",
      description: "Innovative machinery and clean energy solutions",
      buttonText: "Explore More",
      buttonLink: "/industries",
      fixedTime: 10000, // play only 10 seconds
    },
    {
      src: "/video/propeller.mp4",
      topText1: "POWERING",
      topText2: "THE FUTURE",
      bottomText1: "ENGINEERED FOR",
      bottomText2: "EFFICIENCY",
      description: "Advanced propeller systems for next-gen aviation",
      buttonText: "Learn More",
      buttonLink: "/about",
      fixedTime: null, // play full duration
    },
    {
      src: "/video/srovideo3.mp4",
      topText1: "INNOVATION IN",
      topText2: "MOTION CONTROL",
      bottomText1: "CRAFTED WITH",
      bottomText2: "PRECISION",
      description: "High-performance designs built to perfection",
      buttonText: "Contact Us",
      buttonLink: "/contact",
      fixedTime: null, // play full duration
    },
  ];

  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  // Handle when video ends
  const handleVideoEnd = () => {
    nextVideo();
  };

  // Go to next video
  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    if (videoRef.current) {
      const currentSlide = slides[currentVideo];
      videoRef.current.load();
      videoRef.current.play().catch(() => {});

      // Clear any old timers
      if (timerRef.current) clearTimeout(timerRef.current);

      // If this slide has a fixed duration (like 10s)
      if (currentSlide.fixedTime) {
        timerRef.current = setTimeout(() => {
          nextVideo();
        }, currentSlide.fixedTime);
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentVideo]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex justify-center items-center">
      {/* Background Video */}
      <video
        ref={videoRef}
        src={slides[currentVideo].src}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="w-full h-full object-cover transition-all duration-700"
      ></video>

      {/* Overlay Text */}
      <div className="absolute inset-0 z-10 text-white">
        {/* Top Right Text */}
        <div className="absolute top-[100px] right-6 md:right-12 text-right space-y-2">
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
            {slides[currentVideo].topText1}
          </h1>
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
            {slides[currentVideo].topText2}
          </h1>
        </div>

        {/* Bottom Left Text */}
        <div className="absolute bottom-10 left-6 md:left-12 text-left space-y-2">
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
            {slides[currentVideo].bottomText1}
          </h1>
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
            {slides[currentVideo].bottomText2}
          </h1>
          <div className="mt-4">
            <p className="mb-2 text-sm md:text-base text-white/90">
              {slides[currentVideo].description}
            </p>
            <Link
              href={slides[currentVideo].buttonLink}
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-5 rounded transition"
            >
              {slides[currentVideo].buttonText}
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-5 right-5 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideo(index)}
            className={`w-3 h-3 rounded-full ${
              currentVideo === index ? "bg-white" : "bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Videodemo;
