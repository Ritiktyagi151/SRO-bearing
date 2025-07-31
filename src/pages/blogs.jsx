import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    slug: "bearing-maintenance-tips",
    title: "5 Essential Bearing Maintenance Tips",
    excerpt:
      "Learn how to properly maintain your bearings to extend their lifespan.",
    date: "2023-10-15",
    image: "https://picsum.photos/seed/bearings1/400/250",
    category: "Maintenance",
    readTime: "4 min read",
  },
  {
    id: 2,
    slug: "lubrication-best-practices",
    title: "How to Choose the Right Bearing",
    excerpt:
      "Guide to selecting bearings based on load and speed requirements.",
    date: "2023-09-28",
    image: "https://picsum.photos/seed/bearings2/400/250",
    category: "Guide",
    readTime: "6 min read",
  },
  {
    id: 3,
    slug: "installation-tips-bearings",
    title: "Top Installation Tips for Long-Lasting Bearings",
    excerpt:
      "Discover the best practices for installing bearings to maximize their performance.",
    date: "2023-12-05",
    image: "https://picsum.photos/seed/bearings3/400/250",
    category: "Installation",
    readTime: "5 min read",
  },
  {
    id: 4,
    slug: "bearing-inspection-guide",
    title: "A Complete Guide to Bearing Inspection",
    excerpt:
      "Step-by-step guide for inspecting bearings for wear, damage, and performance.",
    date: "2024-01-12",
    image: "https://picsum.photos/seed/bearings4/400/250",
    category: "Inspection",
    readTime: "4 min read",
  },
  {
    id: 5,
    slug: "bearing-replacement-checklist",
    title: "Bearing Replacement Checklist You Should Follow",
    excerpt:
      "Key signs and checklist to help you know when it's time to replace a bearing.",
    date: "2024-02-25",
    image: "https://picsum.photos/seed/bearings5/400/250",
    category: "Maintenance",
    readTime: "4 min read",
  },
  {
    id: 6,
    slug: "bearing-performance-optimization",
    title: "How to Optimize Bearing Performance",
    excerpt:
      "Tips and techniques to enhance bearing efficiency and extend operational life.",
    date: "2024-03-15",
    image: "https://picsum.photos/seed/bearings6/400/250",
    category: "Performance",
    readTime: "5 min read",
  },
  {
    id: 7,
    slug: "types-of-industrial-bearings",
    title: "Understanding Different Types of Industrial Bearings",
    excerpt:
      "Overview of various industrial bearing types and their key applications.",
    date: "2024-04-10",
    image: "https://picsum.photos/seed/bearings7/400/250",
    category: "Technical Insights",
    readTime: "5 min read",
  },
];

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Blog | SRO Bearings</title>
        <meta name="description" content="Latest articles from SRO Bearings" />
      </Head>

      {/* Video Banner */}
      <div className="relative h-96 md:h-[70vh] w-full overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          poster="https://media.istockphoto.com/id/687071416/photo/gears-on-dark.jpg?s=612x612&w=0&k=20&c=eYmN-qOeKAxHxASEbut7V5pFzVycrp_sT3MPAc4TK3s="
        >
          <source
            src="https://videocdn.cdnpk.net/videos/f7fb57fd-c837-57ed-8a7e-06e902a30f08/horizontal/previews/clear/small.mp4?token=exp=1752735106~hmac=6dee04e92efc9fee1854ccd73e30c95c23490827031aed2bb4f574b486aef8de"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              SRO Insights
            </h1>
            <p className="text-lg md:text-2xl text-white max-w-2xl mx-auto">
              Expert knowledge for bearing professionals
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-green-600 uppercase">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="hover:text-green-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <time className="text-lg text-gray-500">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="text-lg font-medium text-green-600 hover:text-green-700 flex items-center"
                  >
                    Read more
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
