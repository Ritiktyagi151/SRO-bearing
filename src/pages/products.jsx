import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";

const products = [
  {
    slug: "spherical-roller-bearings",
    name: "Spherical Roller Bearings",
    description:
      "Designed for heavy radial and axial loads in both directions.",
    image:
      "https://media.istockphoto.com/id/521230407/photo/group-of-bearings-isolated.jpg?s=612x612&w=0&k=20&c=L5TC6rTNrEeBvJdCy0gR9GolxTmYUhqhwh03XVawzRo=",
  },
  {
    slug: "taper-roller-bearings",
    name: "Taper Roller Bearings",
    description: "Perfect for combined axial and radial loads.",
    image:
      "https://media.istockphoto.com/id/1365448155/photo/metal-silver-ball-bearing-with-balls-on-white-isolated-background-industrial-bearing-set-ball.jpg?s=612x612&w=0&k=20&c=bazmN3MtIP9o5knSQWLiFMOxy2XphmMG8qSSZ7uVVf8=",
  },
  {
    slug: "thrust-bearings",
    name: "Thrust Bearings",
    description: "Handles axial loads in high-speed applications.",
    image:
      "https://media.istockphoto.com/id/537377996/photo/bearing.jpg?s=612x612&w=0&k=20&c=MJeT8jNpEtLkKZX0rCiEw6-3jHXSbFkO_gkFXMKq1ps=",
  },
  {
    slug: "multi-row-bearings",
    name: "Multi Row Bearings",
    description: "Suitable for large radial loads and high-speed rotation.",
    image:
      "https://media.istockphoto.com/id/696640668/photo/3d-rendering-of-tapered-roller-bearings.jpg?s=612x612&w=0&k=20&c=VVGBMzlgasGoNf7BIHMK3IN-tBB-kFnv94LNXaH8ooY=",
  },
  {
    slug: "pillow-block-bearing",
    name: "Pillow Block Bearing",
    description: "Used in mounted bearing units for industrial machines.",
    image:
      "https://media.istockphoto.com/id/960982298/photo/support-bearing-assembly.jpg?s=612x612&w=0&k=20&c=Oy75zBQpWgk36rP70r9Hv1TdB9Wrjv74noM_fwpT49o=",
  },
  {
    slug: "plummer-blocks",
    name: "Plummer Blocks",
    description: "Reliable and efficient housing for rotary shafts.",
    image:
      "https://media.istockphoto.com/id/1400522671/photo/bearing-unit.jpg?s=612x612&w=0&k=20&c=gioMYKovMFDvK7Hm_dxtI-9m6pKbAtHCln-wFdn3WPE=",
  },
  {
    slug: "roller-chains",
    name: "Roller Chains",
    description: "High-performance transmission chain for power systems.",
    image:
      "https://media.istockphoto.com/id/636828986/photo/timing-mechanism-on-a-white-background.jpg?s=612x612&w=0&k=20&c=NRdgODUjCj07dR7ijdrrtbMWq5BOWlplGgvlmXBvIkA=",
  },
];

export default function Products() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let animationFrameId;

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = document.body.scrollHeight;
      };

      const createBearings = () => {
        const bearings = [];
        const count = Math.floor(window.innerWidth / 30);

        for (let i = 0; i < count; i++) {
          bearings.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 15 + Math.random() * 25,
            speed: 0.5 + Math.random() * 1.5,
            angle: Math.random() * Math.PI * 2,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.03,
          });
        }
        return bearings;
      };

      const drawBearing = (bearing, ctx) => {
        ctx.save();
        ctx.translate(bearing.x, bearing.y);
        ctx.rotate(bearing.rotation);

        // Outer ring
        ctx.beginPath();
        ctx.arc(0, 0, bearing.radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(34, 197, 94, 0.2)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner ring
        ctx.beginPath();
        ctx.arc(0, 0, bearing.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(34, 197, 94, 0.15)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Balls
        const ballCount = Math.max(6, Math.floor(bearing.radius / 5));
        for (let i = 0; i < ballCount; i++) {
          const angle = (i / ballCount) * Math.PI * 2;
          const ballX = Math.cos(angle) * bearing.radius * 0.85;
          const ballY = Math.sin(angle) * bearing.radius * 0.85;

          ctx.beginPath();
          ctx.arc(ballX, ballY, bearing.radius * 0.1, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(34, 197, 94, 0.15)";
          ctx.fill();
        }

        ctx.restore();
      };

      const animate = (bearings) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        bearings.forEach((bearing) => {
          // Update position
          bearing.x += Math.cos(bearing.angle) * bearing.speed;
          bearing.y += Math.sin(bearing.angle) * bearing.speed;
          bearing.rotation += bearing.rotationSpeed;

          // Boundary check
          if (bearing.x < -bearing.radius * 2)
            bearing.x = canvas.width + bearing.radius;
          if (bearing.x > canvas.width + bearing.radius)
            bearing.x = -bearing.radius * 2;
          if (bearing.y < -bearing.radius * 2)
            bearing.y = canvas.height + bearing.radius;
          if (bearing.y > canvas.height + bearing.radius)
            bearing.y = -bearing.radius * 2;

          drawBearing(bearing, ctx);
        });

        animationFrameId = requestAnimationFrame(() => animate(bearings));
      };

      resizeCanvas();
      const bearings = createBearings();
      animate(bearings);

      const handleResize = () => {
        cancelAnimationFrame(animationFrameId);
        resizeCanvas();
        const newBearings = createBearings();
        animate(newBearings);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      <Head>
        <title>Products | SROBearing</title>
        <meta
          name="description"
          content="Explore our premium bearing products for industrial applications"
        />
      </Head>

      {/* Animated Bearings Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10 opacity-10 pointer-events-none"
      />

      {/* Video Banner */}
      <div className="relative w-full h-[100vh] md:h-[550px] overflow-hidden bg-gray-700">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90"
        >
          <source
            src="https://media.istockphoto.com/id/2063445461/video/two-ball-bearings.mp4?s=mp4-640x640-is&k=20&c=gQWd0Bd_0LOYDpvB9DorcwEGD-WNUGPJCsIhg1kq_Jk="
            type="video/mp4"
          />
          <img
            src="/bearing-banner-fallback.jpg"
            alt="Industrial bearings in motion"
            className="w-full h-full object-cover"
          />
        </video>

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Precision <span className="text-green-300">Bearing</span>{" "}
              Solutions
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mb-8">
              Engineered for performance, built for durability
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section className="relative bg-white/95 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-green-600">Product</span> Range
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              High-quality bearings designed to meet the most demanding
              industrial requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                passHref
              >
                <div className="group relative h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex items-center text-green-600 font-medium">
                      <span>View Details</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-600 transform rotate-45 -translate-y-1/2 translate-x-1/2 opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Need help selecting the right bearing?
          </h3>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
            Our engineering team is ready to assist you in finding the perfect
            solution for your application.
          </p>
          <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
            Contact Our Experts
          </button>
        </div>
      </div>
    </div>
  );
}
