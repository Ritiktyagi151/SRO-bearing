import React, { useState, useEffect } from "react";
import Link from "next/link";

const HeroVideoSection = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [fade, setFade] = useState(true);

  const videoSources = [
    "https://www.pexels.com/download/video/9136352/",
    "/video/propeller.mp4",
    "https://www.pexels.com/download/video/5914774/",
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setFade(false); // start fade-out
      setTimeout(() => {
        setCurrentVideo((prev) => (prev + 1) % videoSources.length);
        setFade(true); // fade-in
      }, 300); // fade duration
    }, 10000);

    return () => clearInterval(interval);
  }, [isClient, videoSources.length]);

  if (!isClient) return null;

  return (
    <section className="relative h-screen overflow-hidden font-futuristic">
      {/* Background Video with smooth fade */}
      <div className="absolute inset-0 z-0">
        <video
          key={currentVideo} // important for re-render
          src={videoSources[currentVideo]}
          autoPlay
          muted
          loop
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            fade ? "opacity-90" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Text Content */}
      <div className="absolute inset-0 z-10 text-white">
        <div className="absolute top-[100px] right-6 md:right-12 text-right space-y-2">
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
            PRECISION IN
          </h1>
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
            MOTION
          </h1>
        </div>

        <div className="absolute bottom-10 left-6 md:left-12 text-left space-y-2">
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
            EXCELLENCE IN
          </h1>
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
            DESIGN
          </h1>
          <div className="mt-4">
            <p className="mb-2 text-sm md:text-base text-white/90">
              Innovative machinery and clean energy solutions
            </p>
            <Link
              href="/industries"
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-5 rounded transition"
            >
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVideoSection;
