import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  ArrowRight,
  User,
  Tag,
} from "lucide-react";

const Blogs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const blogs = [
    {
      id: 1,
      title: "Over Four Decades of Excellence in Bearings Industry",
      excerpt:
        "With over four decades of expertise in the bearings industry, we take immense pride in serving as a reliable partner to industries worldwide. Our commitment to excellence has built a robust market reputation, and we are delighted to connect with you on LinkedIn.",
      image: `https://picsum.photos/seed/industry1/400/250`,
      author: "SRO Bearings",
      date: "2025-01-15",
      readTime: "3 min read",
      category: "Industry Insights",
      tags: ["Bearings", "Manufacturing", "Industrial Solutions"],
    },
    {
      id: 2,
      title: "High-Performance Bearings at Competitive Prices",
      excerpt:
        "At SRO, we focus on delivering top-notch quality bearings meticulously crafted to meet stringent industry standards — all at incredibly competitive prices, making us the preferred choice for countless businesses.",
      image: `https://picsum.photos/seed/industry2/400/250`,
      author: "SRO Bearings",
      date: "2025-01-12",
      readTime: "3 min read",
      category: "Product Highlights",
      tags: ["Quality Bearings", "Competitive Pricing", "Trusted Brand"],
    },
    {
      id: 3,
      title: "Why Industries Trust SRO for Seamless Operations",
      excerpt:
        "Understanding the critical role bearings play in ensuring seamless operations, we are dedicated to providing reliable products that support uninterrupted industrial processes across multiple sectors.",
      image: `https://picsum.photos/seed/industry3/400/250`,
      author: "SRO Bearings",
      date: "2025-01-10",
      readTime: "3 min read",
      category: "Industrial Applications",
      tags: ["Seamless Operations", "Trusted Partner", "Industrial Bearings"],
    },
    {
      id: 4,
      title: "Connecting with Global Industries on LinkedIn",
      excerpt:
        "We are excited to expand our reach and connect with industry professionals on LinkedIn, sharing insights, innovations, and our legacy of excellence in the bearings market.",
      image: `https://picsum.photos/seed/industry4/400/250`,
      author: "SRO Bearings",
      date: "2025-01-08",
      readTime: "2 min read",
      category: "Company Updates",
      tags: ["LinkedIn", "Global Outreach", "SRO Bearings"],
    },
    {
      id: 5,
      title: "Serving Diverse Sectors with Tailored Bearing Solutions",
      excerpt:
        "Our vast customer base spans sectors like Steel, Stone Crushers, Cement, Paper Mills, Sugar Mills, Automotive, Electric Motors, and more — showcasing our versatility in the bearings industry.",
      image: `https://picsum.photos/seed/industry5/400/250`,
      author: "SRO Bearings",
      date: "2025-01-05",
      readTime: "3 min read",
      category: "Sector Focus",
      tags: ["Steel", "Automotive", "Industrial Sectors"],
    },
    {
      id: 6,
      title: "SRO: Your Go-To Source for Bearing Needs",
      excerpt:
        "We take pride in being the trusted source for industries of all sizes, fulfilling their bearing consumption needs with superior products and dedicated service.",
      image: `https://picsum.photos/seed/industry6/400/250`,
      author: "SRO Bearings",
      date: "2025-01-03",
      readTime: "3 min read",
      category: "Customer Stories",
      tags: ["Bearing Needs", "Reliable Source", "Customer Trust"],
    },
    {
      id: 7,
      title: "Decades of Experience, Unmatched Customer Satisfaction",
      excerpt:
        "Our extensive experience in the bearings industry has allowed us to cultivate a loyal customer base across diverse industries, thanks to our commitment to quality and customer satisfaction.",
      image: `https://picsum.photos/seed/industry7/400/250`,
      author: "SRO Bearings",
      date: "2025-01-01",
      readTime: "3 min read",
      category: "Customer Success",
      tags: ["Customer Satisfaction", "Industry Experience", "Trusted Brand"],
    },
    {
      id: 8,
      title: "SRO Bearings — Delivering Value Across Industries",
      excerpt:
        "From competitive pricing to exceptional quality, SRO Bearings continues to deliver unmatched value, becoming a trusted name for businesses worldwide in the bearings space.",
      image: `https://picsum.photos/seed/industry8/400/250`,
      author: "SRO Bearings",
      date: "2024-12-28",
      readTime: "3 min read",
      category: "Brand Value",
      tags: ["Value", "Global Business", "Industrial Partner"],
    },
    {
      id: 9,
      title: "A Legacy of Trust — SRO Bearings' Journey",
      excerpt:
        "For over four decades, SRO Bearings has maintained its legacy of trust by consistently providing high-performance bearings that empower industries globally.",
      image: `https://picsum.photos/seed/industry9/400/250`,
      author: "SRO Bearings",
      date: "2024-12-25",
      readTime: "3 min read",
      category: "Our Story",
      tags: ["Legacy", "Trust", "Industrial Excellence"],
    },
  ];

  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(blogs.length / cardsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, currentIndex]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Technology: "bg-blue-100 text-blue-800",
      "AI & Machine Learning": "bg-purple-100 text-purple-800",
      Design: "bg-pink-100 text-pink-800",
      "Cloud Technology": "bg-indigo-100 text-indigo-800",
      Security: "bg-red-100 text-red-800",
      "Web Development": "bg-green-100 text-green-800",
      "Data Science": "bg-yellow-100 text-yellow-800",
      Blockchain: "bg-orange-100 text-orange-800",
      DevOps: "bg-gray-100 text-gray-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest Insights & Articles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and insights from our
            expert team
          </p>
          <div className="mt-8 h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full"></div>
        </div>

        {/* Blog Cards Slider */}
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
                    {blogs
                      .slice(
                        slideIndex * cardsPerSlide,
                        (slideIndex + 1) * cardsPerSlide
                      )
                      .map((blog) => (
                        <article
                          key={blog.id}
                          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 group cursor-pointer"
                        >
                          {/* Blog Image */}
                          <div className="relative overflow-hidden">
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-4 left-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                                  blog.category
                                )}`}
                              >
                                {blog.category}
                              </span>
                            </div>
                          </div>

                          {/* Blog Content */}
                          <div className="p-6">
                            {/* Meta Info */}
                            <div className="flex items-center text-lg text-gray-500 mb-3">
                              <User className="w-4 h-4 mr-1" />
                              <span className="mr-4">{blog.author}</span>
                              <Calendar className="w-4 h-4 mr-1" />
                              <span className="mr-4">
                                {formatDate(blog.date)}
                              </span>
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{blog.readTime}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                              {blog.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-gray-600 mb-4 line-clamp-3">
                              {blog.excerpt}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {blog.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                >
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Read More Button */}
                            <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                              <span className="mr-2">Read More</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>

                          {/* Hover Effect Border */}
                          <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-500 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                        </article>
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

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
