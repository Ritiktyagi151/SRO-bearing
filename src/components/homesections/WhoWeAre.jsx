import React, { useState, useEffect, useRef } from "react";
import {
  Users,
  Target,
  Lightbulb,
  Award,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";

export default function WhoWeAreSection() {
  const [activeTab, setActiveTab] = useState("mission");
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    clients: 0,
    experience: 0,
    success: 0,
    support: 24,
  });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);

  const statsRef = useRef(null);
  const videoRef = useRef(null);
  const videoTimeoutRef = useRef(null);

  const stats = [
    {
      number: "500+",
      label: "Happy Clients",
      icon: Users,
      animatedValue: animatedNumbers.clients,
      targetValue: 500,
    },
    {
      number: "10+",
      label: "Years Experience",
      icon: Award,
      animatedValue: animatedNumbers.experience,
      targetValue: 10,
    },
    {
      number: "99%",
      label: "Success Rate",
      icon: Target,
      animatedValue: animatedNumbers.success,
      targetValue: 99,
    },
    {
      number: "24/7",
      label: "Support",
      icon: Lightbulb,
      animatedValue: animatedNumbers.support,
      targetValue: 24,
      suffix: "/7",
    },
  ];

  // Intersection Observer for triggering animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateNumbers();
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Number animation function
  const animateNumbers = () => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 frames
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedNumbers({
        clients: Math.round(500 * easeOutQuart),
        experience: Math.round(10 * easeOutQuart),
        success: Math.round(99 * easeOutQuart),
        support: 24, // This stays constant
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  // Handle video play/pause
  useEffect(() => {
    if (!videoRef.current) return;

    if (isVideoPlaying) {
      videoRef.current.play().catch((error) => {
        console.error("Video play failed:", error);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  const formatNumber = (stat) => {
    if (stat.label === "Success Rate") {
      return `${stat.animatedValue}%`;
    }
    if (stat.label === "Support") {
      return `${stat.animatedValue}/7`;
    }
    if (stat.label === "Happy Clients") {
      return `${stat.animatedValue}+`;
    }
    if (stat.label === "Years Experience") {
      return `${stat.animatedValue}+`;
    }
    return stat.animatedValue;
  };

  const tabContent = {
    mission: {
      title: "Our Mission",
      content:
        "We are driven by a singular mission: to transform innovative ideas into extraordinary digital experiences that make a meaningful impact on businesses and communities worldwide.",
      image: "🎯",
    },
    vision: {
      title: "Our Vision",
      content:
        "To be the leading catalyst for digital transformation, empowering organizations to thrive in an ever-evolving technological landscape through cutting-edge solutions and unwavering commitment to excellence.",
      image: "🚀",
    },
    values: {
      title: "Our Values",
      content:
        "Innovation, integrity, and collaboration form the cornerstone of everything we do. We believe in pushing boundaries, maintaining transparency, and building lasting partnerships with our clients.",
      image: "💎",
    },
  };

  const handleVideoClick = () => {
    setIsVideoPlaying(!isVideoPlaying);
    // Clear any pending hover-based play actions
    if (videoTimeoutRef.current) {
      clearTimeout(videoTimeoutRef.current);
      videoTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    setIsHoveringVideo(true);
    // Only start playing if not already playing
    if (!isVideoPlaying) {
      videoTimeoutRef.current = setTimeout(() => {
        setIsVideoPlaying(true);
      }, 500); // Small delay for better UX
    }
  };

  const handleMouseLeave = () => {
    setIsHoveringVideo(false);
    // Only pause if we're not in clicked play state
    if (isVideoPlaying && videoTimeoutRef.current) {
      setIsVideoPlaying(false);
    }
    // Clear any pending play actions
    if (videoTimeoutRef.current) {
      clearTimeout(videoTimeoutRef.current);
      videoTimeoutRef.current = null;
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (videoTimeoutRef.current) {
        clearTimeout(videoTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white py-12 md:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-50/20 to-transparent"></div>
      <div className="absolute top-10 right-10 md:top-20 md:right-20 w-48 h-48 md:w-72 md:h-72 bg-green-100 rounded-full opacity-20 blur-2xl md:blur-3xl"></div>
      <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 w-64 h-64 md:w-96 md:h-96 bg-gray-100 rounded-full opacity-30 blur-2xl md:blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            Who We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">
              Are
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a team of passionate innovators, creative thinkers, and
            problem solvers dedicated to delivering exceptional digital
            solutions that drive success and inspire growth.
          </p>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 md:mb-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-green-200 transition-colors duration-300">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 min-h-[2rem] sm:min-h-[2.5rem] flex items-center">
                  <span className="tabular-nums">{formatNumber(stat)}</span>
                </div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Column - Interactive Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 bg-gray-100 p-1 sm:p-2 rounded-lg sm:rounded-xl">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 sm:px-6 sm:py-3 rounded-md sm:rounded-lg font-medium transition-all duration-300 text-sm sm:text-base capitalize ${
                    activeTab === tab
                      ? "bg-white text-green-700 shadow-sm sm:shadow-md"
                      : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-md sm:shadow-lg border border-gray-100">
              <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">
                {tabContent[activeTab].image}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                {tabContent[activeTab].title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                {tabContent[activeTab].content}
              </p>
              <button className="group inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-green-600 text-white rounded-md sm:rounded-lg hover:bg-green-700 transition-all duration-300 font-medium text-sm sm:text-base">
                Learn More
                <ChevronRight className="w-4 h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Right Column - Team Highlights */}
          <div className="space-y-6 md:space-y-8">
            {/* Video Section */}
            <div
              className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-video bg-black"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleVideoClick}
            >
              <video
                ref={videoRef}
                src="https://cdn.pixabay.com/video/2021/09/11/88225-606079090_tiny.mp4"
                loop
                muted
                className="w-full h-full object-cover"
                poster="https://cdn.pixabay.com/photo/2015/10/19/18/01/meeting-997689_640.jpg"
              />

              {/* Video Controls Overlay */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  isVideoPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                }`}
              >
                <div
                  className={`absolute inset-0 ${
                    isVideoPlaying ? "bg-black/30" : "bg-black/50"
                  } transition-colors duration-300`}
                ></div>
                <div className="relative z-10 text-center p-4 sm:p-6 md:p-8">
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 ${
                      isVideoPlaying ? "bg-white/30" : "bg-white/20"
                    } rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transition-colors duration-300 cursor-pointer`}
                  >
                    {isVideoPlaying ? (
                      <Pause className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                    ) : (
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white ml-0.5 sm:ml-1" />
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-4">
                    Meet Our Team
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base mb-4 sm:mb-6">
                    {isVideoPlaying
                      ? "Click to pause"
                      : "Click to watch our team in action"}
                  </p>
                </div>
              </div>
            </div>

            {/* Team Features */}
            <div className="space-y-3 sm:space-y-4">
              {[
                {
                  title: "Expert Leadership",
                  desc: "Seasoned professionals with decades of industry experience",
                },
                {
                  title: "Diverse Expertise",
                  desc: "Specialists across design, development, and strategy",
                },
                {
                  title: "Global Perspective",
                  desc: "International team bringing varied cultural insights",
                },
                {
                  title: "Continuous Learning",
                  desc: "Always staying ahead with latest technologies and trends",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors duration-300"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors duration-300">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-0.5 sm:mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
