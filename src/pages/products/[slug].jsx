import Head from "next/head";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Link from "next/link";

const productData = {
  "spherical-roller-bearings": {
    name: "Spherical Roller Bearings",
    description:
      "Spherical roller bearings are self-aligning and suitable for heavy-duty applications with misalignment.",
    image:
      "https://media.istockphoto.com/id/521230407/photo/group-of-bearings-isolated.jpg?s=612x612&w=0&k=20&c=L5TC6rTNrEeBvJdCy0gR9GolxTmYUhqhwh03XVawzRo=",
    features: [
      "Self-aligning capability (±3°)",
      "High load capacity",
      "Robust construction",
      "Suitable for heavy radial and axial loads",
    ],
    specifications: {
      Material: "Chrome steel",
      Cage: "Pressed steel or brass",
      "Temperature Range": "-30°C to +120°C",
      Lubrication: "Grease or oil",
    },
  },
  "taper-roller-bearings": {
    name: "Taper Roller Bearings",
    description:
      "These bearings handle combined loads and are often used in automotive and industrial gearboxes.",
    image:
      "https://media.istockphoto.com/id/1359522393/photo/modify-taper-bearing-on-a-white-background-motorcycle-taper-bearing-close-up-motorcycle-modify.jpg?s=612x612&w=0&k=20&c=cLNL_5NRg_jn2vj3iwNXpZvy7q_ZBTQgrNJcPeJGRXM=",
    features: [
      "High radial and axial load capacity",
      "Separable design",
      "Precision performance",
      "Long service life",
    ],
    specifications: {
      Material: "High-carbon chromium steel",
      Cage: "Pressed steel or polymer",
      "Precision Class": "ABEC-1 to ABEC-7",
      Sealing: "Open, shielded or sealed",
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export async function getStaticPaths() {
  const paths = Object.keys(productData).map((slug) => ({
    params: { slug },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const product = productData[params.slug] || null;
  return { props: { product } };
}

export default function ProductDetail({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <Head>
          <title>Product Not Found</title>
        </Head>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} | Industrial Bearings</title>
        <meta name="description" content={product.description} />
      </Head>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div variants={itemVariants} className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <div className="flex items-center">
                    <Link
                      href="/products"
                      className="text-sm font-medium text-gray-500 hover:text-green-600"
                    >
                      Products
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center"></div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-2 text-sm font-medium text-green-600">
                      {product.name}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </motion.div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Product Image */}
            <motion.div variants={itemVariants} className="mb-8 lg:mb-0">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover transition duration-500 hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Product Info */}
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  {product.name}
                </h1>
              </motion.div>

              <motion.div variants={itemVariants}>
                <p className="text-lg text-gray-600">{product.description}</p>
              </motion.div>

              {/* Features */}
              {product.features && (
                <motion.div
                  variants={itemVariants}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Key Features
                  </h2>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="ml-2 text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Specifications */}
              {product.specifications && (
                <motion.div
                  variants={itemVariants}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Technical Specifications
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Object.entries(product.specifications).map(
                          ([key, value], index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700 bg-gray-50">
                                {key}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                {value}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition duration-300 shadow-md hover:shadow-lg">
                  Request Quote
                </button>
                <button className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-md transition duration-300 border border-gray-300 shadow-sm hover:shadow-md">
                  Download Catalog
                </button>
              </motion.div>
            </div>
          </div>

          {/* Related Products Section */}
          <motion.div variants={itemVariants} className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(productData)
                .filter(([slug]) => slug !== router.query.slug)
                .slice(0, 3)
                .map(([slug, product], index) => (
                  <motion.div
                    key={slug}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition duration-300"
                  >
                    <a href={`/products/${slug}`} className="block">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {product.description}
                        </p>
                        <div className="mt-4 text-green-600 font-medium text-sm">
                          Learn more →
                        </div>
                      </div>
                    </a>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
