import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu, Search, X, ChevronDown, FileText } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategory, setOpenCategory] = useState(null);
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    message: "",
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen || isQuoteFormOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isMenuOpen, isQuoteFormOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Product", href: "/products" },
    { label: "Industries", href: "/industries" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ];

  const productCategories = [
    {
      name: "Bearings",
      icon: <ChevronDown size={16} />,
      subcategories: [
        {
          label: "Spherical Roller Bearings",
          href: "/products/spherical-roller-bearings",
        },
        {
          label: "Taper Roller Bearings",
          href: "/products/taper-roller-bearings",
        },
        { label: "Thrust Bearings", href: "/products/thrust-bearings" },
        { label: "Multi Row Bearings", href: "/products/multi-row-bearings" },
        {
          label: "Pillow Block Bearing",
          href: "/products/pillow-block-bearing",
        },
        { label: "Plummer Blocks", href: "/products/plummer-blocks" },
        { label: "Roller Chains", href: "/products/roller-chains" },
      ],
    },
  ];

  const toggleCategory = (category) =>
    setOpenCategory(openCategory === category ? null : category);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
      isValid = false;
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^[0-9+\-\s]+$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
      isValid = false;
    }
    if (!formData.product) {
      errors.product = "Please select a product";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/bhakarsoursbh@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...formData,
            _subject: `New Quote Request for ${formData.product}`,
            _template: "table",
          }),
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to submit form");
      toast.success("Quote submitted successfully! We'll contact you soon.");
      setFormData({ name: "", email: "", phone: "", product: "", message: "" });
      setIsQuoteFormOpen(false);
    } catch (error) {
      toast.error(error.message || "Failed to submit quote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-100 backdrop-blur-sm shadow-md border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Left - Logo + Menu */}
          <div className="flex items-center space-x-3">
            <button
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? "hover:bg-gray-100" : "hover:bg-white/20"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X
                  size={24}
                  className={isScrolled ? "text-gray-700" : "text-white"}
                />
              ) : (
                <Menu
                  size={24}
                  className={isScrolled ? "text-gray-700" : "text-white"}
                />
              )}
            </button>
            <Link href="/">
              <Image
                src="/sro-newlogo.png"
                alt="SRO Bearings Logo"
                width={130}
                height={65}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Center - Nav Items */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium ${
                  isScrolled
                    ? "text-gray-700 hover:text-green-300"
                    : "text-white/90 hover:text-green-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right - Actions */}
          <div className="flex items-center space-x-6">
            {!isMenuOpen && (
              <div className="relative hidden md:block">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    isScrolled ? "text-gray-400" : "text-white/80"
                  }`}
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 w-48 lg:w-64 rounded-lg text-sm py-2 px-3 outline-none transition ${
                    isScrolled
                      ? "bg-gray-50 border border-gray-200"
                      : "bg-white/20 border border-white/30 text-white placeholder-white/70"
                  }`}
                />
              </div>
            )}

            <button
              className={`hidden md:inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                isScrolled
                  ? "bg-gray-600 text-white hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-green-600"
              }`}
              onClick={() => setIsQuoteFormOpen(true)}
            >
              Get a Quote
            </button>

            <button
              className={`md:hidden p-2 rounded-lg ${
                isScrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/20"
              }`}
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Quote Form Modal */}
        {isQuoteFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setIsQuoteFormOpen(false)}
            ></div>
            <div className="relative bg-gray-100 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* ... form content remains unchanged ... */}
            </div>
          </div>
        )}

        {/* Mobile Menu Sidebar */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            ></div>
            <div className="relative bg-gray-100 w-full max-w-xs h-full overflow-y-auto shadow-xl">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-gray-900">
                  SRO
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full bg-gray-50 border border-gray-200 rounded-lg text-sm py-2.5 px-3 outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  />
                </div>
              </div>
              <nav className="divide-y divide-gray-100">
                <div className="py-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center py-3 px-4 text-gray-700 hover:text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="py-2">
                  <h3 className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Product Categories
                  </h3>
                  {productCategories.map((category) => (
                    <div key={category.name}>
                      <button
                        className="flex items-center justify-between w-full py-3 px-4 text-left text-sm font-medium text-gray-700 hover:text-gray-600 hover:bg-gray-50"
                        onClick={() => toggleCategory(category.name)}
                      >
                        <span>{category.name}</span>
                        <span
                          className={`transition-transform duration-200 ${
                            openCategory === category.name ? "rotate-180" : ""
                          }`}
                        >
                          {category.icon}
                        </span>
                      </button>
                      {openCategory === category.name && (
                        <div className="bg-gray-50 pl-6">
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory.label}
                              href={subcategory.href}
                              className="flex items-center py-2.5 px-4 text-sm text-gray-600 hover:text-gray-600 hover:bg-gray-100"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subcategory.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </nav>
              <div className="p-4 border-t border-gray-200 mt-auto">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsQuoteFormOpen(true);
                  }}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition shadow-md"
                >
                  <FileText size={16} className="mr-2" /> Get a Quote
                </button>
                <div className="mt-6 text-xs text-gray-500 text-center">
                  <p>
                    © {new Date().getFullYear()} SRO Group. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
