import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const quoteRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const searchRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProductsOpen(false);
      }
      if (quoteRef.current && !quoteRef.current.contains(event.target)) {
        setIsQuoteOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProductsDropdown = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Implement actual search functionality here
    }
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-white to-green-950 text-white shadow-md backdrop-blur-md bg-opacity-95"
          : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4 py-4 px-6">
        {/* Logo and Mobile Menu Button */}
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center group">
            <div className="relative h-14 w-32 mr-2 transition-transform duration-300 group-hover:scale-110">
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

          <button
            className="md:hidden p-2 rounded-full hover:bg-green-600 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
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
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6 items-center">
            {/* Home */}
            <li className="relative group">
              <Link
                href="/"
                className={`relative text-lg font-semibold uppercase tracking-wide ${
                  isScrolled ? "text-green-800" : "text-white"
                } hover:text-green-100 transition-colors duration-300 py-2`}
              >
                Home
                <span className="absolute left-0 bottom-0 h-0.5 bg-green-300 w-0 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>

            {/* About */}
            <li className="relative group">
              <Link
                href="/about"
                className={`relative text-lg font-semibold uppercase tracking-wide ${
                  isScrolled ? "text-green-800" : "text-white"
                } hover:text-green-100 transition-colors duration-300 py-2`}
              >
                About
                <span className="absolute left-0 bottom-0 h-0.5 bg-green-300 w-0 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>

            {/* Products Dropdown */}
            <li
              className="relative group"
              ref={dropdownRef}
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button
                className={`relative text-lg font-semibold uppercase tracking-wide ${
                  isScrolled ? "text-green-800" : "text-white"
                } hover:text-green-100 transition-colors duration-300 flex items-center gap-1 py-2`}
                onClick={toggleProductsDropdown}
                aria-expanded={isProductsOpen}
              >
                Products
                <span className="absolute left-0 bottom-0 h-0.5 bg-green-300 w-0 group-hover:w-full transition-all duration-300"></span>
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
                <div className="absolute left-0 mt-2 w-72 bg-white text-gray-800 rounded-md shadow-lg py-2 z-20 border border-gray-200 animate-slideIn">
                  <Link
                    href="/products"
                    className="flex items-center px-4 py-2 hover:bg-green-50 transition-colors duration-200 font-medium text-green-700 border-b border-gray-100"
                    onClick={() => setIsProductsOpen(false)}
                  >
                    <div className="bg-green-100 p-1.5 rounded-md mr-2">
                      <svg
                        className="w-4 h-4 text-green-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                    </div>
                    View All Products
                  </Link>

                  <div className="max-h-80 overflow-y-auto">
                    {[
                      {
                        href: "/products/spherical-roller-bearings",
                        label: "Spherical Roller Bearings",
                        desc: "High radial load capacity",
                        icon: (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                          />
                        ),
                      },
                      {
                        href: "/products/taper-roller-bearings",
                        label: "Taper Roller Bearings",
                        desc: "Combined load handling",
                        icon: (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        ),
                      },
                      {
                        href: "/products/thrust-bearings",
                        label: "Thrust Bearings",
                        desc: "Axial load solutions",
                        icon: (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        ),
                      },
                      {
                        href: "/products/multi-row-bearings",
                        label: "Multi Row Bearings",
                        desc: "High capacity solutions",
                        icon: (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                          />
                        ),
                      },
                      {
                        href: "/products/pillow-block-bearing",
                        label: "Pillow Block Bearings",
                        desc: "Easy mounting units",
                        icon: (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                          />
                        ),
                      },
                      {
                        href: "/products/plummer-blocks",
                        label: "Plummer Blocks",
                        desc: "Heavy-duty bearing housings",
                        icon: (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                          />
                        ),
                      },
                      {
                        href: "/products/roller-chains",
                        label: "Roller Chains",
                        desc: "Power transmission solutions",
                        icon: (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        ),
                      },
                    ].map((product) => (
                      <Link
                        key={product.href}
                        href={product.href}
                        className="flex items-start px-4 py-2 hover:bg-green-50 transition-colors duration-200 hover:border-l-2 hover:border-green-500"
                        onClick={() => setIsProductsOpen(false)}
                      >
                        <div className="bg-green-100 p-1.5 rounded-md mr-2">
                          <svg
                            className="w-4 h-4 text-green-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            {product.icon}
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium block">
                            {product.label}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            {product.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {/* Industries */}
            <li className="relative group">
              <Link
                href="/industries"
                className={`relative text-lg font-semibold uppercase tracking-wide ${
                  isScrolled ? "text-green-800" : "text-white"
                } hover:text-green-100 transition-colors duration-300 py-2`}
              >
                Industries
                <span className="absolute left-0 bottom-0 h-0.5 bg-green-300 w-0 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>

            {/* Gallery */}
            <li className="relative group">
              <Link
                href="/gallery"
                className={`relative text-lg font-semibold uppercase tracking-wide ${
                  isScrolled ? "text-green-800" : "text-white"
                } hover:text-green-100 transition-colors duration-300 py-2`}
              >
                Gallery
                <span className="absolute left-0 bottom-0 h-0.5 bg-green-300 w-0 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>

            {/* Blogs */}
            <li className="relative group">
              <Link
                href="/blogs"
                className={`relative text-lg font-semibold uppercase tracking-wide ${
                  isScrolled ? "text-green-800" : "text-white"
                } hover:text-green-100 transition-colors duration-300 py-2`}
              >
                Blogs
                <span className="absolute left-0 bottom-0 h-0.5 bg-green-300 w-0 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>

            {/* Contact */}
            <li className="relative group">
              <Link
                href="/contact"
                className={`relative text-lg font-semibold uppercase tracking-wide ${
                  isScrolled ? "text-green-800" : "text-white"
                } hover:text-green-100 transition-colors duration-300 py-2`}
              >
                Contact
                <span className="absolute left-0 bottom-0 h-0.5 bg-green-300 w-0 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          </ul>

          {/* Search and Quote Button */}
          <div ref={searchRef} className="relative">
            <button
              onClick={toggleSearch}
              className={`p-2 rounded-full ${
                isScrolled ? "text-green-800" : "text-white"
              } hover:bg-white transition-colors duration-200`}
              aria-label="Search"
            >
              <svg
                className="w-5 h-5 text-green-400"
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
            {isSearchOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-600 rounded-md shadow-lg z-20 animate-searchSlide">
                <form onSubmit={handleSearch} className="flex items-center p-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-3 py-2 text-lg text-gray-800 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="submit"
                    className="ml-2 p-2 text-green-500 hover:text-green-800"
                    aria-label="Submit search"
                  >
                    <svg
                      className="w-4 h-4"
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
                </form>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsQuoteOpen(true)}
            className={`${
              isScrolled ? "bg-green text-gray-300" : "bg-white text-green-800"
            } hover:bg-gray-500 px-4 py-2 rounded-full font-medium transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2 border ${
              isScrolled ? "border-gray-200" : "border-white"
            } hover:border-gray-300`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            Get a Quote
          </button>
        </div>

        {/* Social Icons - Only Facebook and LinkedIn */}
        <div className="hidden md:flex gap-4 items-center justify-end">
          <a
            href="https://www.facebook.com/people/SRO-Bearings/61578079778501/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-100 transition-colors duration-200"
            aria-label="Facebook"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/srobharat/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-100 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-green-800 rounded-md shadow-lg mt-3 mx-2 p-4 animate-slideDown"
        >
          <div ref={searchRef} className="relative mb-4">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-green-600 transition-colors duration-200"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5 text-white"
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
            {isSearchOpen && (
              <div className="mt-2 w-full bg-white rounded-md shadow-lg animate-searchSlide">
                <form onSubmit={handleSearch} className="flex items-center p-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-3 py-2 text-lg text-gray-800 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="submit"
                    className="ml-2 p-2 text-green-700 hover:text-green-800"
                    aria-label="Submit search"
                  >
                    <svg
                      className="w-4 h-4"
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
                </form>
              </div>
            )}
          </div>

          <ul className="space-y-2">
            {/* Home */}
            <li>
              <Link
                href="/"
                className="block py-2 px-3 hover:bg-green-700 rounded-md transition-colors font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>

            {/* About */}
            <li>
              <Link
                href="/about"
                className="block py-2 px-3 hover:bg-green-700 rounded-md transition-colors font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>

            {/* Products Dropdown */}
            <li>
              <button
                className="w-full flex justify-between items-center py-2 px-3 hover:bg-green-700 rounded-md transition-colors font-medium text-lg"
                onClick={toggleProductsDropdown}
                aria-expanded={isProductsOpen}
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
                <div className="ml-4 mt-1 space-y-1 bg-green-900 rounded-md p-2">
                  <Link
                    href="/products"
                    className="block py-2 px-3 font-semibold bg-green-800 text-white rounded-md transition-colors text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    View All Products
                  </Link>
                  <Link
                    href="/products/spherical-roller-bearings"
                    className="block py-2 px-3 hover:bg-green-800 rounded-md transition-colors text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Spherical Roller Bearings
                  </Link>
                  <Link
                    href="/products/taper-roller-bearings"
                    className="block py-2 px-3 hover:bg-green-800 rounded-md transition-colors text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Taper Roller Bearings
                  </Link>
                  <Link
                    href="/products/thrust-bearings"
                    className="block py-2 px-3 hover:bg-green-800 rounded-md transition-colors text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Thrust Bearings
                  </Link>
                  <Link
                    href="/products/multi-row-bearings"
                    className="block py-2 px-3 hover:bg-green-800 rounded-md transition-colors text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Multi Row Bearings
                  </Link>
                  <Link
                    href="/products/pillow-block-bearings"
                    className="block py-2 px-3 hover:bg-green-800 rounded-md transition-colors text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pillow Block Bearings
                  </Link>
                  <Link
                    href="/products/plummer-blocks"
                    className="block py-2 px-3 hover:bg-green-800 rounded-md transition-colors text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Plummer Blocks
                  </Link>
                  <Link
                    href="/products/roller-chains"
                    className="block py-2 px-3 hover:bg-green-800 rounded-md transition-colors text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Roller Chains
                  </Link>
                </div>
              )}
            </li>

            {/* Industries */}
            <li>
              <Link
                href="/industries"
                className="block py-2 px-3 hover:bg-green-700 rounded-md transition-colors font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Industries
              </Link>
            </li>

            {/* Gallery */}
            <li>
              <Link
                href="/gallery"
                className="block py-2 px-3 hover:bg-green-700 rounded-md transition-colors font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gallery
              </Link>
            </li>

            {/* Blogs */}
            <li>
              <Link
                href="/blogs"
                className="block py-2 px-3 hover:bg-green-700 rounded-md transition-colors font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blogs
              </Link>
            </li>

            {/* Contact */}
            <li>
              <Link
                href="/contact"
                className="block py-2 px-3 hover:bg-green-700 rounded-md transition-colors font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>

            {/* Get a Quote */}
            <li>
              <button
                onClick={() => {
                  setIsQuoteOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 px-3 bg-green-700 hover:bg-green-600 rounded-md transition-colors font-medium text-lg flex items-center gap-2 justify-center"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Get a Quote
              </button>
            </li>

            {/* Social Icons */}
            <li className="flex gap-4 justify-center pt-2">
              <a
                href="https://www.facebook.com/people/SRO-Bearings/61578079778501/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-100 transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/srobharat/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-100 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Quote Popup Modal */}
      {isQuoteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div
            ref={quoteRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 animate-popIn overflow-hidden"
          >
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Request a Quote
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Fill out the form and we'll get back to you within 24 hours
                </p>
              </div>
              <button
                onClick={() => setIsQuoteOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors p-1 rounded-full hover:bg-gray-100"
                aria-label="Close modal"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-5">
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
                    className="w-full px-3 py-2 border border-gray-500 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                      className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                      className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Specifications, delivery requirements, etc."
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors duration-300 font-medium flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
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

            <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
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
