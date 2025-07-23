import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const sliderRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Nina Verma",
      position: "Chief Strategy Officer",
      location: "Delhi, India",
      image: `https://picsum.photos/seed/person1/150/150`,
      rating: 5,
      text: "Their commitment to innovation and quality completely transformed our digital infrastructure. A truly reliable partner for long-term growth.",
      company: "FutureCore Solutions",
    },
    {
      id: 2,
      name: "Tom Nguyen",
      position: "VP of Engineering",
      location: "San Francisco, USA",
      image: `https://picsum.photos/seed/person2/150/150`,
      rating: 5,
      text: "From day one, their team brought strategic clarity and technical depth. The result? A seamless platform our users love.",
      company: "BridgeTech Inc.",
    },
    {
      id: 3,
      name: "Lara Mahmoud",
      position: "Head of Innovation",
      location: "Dubai, UAE",
      image: `https://picsum.photos/seed/person3/150/150`,
      rating: 5,
      text: "Highly agile and responsive—exactly what we needed for our fast-paced product cycle. The results spoke volumes.",
      company: "Nexgen Industries",
    },
    {
      id: 4,
      name: "Carlos Rivera",
      position: "Founder & CEO",
      location: "Barcelona, Spain",
      image: `https://picsum.photos/seed/person4/150/150`,
      rating: 5,
      text: "A collaborative team that genuinely cares about outcomes. They delivered on every promise and more.",
      company: "SmartFlow Systems",
    },
    {
      id: 5,
      name: "Tanvi Desai",
      position: "Director of Operations",
      location: "Ahmedabad, India",
      image: `https://picsum.photos/seed/person5/150/150`,
      rating: 5,
      text: "Their technical acumen and proactive communication made the entire process incredibly smooth and transparent.",
      company: "LogixEdge Pvt. Ltd.",
    },
    {
      id: 6,
      name: "James Carter",
      position: "Digital Transformation Lead",
      location: "London, UK",
      image: `https://picsum.photos/seed/person6/150/150`,
      rating: 5,
      text: "Top-tier execution and strategic thinking. They've become an integral part of our digital roadmap.",
      company: "NovaStack Digital",
    },
    {
      id: 7,
      name: "Mei Ling",
      position: "Innovation Manager",
      location: "Singapore",
      image: `https://picsum.photos/seed/person7/150/150`,
      rating: 5,
      text: "Their ability to adapt and deliver under tight timelines is unmatched. A forward-thinking and dependable team.",
      company: "TechElevate",
    },
    {
      id: 8,
      name: "Liam O'Connor",
      position: "Head of Product",
      location: "Dublin, Ireland",
      image: `https://picsum.photos/seed/person8/150/150`,
      rating: 5,
      text: "Their expertise helped us unlock new capabilities. Every milestone was met with precision and creativity.",
      company: "BrightWare Labs",
    },
    {
      id: 9,
      name: "Anjali Mehta",
      position: "Startup Co-Founder",
      location: "Bengaluru, India",
      image: `https://picsum.photos/seed/person9/150/150`,
      rating: 5,
      text: "Their fresh perspective and customer-first mindset gave our product a distinct edge in a competitive market.",
      company: "SparkEdge Technologies",
    },
  ];

  // Handle responsive layout
  useEffect(() => {
    const updateCardsPerSlide = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerSlide(1); // Mobile: 1 card
      } else if (width < 1024) {
        setCardsPerSlide(2); // Tablet: 2 cards
      } else {
        setCardsPerSlide(3); // Desktop: 3 cards
      }
      setCurrentIndex(0); // Reset to first slide
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / cardsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex, cardsPerSlide]);

  // Touch/swipe handling
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches ? e.touches[0].clientX : e.clientX);
    setCurrentTranslate(0);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = startX - currentX;
    setCurrentTranslate(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (currentTranslate > 50) {
      nextSlide();
    } else if (currentTranslate < -50) {
      prevSlide();
    }

    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * cardsPerSlide,
    currentIndex * cardsPerSlide + cardsPerSlide
  );

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by businesses worldwide - from startups to enterprises
          </p>
          <div className="mt-8 h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full"></div>
        </div>

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial cards */}
          <div
            ref={sliderRef}
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
          >
            <div
              className={`grid grid-cols-1 ${
                cardsPerSlide >= 2 ? "sm:grid-cols-2" : ""
              } ${
                cardsPerSlide >= 3 ? "lg:grid-cols-3" : ""
              } gap-8 transition-transform duration-300`}
              style={{
                transform: isDragging
                  ? `translateX(-${currentTranslate}px)`
                  : "none",
              }}
            >
              {visibleTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-green-200 relative group"
                >
                  <div className="absolute top-4 right-4 text-green-500 opacity-20 group-hover:opacity-30 transition-opacity">
                    <Quote className="w-8 h-8" />
                  </div>
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full border-3 border-green-500 object-cover mr-4"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-green-600 font-medium text-lg">
                        {testimonial.position}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-lg text-gray-600 font-medium">
                      {testimonial.company}
                    </p>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-500 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-green-500 w-8"
                  : "bg-gray-300 hover:bg-gray-400 w-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
