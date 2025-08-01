import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const quoteRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const searchRef = useRef(null);

  // Toggle dropdown on click for mobile
  const toggleProductsDropdown = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProductsOpen(false);
      }
      if (quoteRef.current && !quoteRef.current.contains(event.target)) {
        setIsQuoteOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Searching for:", searchQuery);
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <nav
      className={`text-white p-4 shadow-lg sticky top-0 z-50 backdrop-blur-sm transition-colors duration-300 ${
        isScrolled ? "bg-gray-800 bg-opacity-90" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Mobile Hamburger Menu Button (Left) */}
        <button
          className="md:hidden focus:outline-none p-2 rounded-lg hover:bg-gray-700 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Logo (Centered) */}
        <Link href="/" className="flex items-center group mx-auto md:mx-0">
          <div className="relative h-10 w-32 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/srologo2.png"
              alt="SRO Bearings Logo"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 120px, 160px"
            />
          </div>
        </Link>

        {/* Desktop Navigation - Left Side */}
        <ul className="hidden md:flex gap-6 items-center mr-auto ml-6">
          <li className="relative group">
            <Link
              href="/about"
              className="hover:text-green-300 transition-colors duration-300 font-medium py-2 px-1"
            >
              <span className="relative">
                About
                <span className="absolute left-0 bottom-0 h-0.5 bg-green-300 w-0 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          </li>

          <li
            className="relative group"
            ref={dropdownRef}
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <button
              className="hover:text-green-300 transition-colors duration-300 font-medium flex items-center gap-1 py-2 px-1"
              onClick={toggleProductsDropdown}
            >
              <span className="relative">
                Products
                <span className="absolute left-0 bottom-0 h-0.5 bg-green-300 w-0 group-hover:w-full transition-all duration-300"></span>
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isProductsOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isProductsOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-white text-gray-800 rounded-lg shadow-xl py-2 z-20 border border-gray-100 animate-fadeIn">
                <Link
                  href="/products"
                  className="flex items-center px-4 py-3 hover:bg-green-50 transition-colors duration-200 font-semibold text-green-700 border-b border-gray-100"
                  onClick={() => setIsProductsOpen(false)}
                >
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <svg
                      className="w-5 h-5 text-green-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </div>
                  <span>View All Products</span>
                </Link>

                <div className="max-h-96 overflow-y-auto">
                  <Link
                    href="/products/spherical-roller-bearings"
                    className="flex items-start px-4 py-3 hover:bg-green-50 transition-colors duration-200 hover:border-l-4 hover:border-green-500"
                    onClick={() => setIsProductsOpen(false)}
                  >
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <svg
                        className="w-5 h-5 text-green-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium block">
                        Spherical Roller Bearings
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        High radial load capacity
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/products/taper-roller-bearings"
                    className="flex items-start px-4 py-3 hover:bg-green-50 transition-colors duration-200 hover:border-l-4 hover:border-green-500"
                    onClick={() => setIsProductsOpen(false)}
                  >
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <svg
                        className="w-5 h-5 text-green-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium block">
                        Taper Roller Bearings
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Combined load handling
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/products/thrust-bearings"
                    className="flex items-start px-4 py-3 hover:bg-green-50 transition-colors duration-200 hover:border-l-4 hover:border-green-500"
                    onClick={() => setIsProductsOpen(false)}
                  >
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <svg
                        className="w-5 h-5 text-green-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium block">Thrust Bearings</span>
                      <p className="text-xs text-gray-500 mt-1">
                        Axial load solutions
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/products/multi-row-bearings"
                    className="flex items-start px-4 py-3 hover:bg-green-50 transition-colors duration-200 hover:border-l-4 hover:border-green-500"
                    onClick={() => setIsProductsOpen(false)}
                  >
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <svg
                        className="w-5 h-5 text-green-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium block">
                        Multi Row Bearings
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        High capacity solutions
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/products/pillow-block-bearing"
                    className="flex items-start px-4 py-3 hover:bg-green-50 transition-colors duration-200 hover:border-l-4 hover:border-green-500"
                    onClick={() => setIsProductsOpen(false)}
                  >
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <svg
                        className="w-5 h-5 text-green-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium block">
                        Pillow Block Bearings
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Easy mounting units
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/products/plummer-blocks"
                    className="flex items-start px-4 py-3 hover:bg-green-50 transition-colors duration-200 hover:border-l-4 hover:border-green-500"
                    onClick={() => setIsProductsOpen(false)}
                  >
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <svg
                        className="w-5 h-5 text-green-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium block">Plummer Blocks</span>
                      <p className="text-xs text-gray-500 mt-1">
                        Heavy-duty bearing housings
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/products/roller-chains"
                    className="flex items-start px-4 py-3 hover:bg-green-50 transition-colors duration-200 hover:border-l-4 hover:border-green-500"
                    onClick={() => setIsProductsOpen(false)}
                  >
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <svg
                        className="w-5 h-5 text-green-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium block">Roller Chains</span>
                      <p className="text-xs text-gray-500 mt-1">
                        Power transmission solutions
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </li>

          <li className="relative group">
            <Link
              href="/services"
              className="hover:text-green-300 transition-colors duration-300 font-medium py-2 px-1"
            >
              <span className="relative">
                Services
                <span className="absolute left-0 bottom-0 h-0.5 bg-green-300 w-0 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          </li>
        </ul>

        {/* Right Side Icons (Search, Language, Get in Touch) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search Icon with dropdown */}
          <div className="relative" ref={searchRef}>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors group relative"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Search
              </span>
            </button>

            {searchOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-gray-800 rounded-lg shadow-xl py-2 z-20 border border-gray-100 animate-fadeIn">
                <form onSubmit={handleSearchSubmit} className="px-4 py-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <svg
                      className="absolute left-3 top-3 w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <button
                    type="submit"
                    className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
                  >
                    Search
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Language Translator */}
          <div className="relative group">
            <button className="p-2 rounded-full hover:bg-gray-700 transition-colors flex items-center">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
            </button>
            <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Language
            </span>
          </div>

          {/* Get in Touch */}
          <button
            onClick={() => setIsQuoteOpen(true)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors group relative"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Get in Touch
            </span>
          </button>
        </div>

        {/* Mobile Search Icon (Right) */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-700 transition-colors"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="md:hidden px-4 py-2 bg-gray-800">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <svg
              className="absolute left-3 top-3 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className={`md:hidden ${
            isScrolled ? "bg-gray-800" : "bg-gray-900"
          } shadow-lg animate-slideDown rounded-lg mt-2 mx-2 overflow-hidden`}
        >
          <ul className="px-4 py-3 space-y-3">
            <li>
              <Link
                href="/about"
                className="block py-3 px-3 hover:bg-gray-700 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <button
                className="w-full flex justify-between items-center py-3 px-3 hover:bg-gray-700 rounded-lg transition-colors font-medium"
                onClick={toggleProductsDropdown}
              >
                Products
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isProductsOpen && (
                <div className="ml-4 mt-1 space-y-2 bg-gray-700 rounded-lg p-2">
                  <Link
                    href="/products"
                    className="block py-2 px-3 hover:bg-gray-600 rounded-md transition-colors text-lg font-semibold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    View All Products
                  </Link>
                  <Link
                    href="/products/spherical-roller-bearings"
                    className="block py-2 px-3 hover:bg-gray-600 rounded-md transition-colors text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Spherical Roller Bearings
                  </Link>
                  <Link
                    href="/products/taper-roller-bearings"
                    className="block py-2 px-3 hover:bg-gray-600 rounded-md transition-colors text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Taper Roller Bearings
                  </Link>
                  <Link
                    href="/products/thrust-bearings"
                    className="block py-2 px-3 hover:bg-gray-600 rounded-md transition-colors text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Thrust Bearings
                  </Link>
                  <Link
                    href="/products/multi-row-bearings"
                    className="block py-2 px-3 hover:bg-gray-600 rounded-md transition-colors text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Multi Row Bearings
                  </Link>
                  <Link
                    href="/products/pillow-block-bearings"
                    className="block py-2 px-3 hover:bg-gray-600 rounded-md transition-colors text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pillow Block Bearings
                  </Link>
                  <Link
                    href="/products/plummer-blocks"
                    className="block py-2 px-3 hover:bg-gray-600 rounded-md transition-colors text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Plummer Blocks
                  </Link>
                  <Link
                    href="/products/roller-chains"
                    className="block py-2 px-3 hover:bg-gray-600 rounded-md transition-colors text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Roller Chains
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link
                href="/services"
                className="block py-3 px-3 hover:bg-gray-700 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
            </li>
            <li className="pt-2">
              <button
                onClick={() => {
                  setIsQuoteOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2 font-medium justify-center shadow-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Get in Touch
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Quote Popup Modal */}
      {isQuoteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div
            ref={quoteRef}
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 animate-popIn overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Request a Quote
                </h3>
                <p className="text-lg text-gray-500 mt-1">
                  Fill out the form and we'll get back to you within 24 hours
                </p>
              </div>
              <button
                onClick={() => setIsQuoteOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors p-1 rounded-full hover:bg-gray-100"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="product"
                    className="block text-lg font-medium text-gray-700 mb-1"
                  >
                    Product of Interest
                  </label>
                  <select
                    id="product"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select a product</option>
                    <option>Spherical Roller Bearings</option>
                    <option>Taper Roller Bearings</option>
                    <option>Thrust Bearings</option>
                    <option>Multi Row Bearings</option>
                    <option>Pillow Block Bearings</option>
                    <option>Plummer Blocks</option>
                    <option>Roller Chains</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-lg font-medium text-gray-700 mb-1"
                    >
                      Quantity
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Estimated quantity"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-lg font-medium text-gray-700 mb-1"
                    >
                      Your Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="details"
                    className="block text-lg font-medium text-gray-700 mb-1"
                  >
                    Additional Details
                  </label>
                  <textarea
                    id="details"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Specifications, delivery requirements, etc."
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Submit Quote Request
                  </button>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Your information is secure and will never be shared with third
                parties.
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
