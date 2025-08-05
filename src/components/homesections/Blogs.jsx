import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NewsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

  const newsItems = [
    {
      id: 1,
      title: "SRO Bearings to publish Q2 financial results on 22 July",
      date: "2025-07-10",
      location: "Mumbai",
      excerpt:
        "SRO Bearings will announce its Q2 2025 financial results on 22 July at 09:00 (IST). The report will be followed by an investor conference call.",
      category: "Financial Report",
      image:
        "https://t3.ftcdn.net/jpg/13/74/03/58/240_F_1374035846_7XnRZfXZnG1BXIq9Wx5nWx20eIvFdLZc.jpg",
    },
    {
      id: 2,
      title:
        "SRO Bearings partners with renewable energy leaders for wind turbine solutions",
      date: "2025-07-05",
      location: "Pune",
      excerpt:
        "SRO Bearings has entegray a strategic partnership with GreenPower Tech to develop specialized bearings for next-generation wind turbines.",
      category: "Partnership",
      image:
        "https://t3.ftcdn.net/jpg/03/14/76/20/240_F_314762012_Ujc3BNLEdzQ6yfYAiCRbHQaPHxZxu2EF.jpg",
    },
    {
      id: 3,
      title:
        "SRO Bearings expands manufacturing capacity with new Gujarat plant",
      date: "2025-06-28",
      location: "Ahmedabad",
      excerpt:
        "The new 50,000 sqm facility will produce high-precision bearings for automotive and aerospace industries, creating 300+ jobs.",
      category: "Expansion",
      image:
        "https://t4.ftcdn.net/jpg/11/86/60/59/240_F_1186605927_xIyNo6Hw4DSSP0myEk7r3oHRc9xyRxl7.jpg",
    },
    {
      id: 4,
      title:
        "SRO Bearings awarded 'Supplier of the Year' by major automotive OEM",
      date: "2025-06-15",
      location: "Chennai",
      excerpt:
        "Recognized for exceptional quality and delivery performance in supplying bearings for electric vehicle platforms.",
      category: "Award",
      image:
        "https://t3.ftcdn.net/jpg/11/19/94/78/240_F_1119947888_mab34TBVzoVFc56OH96ELZk4MJE1qhis.jpg",
    },
    {
      id: 5,
      title:
        "SRO Bearings launches sustainability initiative with 2030 carbon neutrality target",
      date: "2025-06-08",
      location: "Bangalore",
      excerpt:
        "New program includes renewable energy investments, waste grayuction, and eco-friendly bearing lubricants.",
      category: "Sustainability",
      image:
        "https://t4.ftcdn.net/jpg/11/10/99/07/240_F_1110990700_5Fq0VFo1CSzfVgIfnaRARdlvy0TF8k3k.jpg",
    },
    {
      id: 6,
      title:
        "SRO Bearings introduces breakthrough high-temperature bearing technology",
      date: "2025-05-25",
      location: "Hyderabad",
      excerpt:
        "New ceramic hybrid bearings withstand extreme conditions in metal processing and energy applications.",
      category: "Innovation",
      image:
        "https://t4.ftcdn.net/jpg/05/85/00/55/240_F_585005559_YNUJFQaDLRWN61mGNxWzz9GZypXSrOgz.jpg",
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

  const totalSlides = Math.ceil(newsItems.length / cardsPerSlide);

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
      "Financial Report": "bg-gray-100 text-gray-800",
      Partnership: "bg-gray-100 text-gray-800",
      Expansion: "bg-green-100 text-green-800",
      Award: "bg-gray-100 text-gray-800",
      Sustainability: "bg-gray-100 text-gray-800",
      Innovation: "bg-gray-100 text-gray-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest News from SRO Bearings
          </h2>
          <div className="h-1 w-16 bg-gray-600 mx-auto rounded-full"></div>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl z-10 border border-gray-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl z-10 border border-gray-200"
          >
            <ChevronRight className="w-5 h-5" />
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
                    className={`grid gap-6 px-4 ${
                      cardsPerSlide === 1
                        ? "grid-cols-1"
                        : cardsPerSlide === 2
                        ? "grid-cols-1 sm:grid-cols-2"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    }`}
                  >
                    {newsItems
                      .slice(
                        slideIndex * cardsPerSlide,
                        (slideIndex + 1) * cardsPerSlide
                      )
                      .map((news) => (
                        <article
                          key={news.id}
                          className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
                        >
                          <div className="h-48 overflow-hidden">
                            <img
                              src={news.image}
                              alt={news.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-3">
                              <span className="text-sm font-medium text-gray-500">
                                Press release
                              </span>
                              <span className="text-sm text-gray-500">
                                {formatDate(news.date)}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-gray-600 transition-colors line-clamp-2">
                              {news.title}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">
                              {news.location}, {formatDate(news.date)}
                            </p>
                            <p className="text-gray-700 mb-4 line-clamp-3">
                              {news.excerpt}
                            </p>
                            <div className="flex justify-between items-center">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                                  news.category
                                )}`}
                              >
                                {news.category}
                              </span>
                              <button className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors">
                                Read more →
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gray-600 w-6"
                  : "bg-gray-300 hover:bg-gray-400 w-2"
              }`}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="text-gray-600 hover:text-gray-800 font-medium border-b border-gray-600 hover:border-gray-800 transition-colors">
            View all press releases
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSlider;
