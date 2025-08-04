// components/WhatsAppBubble.js
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WhatsAppBubble() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("pulse");
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Animation sequence
  useEffect(() => {
    setIsVisible(true); // Fade in on mount

    const animations = ["pulse", "bounce", "tada", "shake"];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % animations.length;
      setCurrentAnimation(animations[index]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Tooltip display on hover
  useEffect(() => {
    let timeout;
    if (isHovered) {
      timeout = setTimeout(() => {
        setShowTooltip(true);
      }, 500);
    } else {
      setShowTooltip(false);
    }
    return () => clearTimeout(timeout);
  }, [isHovered]);

  const getAnimationClass = () => {
    switch (currentAnimation) {
      case "pulse":
        return "animate-pulse";
      case "bounce":
        return "animate-bounce";
      case "tada":
        return "animate-tada";
      case "shake":
        return "animate-shake";
      default:
        return "animate-pulse";
    }
  };

  return (
    <div
      className={`fixed right-6 bottom-10 z-50 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative">
        {showTooltip && (
          <div className="absolute right-20 bottom-0 bg-gray-100 text-gray-800 px-3 py-2 rounded-lg shadow-md whitespace-nowrap animate-fade-in">
            Chat with us on WhatsApp!
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-100 rotate-45"></div>
          </div>
        )}

        <Link
          href="https://wa.me/919873334405"
          target="_blank"
          rel="noopener noreferrer"
          className={`relative ${getAnimationClass()} 
            w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg 
            hover:bg-green-600 transition-all duration-300
            ${isHovered ? "scale-110 rotate-12" : "scale-100 rotate-0"}
            ring-2 ring-white/30 hover:ring-4 hover:ring-white/50
            hover:shadow-xl`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* WhatsApp icon with floating effect */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className={`w-10 h-10 transition-all duration-300 ${
              isHovered ? "scale-110 rotate-12" : "scale-100 rotate-0"
            }`}
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.479 5.092 1.479 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>

          {/* Animated notification dot */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
            <span className="relative">1</span>
          </span>

          {/* Ripple effect */}
          {isHovered && (
            <>
              <span className="absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-0 animate-ripple-1"></span>
              <span className="absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-0 animate-ripple-2"></span>
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
