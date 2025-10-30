import React, { useRef, useEffect, useState } from "react";

/**
 * A single-file React component that renders an animated business infographic timeline.
 * This component uses Tailwind CSS for styling and inline CSS for animations.
 *
 * It includes:
 * 1. An SVG path for the winding timeline, animated with CSS `stroke-dasharray`.
 * 2. Numbered nodes (1-5) that fade in.
 * 3. Text blocks for each node that also fade in.
 * 4. Custom "pin" shapes for nodes 1, 2, 4, and 5 using CSS pseudo-elements.
 * 5. Sequential animations using `animation-delay`.
 *
 * Updated: Animations now trigger only once when the component scrolls into view,
 * preventing restarts on subsequent scrolls.
 *
 * Content updated for SRO Bearings with a green (#039748) color scheme.
 */
const Journey = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the container is visible
        rootMargin: "0px 0px -100px 0px", // Trigger a bit before fully in view
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div className=" items-center hidden pt-20  lg:flex justify-center w-full min-h-screen bg-[#F3F4F6] p-4  overflow-hidden font-inter">
      {/* This style block contains all the custom CSS for:
        1. Keyframe animations for drawing lines and fading in elements.
        2. The animation-delay utility classes.
        3. The custom "pin" shapes using pseudo-elements.
        4. Initial hidden state for animations (dashoffset and opacity).
      */}
      <style>{`
        /* Use the Inter font */
        body {
          font-family: 'Inter', sans-serif;
        }

        /* Initial state for timeline path: fully offset, no animation yet */
        .timeline-path {
          stroke-dasharray: 2500;
          stroke-dashoffset: 2500;
        }
        
        /* Trigger animation when visible */
        .timeline-path.animate {
          animation: draw-line 4s ease-in-out forwards;
        }
        
        /* Animation for the dotted SVG lines */
        .dotted-line {
          stroke-dasharray: 5 5;
          stroke-dashoffset: 200;
        }
        .dotted-line.animate {
          animation: draw-dotted-line 1s ease-in-out forwards;
        }

        /* Initial state for fade-in: hidden */
        .fade-in {
          opacity: 0;
        }
        
        /* Trigger fade-in animation when visible */
        .fade-in.animate {
          animation: fade-in 0.8s ease-in-out forwards;
        }

        /* Keyframes */
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }
        @keyframes draw-dotted-line {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fade-in {
          to { opacity: 1; }
        }
        
        /* Animation delay classes (applied after trigger) */
        .delay-0 { animation-delay: 0s; }
        .delay-1 { animation-delay: 0.5s; } /* Node 1 */
        .delay-2 { animation-delay: 1.8s; } /* Node 2 */
        .delay-3 { animation-delay: 2.2s; } /* Dotted line to 3 */
        .delay-4 { animation-delay: 2.5s; } /* Node 3 */
        .delay-5 { animation-delay: 3.0s; } /* Node 4 */
        .delay-6 { animation-delay: 3.8s; } /* Node 5 */
        
        /* Custom pin shapes using pseudo-elements */
        .pin::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 15px solid transparent;
          border-right: 15px solid transparent;
        }
        
        /* Large pin for node 1 */
        .pin-lg::after {
          bottom: -24px; /* Position pin at the bottom */
          border-left-width: 22px;
          border-right-width: 22px;
          border-top-width: 30px;
          border-top-color: #039748; /* Match new color */
        }

        /* Medium pin for node 2 */
        .pin-md::after {
          bottom: -15px;
          border-left-width: 15px;
          border-right-width: 15px;
          border-top-width: 20px;
          border-top-color: #039748; /* Match new color */
        }
        
        /* Small pin for nodes 4 & 5 */
        .pin-sm::after {
            bottom: -8px;
            border-left-width: 8px;
            border-right-width: 8px;
            border-top-width: 12px;
            border-top-color: #039748; /* Match new color */
        }
      `}</style>

      {/* Main Container for the infographic - observed for intersection */}
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl mx-auto h-[600px] "
      >
        {/* Title - always visible or fade in immediately */}
        <div
          className={`absolute -top-11 text-center  inset-0 left-[10px]  z-10 fade-in ${
            isVisible ? "animate delay-0" : ""
          }`}
        >
          <h1 className="text-3xl mb- font-bold text-[#039748]">
            SRO Bearings
          </h1>
          <h2 className="text-sm  mb-5  text-gray-500 uppercase tracking-wider">
            Our Journey
          </h2>
        </div>

        {/* SVG container for all lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1200 600"
        >
          <defs>
            <linearGradient
              id="line-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" style={{ stopColor: "#039748" }} />
              <stop offset="100%" style={{ stopColor: "#039748" }} />
            </linearGradient>
          </defs>

          {/* Main winding path: 1 -> 2 -> 4 -> 5 */}
          <path
            className={`timeline-path ${isVisible ? "animate" : ""}`}
            d="M 1050 400 
               C 1050 200, 800 200, 700 300 
               S 650 450, 600 450
               C 550 450, 450 300, 400 200
               L 300 200
               C 250 200, 200 250, 200 350
             "
            fill="none"
            stroke="url(#line-gradient)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Dotted line to 3 */}
          <path
            d="M 700 300 Q 725 225, 750 150"
            fill="none"
            stroke="#039748"
            strokeWidth="2"
            className={`dotted-line ${isVisible ? "animate delay-3" : ""}`}
          />
        </svg>

        {/* Nodes and Text Blocks
          Positioned absolutely using percentages to be somewhat responsive.
          Each element has a 'fade-in' class and a specific 'delay' class.
          Animation class added only when visible.
        */}

        {/* Point 1 */}
        <div
          className={`absolute z-10 fade-in ${
            isVisible ? "animate delay-1" : ""
          }`}
          style={{
            left: "87.5%",
            top: "66.6%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center bg-[#039748] rounded-full shadow-2xl text-white text-5xl sm:text-6xl font-bold pin-lg border-4 border-white">
            1
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-5 w-64 text-center">
            <h3 className="font-bold text-lg text-[#039748]">
              Driving a Greener Future
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              We blend innovation and sustainability, helping businesses boost
              efficiency while reducing environmental impact and costs.
            </p>
          </div>
        </div>

        {/* Point 2 */}
        <div
          className={`absolute z-10 fade-in ${
            isVisible ? "animate delay-2" : ""
          }`}
          style={{
            left: "50%",
            top: "75%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-[#039748] rounded-full shadow-2xl text-white text-4xl sm:text-5xl font-bold pin-md border-4 border-white">
            2
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 text-center">
            <h3 className="font-bold text-lg text-[#039748]">
              Less friction. More progress.
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              We make some of the world's most innovative products and solutions
              to reduce friction.
            </p>
          </div>
        </div>

        {/* Point 3 */}
        <div
          className={`absolute z-10 fade-in ${
            isVisible ? "animate delay-4" : ""
          }`}
          style={{
            left: "62.5%",
            top: "25%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-[#039748] rounded-full shadow-2xl text-white text-3xl sm:text-4xl font-bold border-4 border-white">
            3
          </div>
          <div className="absolute top-1/2 left-full -translate-y-1/2 ml-6 sm:ml-8 w-56 sm:w-64 text-left">
            <h3 className="font-bold text-lg text-[#039748]">
              Research and technology development
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-semibold">
                Co-innovating tomorrow's technologies.
              </span>
              <br />
              Saving energy by reducing friction is a concrete way towards a
              more sustainable world.
            </p>
          </div>
        </div>

        {/* Point 4 */}
        <div
          className={`absolute z-10 fade-in ${
            isVisible ? "animate delay-5" : ""
          }`}
          style={{
            left: "25%",
            top: "33.3%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-[#039748] rounded-full shadow-2xl text-white text-2xl sm:text-3xl font-bold pin-sm border-4 border-white">
            4
          </div>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-56 sm:w-64 text-center">
            <h3 className="font-bold text-lg text-[#039748]">
              Stratainability
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-semibold">
                We make sustainable movement possible.
              </span>
              <br />
              Wherever there is movement, our products, solutions, and expertise
              can help optimize it.
            </p>
          </div>
        </div>

        {/* Point 5 - Stats Grid */}
        <div
          className={`absolute z-10 fade-in ${
            isVisible ? "animate delay-6" : ""
          }`}
          style={{
            left: "16.6%",
            top: "58.3%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#039748] rounded-full shadow-2xl text-white text-xl sm:text-2xl font-bold pin-sm border-4 border-white">
            5
          </div>
          {/* Stats Grid Container */}
          <div className="absolute  -left-72 inset-0 -translate-y-1/2 ml-6 w-72 sm:w-80 text-left">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {/* Stat 1 */}
              <div className="text-left">
                <span className="text-2xl font-bold text-[#039748]">
                  38 000
                </span>
                <p className="text-xs text-gray-600">Employees</p>
              </div>
              {/* Stat 2 */}
              <div className="text-left">
                <span className="text-2xl font-bold text-[#039748]">130</span>
                <p className="text-xs text-gray-600">Countries</p>
              </div>
              {/* Stat 3 */}
              <div className="text-left">
                <span className="text-2xl font-bold text-[#039748]">71</span>
                <p className="text-xs text-gray-600">Remanufacturing sites</p>
              </div>
              {/* Stat 4 */}
              <div className="text-left">
                <span className="text-2xl font-bold text-[#039748]">
                  &gt; 17 000
                </span>
                <p className="text-xs text-gray-600">Distributors</p>
              </div>
              {/* Stat 5 */}
              <div className="text-left">
                <span className="text-2xl font-bold text-[#039748]">15</span>
                <p className="text-xs text-gray-600">Technology Centres</p>
              </div>
              {/* Stat 6 */}
              <div className="text-left">
                <span className="text-2xl font-bold text-[#039748]">40</span>
                <p className="text-xs text-gray-600">Customer industries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
