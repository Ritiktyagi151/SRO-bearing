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
    <footer className="bg-gradient-to-br from-gray-400 via-gray-600 to-gray-700 text-white relative overflow-hidden">
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
      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Top Section with Brand */}
        <div className="text-center mb-12 pb-8 border-b border-gray-700">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            SRO Bearings
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto leading-relaxed">
            Leading provider of premium bearings and mechanical components,
            delivering excellence across industries with unwavering quality and
            innovation.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Info className="text-white w-4 h-4" />
              </div>
              <h3 className="text-xl font-semibold text-white">About Us</h3>
            </div>
            <p className="text-white leading-relaxed text-sm">
              At SRO, we understand the critical role bearings play in ensuring
              seamless operations across various industries with our unwavering
              focus on quality.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-green-400 hover:text-green-300 font-medium text-sm transition-all duration-300 group"
            >
              Learn More
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <LinkIcon className="text-white w-4 h-4" />
              </div>
              <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            </div>
            <nav className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Industries", href: "/industries" },
                { name: "Gallery", href: "/gallery" },
                { name: "Blogs", href: "/blogs" },
                { name: "Contact", href: "/contact" },
              ].map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-white hover:text-green-400 transition-colors duration-300 text-sm py-1 hover:pl-2 transition-all"
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
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Settings className="text-white w-4 h-4" />
              </div>
              <h3 className="text-xl font-semibold text-white">Our Products</h3>
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
                  className="block text-white hover:text-green-400 transition-colors duration-300 text-sm py-1 hover:pl-2 transition-all"
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
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Mail className="text-white w-4 h-4" />
              </div>
              <h3 className="text-xl font-semibold text-white">Get In Touch</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="mt-1 text-white group-hover:text-green-300 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <p className="text-white text-sm leading-relaxed">
                  1st Floor, 3856/5, Shradhanand Marg,
                  <br />
                  Shah Ganj, Chandni Chowk,
                  <br />
                  Delhi, 110006
                </p>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="text-white group-hover:text-green-300 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <a
                  href="tel:+919873334405"
                  className="text-white hover:text-green-400 transition-colors text-sm"
                >
                  +91 - 9873334405
                </a>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-3 group">
                  <div className="text-white group-hover:text-green-300 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a
                    href="mailto:srobearings@outlook.com"
                    className="text-white hover:text-green-400 transition-colors text-sm"
                  >
                    srobearings@outlook.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 group ml-6">
                  <a
                    href="mailto:info@srobearings.com"
                    className="text-white hover:text-green-400 transition-colors text-sm"
                  >
                    info@srobearings.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center mb-8">
          <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
          <div className="flex justify-center space-x-4">
            {[
              {
                icon: Facebook,
                href: "https://www.facebook.com/profile.php?id=61578079778501",
              },
              // { icon: Twitter, href: "#" },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/company/srobharat/?originalSubdomain=io",
              },
              // { icon: Instagram, href: "#" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-10 h-10 bg-gray-700 hover:bg-gradient-to-r hover:from-green-400 hover:to-emerald-500 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} SRO Bearing. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Powered by{" "}
              <Link
                href="https://jaikvik.com/"
                className="text-green-400 hover:text-green-300 transition-colors duration-300 font-medium"
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
