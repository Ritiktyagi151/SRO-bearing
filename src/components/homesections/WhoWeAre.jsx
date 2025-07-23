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
    support: 0,
  });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasManuallyToggled, setHasManuallyToggled] = useState(false);

  const statsRef = useRef(null);
  const videoRef = useRef(null);
  const videoTimeoutRef = useRef(null);

  const stats = [
    {
      label: "Clients Served Globally",
      icon: Users,
      animatedValue: animatedNumbers.clients,
      targetValue: 1000,
      suffix: "+",
    },
    {
      label: "Years of Excellence",
      icon: Award,
      animatedValue: animatedNumbers.experience,
      targetValue: 40,
      suffix: "+",
    },
    {
      label: "On-Time Delivery Rate",
      icon: Target,
      animatedValue: animatedNumbers.success,
      targetValue: 99.9,
      suffix: "%",
    },
    {
      label: "Days of Dedicated Support",
      icon: Lightbulb,
      animatedValue: animatedNumbers.support,
      targetValue: 365,
      suffix: "/yr",
    },
  ];

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

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  const animateNumbers = () => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedNumbers({
        clients: Math.round(1000 * easeOutQuart),
        experience: Math.round(40 * easeOutQuart),
        success: Math.round(99.9 * easeOutQuart),
        support: Math.round(365 * easeOutQuart),
      });

      if (currentStep >= steps) clearInterval(timer);
    }, stepTime);
  };

  useEffect(() => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.play().catch((e) => console.error("Play error:", e));
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  const formatNumber = (stat) => {
    return `${stat.animatedValue}${stat.suffix || ""}`;
  };

  const tabContent = {
    mission: {
      title: "Our Mission",
      content:
        "To deliver innovative, reliable, and scalable digital solutions that empower businesses to grow, adapt, and lead in their industries.",
      image: "🎯",
    },
    vision: {
      title: "Our Vision",
      content:
        "To become a globally trusted partner in digital excellence, shaping the future through technology and a customer-first approach.",
      image: "🚀",
    },
    values: {
      title: "Our Values",
      content:
        "We value innovation, transparency, and a results-driven mindset. Our team thrives on creativity, collaboration, and a passion for solving real-world challenges.",
      image: "💎",
    },
  };

  const handleVideoClick = () => {
    setHasManuallyToggled(true);
    setIsVideoPlaying((prev) => !prev);
    if (videoTimeoutRef.current) {
      clearTimeout(videoTimeoutRef.current);
      videoTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    if (!isVideoPlaying && !hasManuallyToggled) {
      videoTimeoutRef.current = setTimeout(() => {
        setIsVideoPlaying(true);
      }, 500);
    }
  };

  const handleMouseLeave = () => {
    if (!hasManuallyToggled && isVideoPlaying) {
      setIsVideoPlaying(false);
    }
    if (videoTimeoutRef.current) {
      clearTimeout(videoTimeoutRef.current);
      videoTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (videoTimeoutRef.current) clearTimeout(videoTimeoutRef.current);
    };
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white py-12 md:py-24 overflow-hidden">
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
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a dynamic team of innovators and strategists committed to
            crafting impactful digital experiences. Our goal is to empower
            businesses with tailored solutions that accelerate growth and foster
            long-term success.
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
              className="group relative bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-300">
                  <stat.icon className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  <span className="tabular-nums">{formatNumber(stat)}</span>
                </div>
                <div className="text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Side - Tabs */}
          <div className="space-y-8">
            <div className="flex flex-wrap gap-2 bg-gray-100 p-2 rounded-xl">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-base capitalize ${
                    activeTab === tab
                      ? "bg-white text-green-700 shadow-md"
                      : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://media.istockphoto.com/id/882326716/photo/industrial-bearings.jpg?s=612x612&w=0&k=20&c=oixlP8mlXYhkDBJm-kC9eEl_ddH3MtyyAQjg4Q_mXMY="
                alt="Our Mission Illustration"
                className="w-full h-80 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <p className="absolute bottom-4 left-4 text-white text-lg font-medium">
                Empowering Digital Transformation
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="text-6xl mb-6">{tabContent[activeTab].image}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {tabContent[activeTab].title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                {tabContent[activeTab].content}
              </p>
              <button className="group inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 font-medium text-base">
                Learn More
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Right Side - Video + Features */}
          <div className="space-y-8">
            <div
              className="relative rounded-2xl overflow-hidden aspect-video bg-black"
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
                title="Meet Our Team"
              />
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
                <div className="relative z-10 text-center p-6">
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 ${
                      isVideoPlaying ? "bg-white/30" : "bg-white/20"
                    } rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 cursor-pointer`}
                  >
                    {isVideoPlaying ? (
                      <Pause className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    ) : (
                      <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Meet Our Team
                  </h3>
                  <p className="text-white/80 text-base">
                    {isVideoPlaying
                      ? "Click to pause"
                      : "Click to watch our team in action"}
                  </p>
                </div>
              </div>
            </div>

            {/* Team Features */}
            <div className="space-y-4">
              {[
                {
                  title: "Strategic Vision",
                  desc: "We align every project with your long-term business goals for meaningful growth.",
                },
                {
                  title: "End-to-End Solutions",
                  desc: "From ideation to launch, we cover every aspect of your digital journey.",
                },
                {
                  title: "Client-Centric Approach",
                  desc: "Your success is our priority—we collaborate closely for tailored outcomes.",
                },
                {
                  title: "Future-Ready Mindset",
                  desc: "We embrace emerging technologies to future-proof your digital presence.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-base mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
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
