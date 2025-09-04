import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

const HeroVideoSection = () => {
  const videoRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [autoplayError, setAutoplayError] = useState(false);

  const videoSources = [
    "https://videos.pexels.com/video-files/3802790/3802790-uhd_2560_1440_30fps.mp4",
    "https://videos.pexels.com/video-files/20300376/20300376-hd_1920_1080_60fps.mp4",
    "https://videos.pexels.com/video-files/5462676/5462676-uhd_2560_1440_30fps.mp4",
    "https://videos.pexels.com/video-files/4198778/4198778-uhd_2560_1440_24fps.mp4",
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const video = videoRef.current;
    if (video) {
      const playPromise = isPlaying ? video.play() : video.pause();

      if (isPlaying && playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Autoplay prevented:", error);
          setAutoplayError(true);
          setIsPlaying(false);
        });
      }
    }
  }, [isPlaying, currentVideo, isClient]);

  const togglePlay = () => {
    if (autoplayError) setAutoplayError(false);
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => setIsMuted(!isMuted);
  const changeVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videoSources.length);
    if (autoplayError) setAutoplayError(false);
  };

  if (!isClient) return null;

  return (
    <section className="relative h-screen overflow-hidden font-futuristic">
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
          playsInline
        />
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Fallback play button when autoplay fails */}
        {autoplayError && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 z-20 flex items-center justify-center w-full h-full"
          >
            <div className="bg-black/50 hover:bg-black/70 rounded-full p-4 transition-all">
              <svg
                className="h-16 w-16 text-white"
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
              </svg>
            </div>
          </button>
        )}
      </div>

      {/* Text Content Layout */}
      <div className="absolute inset-0 z-10 text-white">
        {/* Top-Right Corner Text */}
        <div className="absolute top-[100px] right-6 md:right-12 text-right space-y-2">
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
            PRECISION IN
          </h1>
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
            MOTION
          </h1>
        </div>

        {/* Bottom-Left Corner Text */}
        <div className="absolute bottom-10 left-6 md:left-12 text-left space-y-2">
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
            EXCELLENCE IN
          </h1>
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-none">
            DESIGN
          </h1>

          {/* Optional CTA under bottom-left text */}
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

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-4 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
        <button
          onClick={togglePlay}
          className="text-white hover:text-green-400 transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg
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
          aria-label="Next video"
        >
          <svg
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
          <span className="tracking-wide text-sm">NEXT VIDEO</span>
        </button>
      </div>
    </section>
  );
};

export default HeroVideoSection;
