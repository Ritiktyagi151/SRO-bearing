import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      position: "CEO, TechVision India",
      location: "Mumbai, India",
      image: `https://picsum.photos/seed/${Math.random()}/150/150`,
      rating: 5,
      text: "Working with this team has been an absolute game-changer for our business. Their attention to detail and innovative solutions exceeded our expectations.",
      company: "TechVision India",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Marketing Director",
      location: "New York, USA",
      image: `https://picsum.photos/seed/${Math.random()}/150/150`,
      rating: 5,
      text: "The level of professionalism and expertise demonstrated throughout our collaboration was remarkable. They transformed our vision into reality.",
      company: "Digital Marketing Pro",
    },
    {
      id: 3,
      name: "Priya Sharma",
      position: "Founder & CTO",
      location: "Bangalore, India",
      image: `https://picsum.photos/seed/${Math.random()}/150/150`,
      rating: 5,
      text: "Exceptional service and outstanding results! The team's technical expertise and problem-solving skills helped us overcome complex challenges.",
      company: "InnovateTech Solutions",
    },
    {
      id: 4,
      name: "Michael Chen",
      position: "Product Manager",
      location: "Singapore",
      image: `https://picsum.photos/seed/${Math.random()}/150/150`,
      rating: 5,
      text: "From concept to execution, everything was handled with utmost professionalism. The quality of work and timely delivery made this collaboration seamless.",
      company: "Asian Tech Hub",
    },
    {
      id: 5,
      name: "Anita Patel",
      position: "Operations Head",
      location: "Delhi, India",
      image: `https://picsum.photos/seed/${Math.random()}/150/150`,
      rating: 5,
      text: "The team's dedication and innovative approach transformed our business processes. Their solutions are not only effective but also scalable.",
      company: "Global Enterprises",
    },
    {
      id: 6,
      name: "David Wilson",
      position: "Startup Founder",
      location: "London, UK",
      image: `https://picsum.photos/seed/${Math.random()}/150/150`,
      rating: 5,
      text: "Outstanding work quality and excellent communication throughout the project. They understood our requirements perfectly and delivered beyond expectations.",
      company: "NextGen Startups",
    },
    {
      id: 7,
      name: "Amit Sharma",
      position: "Tech Lead",
      location: "Pune, India",
      image: `https://picsum.photos/seed/${Math.random()}/150/150`,
      rating: 5,
      text: "Incredible attention to detail and innovative solutions. The team delivered exactly what we needed, on time and within budget.",
      company: "Innovation Labs",
    },
    {
      id: 8,
      name: "Emma Thompson",
      position: "Project Manager",
      location: "Toronto, Canada",
      image: `https://picsum.photos/seed/${Math.random()}/150/150`,
      rating: 5,
      text: "Professional, reliable, and creative. Working with this team has been one of the best decisions we've made for our project.",
      company: "Digital Solutions Inc",
    },
    {
      id: 9,
      name: "Vikram Patel",
      position: "Startup Founder",
      location: "Chennai, India",
      image: `https://picsum.photos/seed/${Math.random()}/150/150`,
      rating: 5,
      text: "The expertise and dedication shown by the team helped us launch our product successfully. Highly recommended for any tech project.",
      company: "StartupTech",
    },
  ];

  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / cardsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(nextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, currentIndex]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const getCurrentSlideTestimonials = () => {
    const startIndex = currentIndex * cardsPerSlide;
    return testimonials.slice(startIndex, startIndex + cardsPerSlide);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted by businesses worldwide - from startups to enterprises
          </p>
          <div className="mt-8 h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full"></div>
        </div>

        {/* Testimonial Cards Slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl z-10 border border-gray-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl z-10 border border-gray-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
                    {testimonials
                      .slice(
                        slideIndex * cardsPerSlide,
                        (slideIndex + 1) * cardsPerSlide
                      )
                      .map((testimonial) => (
                        <div
                          key={testimonial.id}
                          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-green-200 relative group"
                        >
                          {/* Quote Icon */}
                          <div className="absolute top-4 right-4 text-green-500 opacity-20 group-hover:opacity-30 transition-opacity">
                            <Quote className="w-8 h-8" />
                          </div>

                          {/* Profile Section */}
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
                              <p className="text-green-600 font-medium text-sm">
                                {testimonial.position}
                              </p>
                              <p className="text-gray-500 text-xs">
                                {testimonial.location}
                              </p>
                            </div>
                          </div>

                          {/* Rating */}
                          <div className="flex mb-4">
                            {renderStars(testimonial.rating)}
                          </div>

                          {/* Testimonial Text */}
                          <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                            "{testimonial.text}"
                          </blockquote>

                          {/* Company */}
                          <div className="border-t border-gray-200 pt-4">
                            <p className="text-sm text-gray-600 font-medium">
                              {testimonial.company}
                            </p>
                          </div>

                          {/* Hover Effect Border */}
                          <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-500 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-green-500 w-8"
                  : "bg-gray-300 hover:bg-gray-400 w-3"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
