import React, { useState, useRef, useEffect } from "react";

const HeroVideoSection = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Sample video data
  const videoSources = [
    "/video/newsro.mp4",
    "https://www.shutterstock.com/shutterstock/videos/3717573081/preview/stock-footage-ball-bearings-falling-and-fill-the-screen-d-animation-on-transparent-background.webm",
    "https://www.shutterstock.com/shutterstock/videos/1022446408/preview/stock-footage--d-animation-of-disintegration-and-connection-of-the-ball-bearing-alpha-channel-available.webm",
  ];
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      isPlaying ? video.play() : video.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  const changeVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videoSources.length);
    setIsPlaying(true);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={videoSources[currentVideo]}
          autoPlay
          muted={isMuted}
          loop
          className="w-full h-full object-cover"
          onClick={togglePlay}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-center h-full px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            SRO Bearings
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 animate-fade-in-up delay-100">
            Trusted Global Bearing Traders Since 1995
          </h2>
          <p className="text-lg md:text-xl mb-8 animate-fade-in-up delay-200">
            Premium bearing solutions for industrial, automotive, and aerospace
            applications. We source directly from top manufacturers to deliver
            quality at competitive prices.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-300">
            <button className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors">
              Browse Products
            </button>
            <button className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium backdrop-blur-sm transition-colors">
              Contact Experts
            </button>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-4 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
        <button
          onClick={togglePlay}
          className="text-white hover:text-green-400 transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </button>

        <button
          onClick={toggleMute}
          className="text-white hover:text-green-400 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                clipRule="evenodd"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072M12 6a7.975 7.975 0 015.657 2.343m0 0a7.975 7.975 0 010 11.314m-11.314 0a7.975 7.975 0 010-11.314m0 0a7.975 7.975 0 015.657-2.343"
              />
            </svg>
          )}
        </button>

        <button
          onClick={changeVideo}
          className="text-white hover:text-green-400 transition-colors flex items-center gap-1"
          aria-label="Change video"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>Next Video</span>
        </button>
      </div>
    </section>
  );
};

export default HeroVideoSection;
