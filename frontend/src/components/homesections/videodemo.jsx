import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Videodemo = () => {
  // Define the single background video
  const backgroundVideoSrc = "/video/combineview.mp4"; // You can choose any of your videos
  const backgroundVideoDuration = 25000; // 25 seconds for the background video

  // Define the text slides
  const textSlides = [
    {
      topText1: "PRECISION IN",
      topText2: "MOTION",
      bottomText1: "EXCELLENCE IN",
      bottomText2: "DESIGN",
      description: "Innovative machinery and clean energy solutions",
      buttonText: "Explore More",
      buttonLink: "/industries",
    },
    {
      topText1: "POWERING",
      topText2: "THE FUTURE",
      bottomText1: "ENGINEERED FOR",
      bottomText2: "EFFICIENCY",
      description: "Advanced propeller systems for next-gen aviation",
      buttonText: "Learn More",
      buttonLink: "/about",
    },
    {
      topText1: "INNOVATION IN",
      topText2: "MOTION CONTROL",
      bottomText1: "CRAFTED WITH",
      bottomText2: "PRECISION",
      description: "High-performance designs built to perfection",
      buttonText: "Contact Us",
      buttonLink: "/contact",
    },
  ];

  const [currentTextSlide, setCurrentTextSlide] = useState(0);
  const videoRef = useRef(null);
  const textSlideTimerRef = useRef(null);
  const backgroundVideoTimerRef = useRef(null);

  // Duration for each text slide
  const textSlideDisplayDuration = 5000; // 5 seconds per text slide

  useEffect(() => {
    // --- Handle background video playback ---
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Handle play promise rejection (e.g., user hasn't interacted yet)
        console.log("Video autoplay prevented or failed.");
      });

      // Set a timer to loop the background video after its fixed duration
      // This ensures it restarts after 25 seconds regardless of its actual length
      backgroundVideoTimerRef.current = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0; // Reset to start
          videoRef.current.play().catch(() => {});
        }
      }, backgroundVideoDuration);
    }

    // --- Handle text slide cycling ---
    textSlideTimerRef.current = setInterval(() => {
      setCurrentTextSlide((prev) => (prev + 1) % textSlides.length);
    }, textSlideDisplayDuration);

    // Cleanup function for both timers
    return () => {
      if (textSlideTimerRef.current) {
        clearInterval(textSlideTimerRef.current);
      }
      if (backgroundVideoTimerRef.current) {
        clearTimeout(backgroundVideoTimerRef.current);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Ensure the background video actually loops when it ends naturally *before* the 25s timer
  const handleBackgroundVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // Reset to start
      videoRef.current.play().catch(() => {});
    }
  };

  const currentSlideData = textSlides[currentTextSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex justify-center items-center">
      {/* Background Video */}
      <video
        ref={videoRef}
        src={backgroundVideoSrc}
        autoPlay
        muted
        playsInline
        onEnded={handleBackgroundVideoEnd} // Use this for natural video end
        className="w-full h-full object-cover transition-all duration-700"
      ></video>

      {/* Overlay Text */}
      <div className="absolute inset-0 z-10 text-white">
        {/* Top Right Text */}
        <div className="absolute top-[100px] right-6 md:right-12 text-right space-y-2">
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
            {currentSlideData.topText1}
          </h1>
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
            {currentSlideData.topText2}
          </h1>
        </div>

        {/* Bottom Left Text */}
        <div className="absolute bottom-10 left-6 md:left-12 text-left space-y-2">
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
            {currentSlideData.bottomText1}
          </h1>
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
            {currentSlideData.bottomText2}
          </h1>
          <div className="mt-4">
            <p className="mb-2 text-sm md:text-base text-white/90">
              {currentSlideData.description}
            </p>
            <Link
              href={currentSlideData.buttonLink}
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-5 rounded transition"
            >
              {currentSlideData.buttonText}
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Dots for text content */}
      <div className="absolute bottom-5 right-5 flex gap-2 z-20">
        {textSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              clearInterval(textSlideTimerRef.current); // Stop auto-advance
              setCurrentTextSlide(index);
              // Restart auto-advance after manual selection (optional)
              textSlideTimerRef.current = setInterval(() => {
                setCurrentTextSlide((prev) => (prev + 1) % textSlides.length);
              }, textSlideDisplayDuration);
            }}
            className={`w-3 h-3 rounded-full ${
              currentTextSlide === index ? "bg-white" : "bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Videodemo;
