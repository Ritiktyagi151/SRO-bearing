import React, { useState, useRef, useEffect } from "react";

const VideoGridSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const videoRefs = useRef([]);
  const intervalRef = useRef(null);

  // Sample video data - 6 videos with your original paths
  const allVideos = [
    {
      id: 1,
      title: "Nature 1",
      src: "/video/video-1.mp4",
      thumbnail:
        "https://t3.ftcdn.net/jpg/11/85/62/64/240_F_1185626483_PiyZOBtxyZBV9AGrEdiXpZnUVCu5esxg.jpg",
    },
    {
      id: 2,
      title: "Nature 2",
      src: "/video/video-2.mp4",
      thumbnail:
        "https://t3.ftcdn.net/jpg/14/47/37/64/240_F_1447376418_T3GqRJPHHYIeBbtlHxRCs3N7NHtM7OAJ.jpg",
    },
    {
      id: 3,
      title: "Nature 3",
      src: "/video/video-3.mp4",
      thumbnail:
        "https://t4.ftcdn.net/jpg/00/02/06/03/240_F_2060321_jH5uacaP5qrj7zMsld0FuHnABZabyM.jpg",
    },
    {
      id: 4,
      title: "City 1",
      src: "/video/video-4.mp4",
      thumbnail:
        "https://t4.ftcdn.net/jpg/01/02/07/23/240_F_102072378_RoaFenLsl4mFdID93imJj0wFd5iOzRVH.jpg",
    },
    {
      id: 5,
      title: "City 2",
      src: "/video/video-5.mp4",
      thumbnail:
        "https://t4.ftcdn.net/jpg/03/27/32/11/240_F_327321151_vggESRUygFWkw0pMeomH62gDcsgNnr2Y.jpg",
    },
    {
      id: 6,
      title: "City 3",
      src: "/video/video-6.mp4",
      thumbnail:
        "https://t4.ftcdn.net/jpg/02/55/89/01/240_F_255890167_1ji66H4IpOJrepji5KiiAaBmTMRnsFBj.jpg",
    },
  ];

  // Group videos into slides of 3 videos each
  const groupedVideos = [];
  for (let i = 0; i < allVideos.length; i += 3) {
    groupedVideos.push(allVideos.slice(i, i + 3));
  }

  // Auto-rotate slides
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === groupedVideos.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [groupedVideos.length]);

  const goToNext = () => {
    setCurrentSlide((prev) =>
      prev === groupedVideos.length - 1 ? 0 : prev + 1
    );
    resetAutoPlay();
  };

  const goToPrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? groupedVideos.length - 1 : prev - 1
    );
    resetAutoPlay();
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === groupedVideos.length - 1 ? 0 : prev + 1
      );
    }, 5000);
  };

  const handleVideoHover = (videoId) => {
    setIsHovered(videoId);
    const videoRef = videoRefs.current[videoId];
    if (videoRef) {
      videoRef.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  };

  const handleVideoLeave = (videoId) => {
    setIsHovered(null);
    const videoRef = videoRefs.current[videoId];
    if (videoRef) {
      videoRef.pause();
      videoRef.currentTime = 0;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Video Gallery</h2>

      {/* Main Slider */}
      <div className="relative mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[300px]">
          {groupedVideos[currentSlide]?.map((video) => (
            <div
              key={video.id}
              className="relative rounded-lg overflow-hidden shadow-md bg-white"
              onMouseEnter={() => handleVideoHover(video.id)}
              onMouseLeave={() => handleVideoLeave(video.id)}
            >
              <video
                ref={(el) => (videoRefs.current[video.id] = el)}
                src={video.src}
                poster={video.thumbnail}
                className="w-full h-full object-cover"
                loop
                muted
                preload="metadata"
              />
              <div
                className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-gray-900/80 to-transparent transition-opacity duration-300 ${
                  isHovered === video.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <h3 className="text-white text-sm font-medium">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {groupedVideos.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 hover:bg-green-500 hover:text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300"
            >
              &lt;
            </button>
            <button
              onClick={goToNext}
              className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 hover:bg-green-500 hover:text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300"
            >
              &gt;
            </button>
          </>
        )}
      </div>

      {/* Indicators */}
      {groupedVideos.length > 1 && (
        <div className="flex justify-center space-x-2 mb-6">
          {groupedVideos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-green-500 w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGridSlider;
