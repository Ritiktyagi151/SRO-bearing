import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="text-white py-12 mt-10 bg-cover bg-center shadow-lg animate-fadeIn"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/image/srofooter.jpg')`,
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About Us Section */}
          <div className="space-y-4 animate-slideUp">
            <h3 className="text-lg font-semibold text-green-400 border-l-4 border-green-400 pl-4">
              About SRO Bearings
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              At SRO, we understand the critical role bearings play in ensuring
              seamless operations across various industries. With an unwavering
              focus on quality.
            </p>
            <div>
              <a
                href="/about"
                className="text-green-400 hover:text-green-500 font-medium transition-transform duration-300 hover:scale-105 inline-block"
              >
                Read More
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-4 animate-slideUp delay-100">
            <h3 className="text-2xl font-bold text-green-400 border-l-4 border-green-400 pl-4">
              Links
            </h3>
            <ul className="space-y-3 ">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Industries", href: "/industries" },
                { name: "Gallery", href: "/gallery" },
                { name: "Blogs", href: "/blogs" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-transform duration-300 hover:scale-105 flex items-center text-lg"
                  >
                    <i className="far fa-hand-point-right mr-3"></i>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Products Section */}
          <div className="space-y-4 animate-slideUp delay-200">
            <h3 className="text-lg font-semibold text-green-400 border-l-4 border-green-400 pl-4">
              Our Products
            </h3>
            <ul className="space-y-3">
              {[
                "Spherical Roller Bearings",
                "Taper Roller Bearings",
                "Thrust Bearings",
                "Multi Row Bearings",
                "Pillow Block Bearing",
                "Plummer Blocks",
                "Roller Chains",
              ].map((product) => (
                <li key={product}>
                  <a
                    href={`/products/${product
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z-]/g, "")}`}
                    className="text-gray-300 hover:text-green-400 transition-transform duration-300 hover:scale-105 flex items-center text-lg"
                  >
                    <i className="far fa-hand-point-right mr-3"></i>
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="space-y-4 animate-slideUp delay-300">
            <h3 className="text-lg font-semibold text-green-400 border-l-4 border-green-400 pl-4">
              Contact Us
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              <i className="fas fa-map-marker-alt mr-3"></i>
              1st Floor, 3856/5, Shradhanand Marg, <br />
              Shah Ganj, Chandni Chowk, Delhi, 110006
            </p>
            <p className="text-gray-300 text-lg">
              <i className="fa fa-phone mr-3"></i>
              +91 - 9873334405
            </p>
            <p className="text-gray-300 text-lg">
              <i className="fa fa-envelope mr-3"></i>
              <a
                href="mailto:srobearings@outlook.com"
                className="hover:text-green-400 transition-transform duration-300 hover:scale-105"
              >
                srobearings@outlook.com
              </a>
              ,{" "}
              <a
                href="mailto:info@srobearings.com"
                className="hover:text-green-400 transition-transform duration-300 hover:scale-105"
              >
                info@srobearings.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 text-center border-t border-gray-700 pt-6 animate-fadeIn">
          <p className="text-gray-300 text-xs">
            © {new Date().getFullYear()} SRO Bearing. All rights reserved.
            Powered by:{" "}
            <Link
              href="/"
              className="hover:text-green-400 transition-transform duration-300 hover:scale-105"
            >
              sourabh
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
