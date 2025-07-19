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
      title: "Building Scalable Web Applications with React and Node.js",
      excerpt:
        "Learn how to create robust, scalable web applications using modern JavaScript frameworks and best practices for performance optimization.",
      image: `https://picsum.photos/seed/tech1/400/250`,
      author: "Priya Sharma",
      date: "2025-01-15",
      readTime: "8 min read",
      category: "Technology",
      tags: ["React", "Node.js", "JavaScript"],
    },
    {
      id: 2,
      title: "The Future of AI in Software Development",
      excerpt:
        "Explore how artificial intelligence is revolutionizing the software development process and what it means for developers worldwide.",
      image: `https://picsum.photos/seed/ai1/400/250`,
      author: "Rajesh Kumar",
      date: "2025-01-12",
      readTime: "6 min read",
      category: "AI & Machine Learning",
      tags: ["AI", "Machine Learning", "Future Tech"],
    },
    {
      id: 3,
      title: "Mobile-First Design: Creating Better User Experiences",
      excerpt:
        "Discover the principles of mobile-first design and how to create seamless user experiences across all devices.",
      image: `https://picsum.photos/seed/mobile1/400/250`,
      author: "Sarah Johnson",
      date: "2025-01-10",
      readTime: "5 min read",
      category: "Design",
      tags: ["Mobile Design", "UX", "UI"],
    },
    {
      id: 4,
      title: "Cloud Computing: A Complete Guide for Beginners",
      excerpt:
        "Everything you need to know about cloud computing, from basic concepts to advanced deployment strategies.",
      image: `https://picsum.photos/seed/cloud1/400/250`,
      author: "Michael Chen",
      date: "2025-01-08",
      readTime: "10 min read",
      category: "Cloud Technology",
      tags: ["Cloud", "AWS", "DevOps"],
    },
    {
      id: 5,
      title: "Cybersecurity Best Practices for Small Businesses",
      excerpt:
        "Essential cybersecurity measures every small business should implement to protect their data and customers.",
      image: `https://picsum.photos/seed/security1/400/250`,
      author: "Anita Patel",
      date: "2025-01-05",
      readTime: "7 min read",
      category: "Security",
      tags: ["Cybersecurity", "Business", "Data Protection"],
    },
    {
      id: 6,
      title: "The Rise of Progressive Web Apps (PWAs)",
      excerpt:
        "Learn how PWAs are bridging the gap between web and mobile applications, offering native app-like experiences.",
      image: `https://picsum.photos/seed/pwa1/400/250`,
      author: "David Wilson",
      date: "2025-01-03",
      readTime: "9 min read",
      category: "Web Development",
      tags: ["PWA", "Web Apps", "Mobile"],
    },
    {
      id: 7,
      title: "Data Science and Analytics: Transforming Business Decisions",
      excerpt:
        "How data science is helping businesses make informed decisions and drive growth through actionable insights.",
      image: `https://picsum.photos/seed/data1/400/250`,
      author: "Amit Sharma",
      date: "2025-01-01",
      readTime: "12 min read",
      category: "Data Science",
      tags: ["Data Science", "Analytics", "Business Intelligence"],
    },
    {
      id: 8,
      title: "Blockchain Technology Beyond Cryptocurrency",
      excerpt:
        "Exploring the practical applications of blockchain technology in various industries beyond digital currencies.",
      image: `https://picsum.photos/seed/blockchain1/400/250`,
      author: "Emma Thompson",
      date: "2024-12-28",
      readTime: "11 min read",
      category: "Blockchain",
      tags: ["Blockchain", "Cryptocurrency", "Innovation"],
    },
    {
      id: 9,
      title: "DevOps Culture: Streamlining Development and Operations",
      excerpt:
        "Understanding DevOps methodology and how it can improve collaboration between development and operations teams.",
      image: `https://picsum.photos/seed/devops1/400/250`,
      author: "Vikram Patel",
      date: "2024-12-25",
      readTime: "8 min read",
      category: "DevOps",
      tags: ["DevOps", "Automation", "CI/CD"],
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
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                            <div className="flex items-center text-sm text-gray-500 mb-3">
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
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
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
