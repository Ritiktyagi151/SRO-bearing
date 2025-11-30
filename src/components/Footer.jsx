import Link from "next/link";
import {
  Info,
  Link as LinkIcon,
  Settings,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br bg-gray-100 text-[#00984C] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #10b981 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Info className="text-gray-600 w-4 h-4" />
              </div>
              <h3 className="text-xl font-semibold text-[#00984C]">About Us</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">
              SRO Bearings understands the critical role bearings play in
              ensuring seamless operations across various industries with our
              unwavering focus on quality.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              Our commitment to excellence drives us to deliver high-performance
              bearings that meet the diverse needs of our clients, ensuring
              reliability and efficiency in every application.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center text-green-400 hover:text-green-700 font-medium text-sm transition-all duration-300 group"
            >
              Learn More
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-emerald-500 rounded-full flex items-center justify-center">
                <LinkIcon className="text-gray-600 w-4 h-4" />
              </div>
              <h3 className="text-xl font-semibold text-[#00984C]">
                Quick Links
              </h3>
            </div>
            <nav className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Industries", href: "/industries" },
                { name: "Services", href: "/services" },
                { name: "Gallery", href: "/gallery" },
                { name: "Blogs", href: "/blogs" },
                { name: "Contact", href: "/contact" },
              ].map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-600 hover:text-green-400 transition-colors duration-300 text-sm py-1 hover:pl-2 transition-all"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Products */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Settings className="text-gray-600 w-4 h-4" />
              </div>
              <h3 className="text-xl font-semibold text-[#00984C]">
                Our Products
              </h3>
            </div>
            <nav className="space-y-2 ">
              {[
                "Spherical Roller Bearings",
                "Taper Roller Bearings",
                "Thrust Bearings",
                "Multi Row Bearings",
                "Pillow Block Bearing",
                "Plummer Blocks",
                "Roller Chains",
              ].map((product, index) => (
                <Link
                  key={product}
                  href={`/products/${product
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z-]/g, "")}`}
                  className="block text-gray-600 hover:text-[#00984C] transition-colors duration-300 text-sm py-1 hover:pl-2 transition-all"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {product}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Mail className="text-gray-600 w-4 h-4" />
              </div>
              <h3 className="text-xl font-semibold text-[#00984C]">
                Get In Touch
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="mt-1 text-gray-600 group-hover:text-gray-300 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  <span className="font-semibold">SRO Bearings</span> Marketing
                  office :
                  <br />
                  91, Mausam Vihar, Near Preeti Vihar Metro
                  <br />
                  Station, Delhi-110051, INDIA.
                </p>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="text-gray-600 group-hover:text-gray-300 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <a
                  href="tel:+919873334405"
                  className="text-gray-600 hover:text-gray-400 transition-colors text-sm"
                >
                  +91 - 9873334405
                </a>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-3 group">
                  <div className="text-gray-600 group-hover:text-gray-300 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a
                    href="mailto:srobearings@outlook.com"
                    className="text-gray-600 hover:text-gray-400 transition-colors text-sm"
                  >
                    srobearings@outlook.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="text-gray-600 group-hover:text-gray-300 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a
                    href="mailto:srobearings@outlook.com"
                    className="text-gray-600 hover:text-gray-400 transition-colors text-sm"
                  >
                    info@srobearings.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center ">
          <h4 className="text-lg font-semibold mb-4 text-gray-600">
            Follow Us
          </h4>
          <div className="flex justify-center space-x-4">
            {[
              {
                icon: Facebook,
                href: "https://www.facebook.com/profile.php?id=61578079778501",
              },

              {
                icon: Linkedin,
                href: "https://www.linkedin.com/company/srobharat/?originalSubdomain=io",
              },
              // { icon: Instagram, href: "#" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-10 h-10 bg-gray-700 hover:bg-gradient-to-r hover:from-gray-400 hover:to-emerald-500 rounded-full flex items-center justify-center text-gray-300 hover:text-gray-600 transition-all duration-300 hover:scale-110"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 bg-gray-100 border-t border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-[#00984C] text-sm">
              © {new Date().getFullYear()} SRO Bearing. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Powered by{" "}
              <Link
                href="https://jaikvik.com/"
                className="text-green-400 hover:text-green-700 transition-colors duration-300 font-medium"
              >
                Jaikvik Technology India Pvt Ltd
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
