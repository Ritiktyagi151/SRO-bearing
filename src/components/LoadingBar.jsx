import React from "react";

export const AnimatedLoader = ({
  logoSrc = "/sro-newlogo.png",
  text = "Loading",
  primaryColor = "#10b981",
  secondaryColor = "#059669",
  tertiaryColor = "#14b8a6",
  width = "w-64",
  height = "h-64",
  logoWidth = "w-24",
  logoHeight = "h-24",
  logoInnerWidth = "w-20",
  logoInnerHeight = "h-20",
}) => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
      {/* Starry background */}
      <div className="stars-container absolute inset-0 overflow-hidden">
        <style>{`
          @keyframes fall {
            to {
              transform: translate3d(-30em, 0, 0);
            }
          }
          
          @keyframes tail-fade {
            0%, 50% {
              width: var(--star-tail-length);
              opacity: 1;
            }
            70%, 80% {
              width: 0;
              opacity: 0.4;
            }
            100% {
              width: 0;
              opacity: 0;
            }
          }
          
          @keyframes blink {
            50% {
              opacity: 0.6;
            }
          }

          .stars {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 120%;
            transform: rotate(-45deg);
          }

          .star {
            --star-color: #10b981;
            --star-tail-length: 6em;
            --star-tail-height: 2px;
            --star-width: calc(var(--star-tail-length) / 6);
            --fall-duration: 9s;
            --tail-fade-duration: var(--fall-duration);

            position: absolute;
            top: var(--top-offset);
            left: 0;
            width: var(--star-tail-length);
            height: var(--star-tail-height);
            color: var(--star-color);
            background: linear-gradient(45deg, currentColor, transparent);
            border-radius: 50%;
            filter: drop-shadow(0 0 6px currentColor);
            transform: translate3d(104em, 0, 0);
            animation: fall var(--fall-duration) var(--fall-delay) linear infinite, tail-fade var(--tail-fade-duration) var(--fall-delay) ease-out infinite;
          }

          @media screen and (max-width: 750px) {
            .star {
              animation: fall var(--fall-duration) var(--fall-delay) linear infinite;
            }
          }

          .star::before, .star::after {
            position: absolute;
            content: '';
            top: 0;
            left: calc(var(--star-width) / -2);
            width: var(--star-width);
            height: 100%;
            background: linear-gradient(45deg, transparent, currentColor, transparent);
            border-radius: inherit;
            animation: blink 2s linear infinite;
          }

          .star::before {
            transform: rotate(45deg);
          }

          .star::after {
            transform: rotate(-45deg);
          }
        `}</style>

        <div className="stars">
          {Array.from({ length: 50 }).map((_, index) => {
            const starTailLength = `${(Math.random() * 250 + 500) / 100}em`;
            const topOffset = `${(Math.random() * 10000) / 100}vh`;
            const fallDuration = `${(Math.random() * 6000 + 6000) / 1000}s`;
            const fallDelay = `${(Math.random() * 10000) / 1000}s`;

            return (
              <div
                key={index}
                className="star"
                style={{
                  "--star-tail-length": starTailLength,
                  "--top-offset": topOffset,
                  "--fall-duration": fallDuration,
                  "--fall-delay": fallDelay,
                  "--star-color":
                    index % 3 === 0
                      ? "#10b981"
                      : index % 3 === 1
                      ? "#14b8a6"
                      : "#059669",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Existing animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-500 rounded-full opacity-10 blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-20 w-36 h-36 bg-teal-500 rounded-full opacity-10 blur-3xl animate-bounce"></div>

        {/* Animated grid lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-5"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Moving gradient lines */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-20 animate-pulse"></div>
          <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-20 animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Main loader container */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Outer rotating ring */}
        <div className={`relative ${width} ${height}`}>
          <style>{`
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes spin-reverse {
              from { transform: rotate(360deg); }
              to { transform: rotate(0deg); }
            }
            @keyframes pulse-scale {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            .spin-slow { animation: spin-slow 4s linear infinite; }
            .spin-reverse { animation: spin-reverse 6s linear infinite; }
            .pulse-scale { animation: pulse-scale 2s ease-in-out infinite; }
            .float { animation: float 3s ease-in-out infinite; }
            .delay-700 { animation-delay: 0.7s; }
            .delay-1000 { animation-delay: 1s; }
          `}</style>

          {/* Outer ring */}
          <div className="absolute inset-0 spin-slow">
            <svg viewBox="0 0 160 160" className="w-full h-full">
              <circle
                cx="80"
                cy="80"
                r="75"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="3"
                strokeDasharray="15,5"
                opacity="0.8"
              />
              <defs>
                <linearGradient
                  id="gradient1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Middle ring */}
          <div className="absolute inset-4 spin-reverse opacity-60">
            <svg viewBox="0 0 160 160" className="w-full h-full">
              <circle
                cx="80"
                cy="80"
                r="65"
                fill="none"
                stroke="url(#gradient2)"
                strokeWidth="2"
                strokeDasharray="10,8"
                opacity="0.7"
              />
              <defs>
                <linearGradient
                  id="gradient2"
                  x1="100%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Inner ring */}
          <div className="absolute inset-8 spin-slow opacity-40">
            <svg viewBox="0 0 160 160" className="w-full h-full">
              <circle
                cx="80"
                cy="80"
                r="50"
                fill="none"
                stroke="url(#gradient3)"
                strokeWidth="1.5"
                strokeDasharray="8,6"
                opacity="0.6"
              />
              <defs>
                <linearGradient
                  id="gradient3"
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Center company logo area */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="float">
              <div
                className={`${logoWidth} ${logoHeight} bg-white rounded-lg flex items-center justify-center shadow-2xl`}
              >
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt="Company Logo"
                    className={`${logoInnerWidth} ${logoInnerHeight} object-contain`}
                  />
                ) : (
                  <svg
                    className="w-16 h-16 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-3">{text}</h2>
          <div className="flex gap-2 justify-center">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></span>
            <span className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce delay-700"></span>
            <span className="w-3 h-3 bg-teal-500 rounded-full animate-bounce delay-1000"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLoader;
