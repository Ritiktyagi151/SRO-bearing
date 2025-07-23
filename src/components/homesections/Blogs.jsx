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
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

  const blogs = [
    {
      id: 1,
      title: "Engineering Reliability: The Core of Our Bearing Solutions",
      excerpt:
        "Discover how SRO Bearings designs reliability into every product — ensuring long-lasting performance for critical industrial applications.",
      image: `https://picsum.photos/seed/reliability1/400/250`,
      author: "SRO Bearings",
      date: "2025-07-01",
      readTime: "3 min read",
      category: "Product Engineering",
      tags: ["Reliability", "Engineering", "Industrial Bearings"],
    },
    {
      id: 2,
      title: "Supplying the World: How SRO Bearings Serves Global Markets",
      excerpt:
        "With a robust supply chain and strong distribution network, SRO Bearings proudly serves industries across 30+ countries.",
      image: `https://picsum.photos/seed/global2/400/250`,
      author: "SRO Bearings",
      date: "2025-06-25",
      readTime: "3 min read",
      category: "Global Outreach",
      tags: ["International Trade", "Logistics", "Global Presence"],
    },
    {
      id: 3,
      title: "How Quality Bearings Reduce Downtime and Save Costs",
      excerpt:
        "Unplanned breakdowns cost industries millions. Learn how our precision bearings enhance uptime and boost operational efficiency.",
      image: `https://picsum.photos/seed/uptime3/400/250`,
      author: "SRO Bearings",
      date: "2025-06-20",
      readTime: "3 min read",
      category: "Cost Efficiency",
      tags: ["Downtime Reduction", "ROI", "Performance"],
    },
    {
      id: 4,
      title: "Smart Selection: Choosing the Right Bearings for Your Industry",
      excerpt:
        "Not all bearings are created equal. This guide walks you through selecting the best-fit bearing types based on your sector and application.",
      image: `https://picsum.photos/seed/selection4/400/250`,
      author: "SRO Bearings",
      date: "2025-06-15",
      readTime: "4 min read",
      category: "Application Guide",
      tags: ["Bearing Types", "Selection Guide", "Industry Fit"],
    },
    {
      id: 5,
      title: "Inside SRO: What Drives Our Commitment to Excellence",
      excerpt:
        "Go behind the scenes to understand the values, technology, and expertise that drive SRO Bearings’ mission to serve global industries.",
      image: `https://picsum.photos/seed/company5/400/250`,
      author: "SRO Bearings",
      date: "2025-06-10",
      readTime: "3 min read",
      category: "Company Culture",
      tags: ["SRO Bearings", "Our Mission", "Excellence"],
    },
    {
      id: 6,
      title: "The Role of Bearings in the Future of Green Manufacturing",
      excerpt:
        "As industries adopt greener practices, discover how SRO Bearings supports sustainable operations through efficiency-driven components.",
      image: `https://picsum.photos/seed/green6/400/250`,
      author: "SRO Bearings",
      date: "2025-06-05",
      readTime: "3 min read",
      category: "Sustainability",
      tags: ["Green Industry", "Sustainability", "Efficiency"],
    },
    {
      id: 7,
      title: "Precision Matters: The Science Behind Our Bearings",
      excerpt:
        "Learn about the cutting-edge engineering and quality assurance practices that ensure every SRO bearing performs with precision.",
      image: `https://picsum.photos/seed/precision7/400/250`,
      author: "SRO Bearings",
      date: "2025-06-01",
      readTime: "3 min read",
      category: "R&D Focus",
      tags: ["Precision", "Engineering", "Testing"],
    },
    {
      id: 8,
      title: "Industries We Power: A Look at Our Diverse Applications",
      excerpt:
        "From steel plants to renewable energy, explore how our bearing solutions support critical functions across varied industrial ecosystems.",
      image: `https://picsum.photos/seed/industries8/400/250`,
      author: "SRO Bearings",
      date: "2025-05-25",
      readTime: "3 min read",
      category: "Client Industries",
      tags: ["Steel", "Energy", "Heavy Machinery"],
    },
    {
      id: 9,
      title: "Partnering for Progress: Collaborating with OEMs Worldwide",
      excerpt:
        "We work closely with Original Equipment Manufacturers to develop and deliver bearings that meet their precise technical requirements.",
      image: `https://picsum.photos/seed/oem9/400/250`,
      author: "SRO Bearings",
      date: "2025-05-20",
      readTime: "3 min read",
      category: "OEM Partnerships",
      tags: ["OEMs", "Collaboration", "Engineering Services"],
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerSlide(2);
      } else {
        setCardsPerSlide(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  }, [isAutoPlaying, currentIndex, cardsPerSlide]);

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

          {/* Carousel Content */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div
                    className={`grid gap-8 px-4 ${
                      cardsPerSlide === 1
                        ? "grid-cols-1"
                        : cardsPerSlide === 2
                        ? "grid-cols-1 sm:grid-cols-2"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    }`}
                  >
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

                          <div className="p-6">
                            <div className="flex items-center text-sm text-gray-500 mb-3 flex-wrap gap-x-3 gap-y-1">
                              <span className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {blog.author}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(blog.date)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {blog.readTime}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                              {blog.title}
                            </h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                              {blog.excerpt}
                            </p>
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
                            <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                              <span className="mr-2">Read More</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                          <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-500 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                        </article>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
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

export default Blogs;
