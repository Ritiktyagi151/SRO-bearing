import Head from "next/head";
import { useEffect, useRef, useState } from "react";

const IndustryPage = () => {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    // Try to autoplay video
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsVideoLoaded(true))
        .catch((e) => console.log("Autoplay prevented:", e));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Industries | SRO bearing</title>
      </Head>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .gradient-text {
          background: linear-gradient(135deg, #10b981, #047857);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-effect {
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hover-lift:hover {
          transform: translateY(-5px);
        }

        .shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>

      {/* Hero Section with Video Background */}
      <section className="relative h-screen overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-green-900/30 z-10 flex items-center justify-center">
          <div className="text-center px-4 max-w-6xl">
            <div className="glass-effect rounded-3xl p-8 md:p-12 mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-6 animate-on-scroll opacity-0">
                <span className="text-green-400">40+ Years</span> of Bearing
                <br />
                Excellence
              </h1>
              <p className="text-lg md:text-2xl text-gray-100 mb-8 animate-on-scroll opacity-0 transition delay-100">
                Trusted partner to industries worldwide with premium bearing
                solutions
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-on-scroll opacity-0 transition delay-200">
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg hover-lift transition-all duration-300">
                  Explore Products
                </button>
                <button className="glass-effect hover:bg-white/20 text-white font-bold py-4 px-10 rounded-full text-lg hover-lift transition-all duration-300">
                  Connect With Us
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-105"
            poster="https://images.unsplash.com/photo-1581093450021-4a7360e9a6a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            <source
              src="https://videocdn.cdnpk.net/videos/7a55d9f2-b90e-57eb-9976-5808fc5ec293/horizontal/previews/clear/small.mp4?token=exp=1752738442~hmac=335e781087863bfd64c0891a0e66e6a723dd1f484789fcce5a06953dfe0c8156"
              type="video/mp4"
            />
          </video>
          {!isVideoLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500 to-gray-300 animate-pulse"></div>
          )}
        </div>
      </section>

      {/* About Excellence Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 animate-on-scroll opacity-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl hover-lift transition-all duration-500">
                <img
                  src="https://media.istockphoto.com/id/696640878/photo/3d-rendering-of-tapered-roller-bearings.jpg?s=612x612&w=0&k=20&c=TDJ387djvHsEaayf-BMwHIiZd48ODCbmF5qY6rGlvXw="
                  alt="SRO Bearings factory"
                  className="w-full h-auto"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    Since 19**
                  </h3>
                  <p className="text-gray-200 text-lg">
                    Delivering precision bearing solutions
                  </p>
                </div>
                <div className="absolute top-4 right-4 glass-effect rounded-full p-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 animate-on-scroll opacity-0 transition delay-100">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 leading-tight">
                <span className="gradient-text">Four Decades</span> of Trusted
                Partnership
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                With over four decades of expertise in the bearings industry, we
                take immense pride in serving as a reliable partner to
                industries worldwide. Our commitment to excellence has enabled
                us to build a robust reputation in the market.
              </p>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                At SRO, we understand the critical role bearings play in
                ensuring seamless operations across various industries. With an
                unwavering focus on quality, we offer a diverse range of
                high-performance bearings that are meticulously crafted to meet
                the most stringent industry standards.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: "40+", label: "Years Experience" },
                  { value: "5000+", label: "Clients Worldwide" },
                  { value: "24/7", label: "Support" },
                  { value: "100%", label: "Quality" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift relative overflow-hidden"
                  >
                    <div className="absolute inset-0 shimmer"></div>
                    <p className="text-3xl font-bold text-green-600 mb-2">
                      {stat.value}
                    </p>
                    <p className="text-gray-600 text-lg font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-on-scroll opacity-0">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Industries <span className="gradient-text">We Serve</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our extensive experience has allowed us to cultivate a vast and
              loyal customer base across diverse sectors
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Steel Industry",
                icon: "🏗️",
                image:
                  "https://media.istockphoto.com/id/492520874/photo/oil-and-gas-industry-refinery-at-twilight-petrochemical-plant.jpg?s=612x612&w=0&k=20&c=AeglSbfXcj403fbBAhNEf-fuG2eNuPj3L3SWS0NHinQ=",
              },
              {
                name: "Stone Crusher",
                icon: "⛏️",
                image:
                  "https://media.istockphoto.com/id/464104549/photo/conveyor-belt-in-a-quarry-open-mine-pit.jpg?s=612x612&w=0&k=20&c=Z9NJPzybSEUQ0YzO5uaTfxXOOQpLdjNEHv6fJrlnwo8=",
              },
              {
                name: "Cement Plants",
                icon: "🏭",
                image:
                  "https://media.istockphoto.com/id/2212753262/photo/a-working-quarry-with-lorries-on-site.jpg?s=612x612&w=0&k=20&c=BgdY-Qe4VWeyX3Xlf9kzChOOW9UUvU_5Su7P-8RJMLc=",
              },
              {
                name: "Paper Mills",
                icon: "📄",
                image:
                  "https://media.istockphoto.com/id/509029612/photo/paper-and-pulp-mill.jpg?s=612x612&w=0&k=20&c=rlQIBhvLHw9-QDoQtoS_TlpCb0NM3TFv-RJvQgcVqVw=",
              },
              {
                name: "Sugar Mills",
                icon: "🍬",
                image:
                  "https://media.istockphoto.com/id/1195289829/photo/sugar-cane-industry-factory-structure.jpg?s=612x612&w=0&k=20&c=LuowHB5v5uLvIDbBG5-YPhHp-5R2fULxyiSUIyOhge8=",
              },
              {
                name: "Automotive",
                icon: "🚗",
                image:
                  "https://media.istockphoto.com/id/2148445299/photo/self-drive-autonomous-vehicle.jpg?s=612x612&w=0&k=20&c=ljAHBKMIuGhOrLwrq3YvcGpOcnpxh-mPSjO3B0sC3vE=",
              },
              {
                name: "Electric Motors",
                icon: "⚡",
                image:
                  "https://media.istockphoto.com/id/964994842/photo/modern-industrial-equipment.jpg?s=612x612&w=0&k=20&c=zBAGS6u0-TzCfOQ-tXU2QTkKLtnw1Ytuf7S6p5cIJOE=",
              },
              {
                name: "Heavy Machinery",
                icon: "🏗️",
                image:
                  "https://media.istockphoto.com/id/1131943250/vector/a-large-set-of-construction-equipment-in-yellow-special-machines-for-the-building-work.jpg?s=612x612&w=0&k=20&c=ciInTjlUgDXvssbrD2oYXVCbPpPgjPQSEKXf5em41_I=",
              },
            ].map((industry, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-56 animate-on-scroll opacity-0 hover-lift"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 flex items-end p-6">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    <div className="text-4xl mb-3 filter drop-shadow-lg">
                      {industry.icon}
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      {industry.name}
                    </h3>
                    <div className="w-12 h-1 bg-green-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                </div>
                <img
                  src={industry.image}
                  alt={industry.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Range Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-on-scroll opacity-0">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Comprehensive <span className="gradient-text">Product Range</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Beyond bearings - complete solutions for your industrial needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Bearings",
                description:
                  "Wide range of ball, roller, and specialty bearings for all industrial applications",
                features: [
                  "Precision engineered",
                  "Extended lifespan",
                  "Various sizes",
                ],
                icon: "⚙️",
              },
              {
                title: "Bearing Accessories",
                description:
                  "Complete your bearing solution with our range of accessories",
                features: [
                  "Housings & sleeves",
                  "Mounting tools",
                  "Dismounting tools",
                ],
                icon: "🔧",
              },
              {
                title: "Maintenance Products",
                description: "Keep your bearings performing at peak efficiency",
                features: [
                  "Lubrication systems",
                  "Condition monitoring",
                  "Preventive maintenance",
                ],
                icon: "🛠️",
              },
              {
                title: "Sealing Solutions",
                description: "Protect your bearings from contamination",
                features: ["Grease seals", "Oil seals", "Specialty seals"],
                icon: "🔒",
              },
              {
                title: "Technical Support",
                description: "Expert guidance for your bearing needs",
                features: [
                  "Application engineering",
                  "Failure analysis",
                  "Product selection",
                ],
                icon: "👨‍💻",
              },
              {
                title: "Custom Solutions",
                description:
                  "Tailored bearing solutions for unique applications",
                features: [
                  "Special materials",
                  "Non-standard sizes",
                  "Extreme environments",
                ],
                icon: "🎯",
              },
            ].map((product, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 animate-on-scroll opacity-0 hover-lift relative overflow-hidden"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-green-600 text-white text-2xl mb-6 shadow-lg">
                  {product.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>
                <ul className="space-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 animate-on-scroll opacity-0">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                <span className="gradient-text">Quality Assurance</span> &
                Testing
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our commitment to excellence is backed by rigorous quality
                control processes and state-of-the-art testing facilities.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "ISO 9001:2015 Certified",
                    desc: "International quality management standards",
                  },
                  {
                    title: "Advanced Testing Labs",
                    desc: "Comprehensive bearing performance analysis",
                  },
                  {
                    title: "Material Inspection",
                    desc: "Premium grade materials verification",
                  },
                  {
                    title: "Performance Testing",
                    desc: "Endurance and reliability validation",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 animate-on-scroll opacity-0 transition delay-100">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl hover-lift transition-all duration-500">
                <img
                  src="https://media.istockphoto.com/id/1175088656/photo/micrometer-with-metal-bearings-on-black-close-up.jpg?s=612x612&w=0&k=20&c=V8FhZteIz6x9PaBdt1e7PtFMZPgXTnqGO6nXawLZB-Q="
                  alt="Quality testing laboratory"
                  className="w-full h-auto"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-on-scroll opacity-0">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              <span className="gradient-text">Global Presence</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Serving customers worldwide with extensive distribution network
              and local support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { country: "India", clients: "2000+", cities: "150+" },
              { country: "Asia Pacific", clients: "1500+", cities: "80+" },
              { country: "Middle East", clients: "800+", cities: "45+" },
              { country: "Africa", clients: "700+", cities: "35+" },
            ].map((region, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift text-center animate-on-scroll opacity-0"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {region.country}
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-3xl font-bold text-green-600">
                      {region.clients}
                    </p>
                    <p className="text-gray-600">Active Clients</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-700">
                      {region.cities}
                    </p>
                    <p className="text-gray-600">Cities Served</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation & Technology Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 animate-on-scroll opacity-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl hover-lift transition-all duration-500">
                <img
                  src="https://media.istockphoto.com/id/1385367820/photo/belt-crawler-casting-industrial-parts-pulley.jpg?s=612x612&w=0&k=20&c=oq5tfAwe2sdRsri3p4bF4hNLmpElVRGdwV1Tmk7Cocc="
                  alt="Innovation and technology"
                  className="w-full h-auto"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full text-lg font-medium">
                  Innovation Hub
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 animate-on-scroll opacity-0 transition delay-100">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                <span className="gradient-text">Innovation</span> & Technology
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Continuous research and development drives our innovation,
                ensuring we stay at the forefront of bearing technology.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "R&D Investment",
                    value: "15%",
                    desc: "Annual revenue",
                  },
                  {
                    title: "Patents",
                    value: "25+",
                    desc: "Registered innovations",
                  },
                  {
                    title: "Research Team",
                    value: "50+",
                    desc: "Engineers & scientists",
                  },
                  {
                    title: "Test Products",
                    value: "100+",
                    desc: "Annual prototypes",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-md"
                  >
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {stat.title}
                    </h3>
                    <p className="text-3xl font-bold text-green-600 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-gray-600 text-lg">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 order-2 lg:order-1 animate-on-scroll opacity-0">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                Why <span className="gradient-text">Choose SRO</span> Bearings?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Unmatched Quality",
                    content:
                      "Our products match with the pedigree of the allied services we offer, supported by state-of-the-art infrastructure.",
                    icon: "🏆",
                  },
                  {
                    title: "Technical Expertise",
                    content:
                      "Dedicated workforce of bearing professionals with depth of knowledge and quick response time.",
                    icon: "🎓",
                  },
                  {
                    title: "Competitive Pricing",
                    content:
                      "Unmatched quality made available at affordable prices, adding value to our customers' operations.",
                    icon: "💰",
                  },
                  {
                    title: "Ready Availability",
                    content:
                      "Extensive inventory and online links with manufacturers enabling finest service on demand.",
                    icon: "📦",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-600"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <h3 className="text-lg font-bold text-green-600 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 animate-on-scroll opacity-0 transition delay-100">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl hover-lift transition-all duration-500">
                <img
                  src="https://media.istockphoto.com/id/91034075/photo/only-quality-bearings.jpg?s=612x612&w=0&k=20&c=ZjPRipFuq0xYNKO8ajjNgFII46N0ZUX2YR2yIEIgFu8="
                  alt="SRO Bearings quality inspection"
                  className="w-full h-auto"
                  loading="lazy"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-8">
                  <div className="glass-effect rounded-2xl p-8 max-w-sm text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">
                      Customer Satisfaction
                    </h3>
                    <p className="text-gray-200 mb-6 leading-relaxed">
                      SRO Bearings has an impressive track record of customer
                      satisfaction, enabling it to retain its position as a
                      preferred bearing supplier.
                    </p>
                    <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover-lift">
                      Our Testimonials
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default IndustryPage;
