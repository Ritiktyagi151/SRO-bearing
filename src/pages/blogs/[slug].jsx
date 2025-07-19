import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const blogPosts = [
  {
    id: 1,
    slug: "bearing-maintenance-tips",
    title: "5 Essential Bearing Maintenance Tips",
    content: `
      <h2 class="text-2xl font-bold mb-4">Introduction</h2>
      <p class="mb-6">Proper maintenance extends bearing life and prevents equipment failure.</p>
      
      <h2 class="text-2xl font-bold mb-4">1. Regular Lubrication</h2>
      <p class="mb-4">Use manufacturer-recommended lubricants at specified intervals.</p>
      <ul class="list-disc pl-6 mb-6">
        <li>Reduces friction</li>
        <li>Prevents corrosion</li>
        <li>Extends service life</li>
      </ul>
      
      <h2 class="text-2xl font-bold mb-4">2. Proper Installation</h2>
      <p class="mb-6">Follow correct mounting procedures to avoid premature failure.</p>
    `,
    date: "2023-10-15",
    image: "/blog/bearing-maintenance.jpg",
    category: "Maintenance",
    readTime: "4 min read",
    author: {
      name: "John Smith",
      role: "Senior Engineer",
      avatar: "/blog/authors/john-smith.jpg",
    },
  },
];

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [mounted, setMounted] = useState(false);
  const post = blogPosts.find((post) => post.slug === slug);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Post not found
          </h1>
          <Link
            href="/blogs"
            className="text-green-600 hover:text-green-700 inline-flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{post.title} | SRO Bearings</title>
        <meta
          name="description"
          content={post.content.replace(/<[^>]*>/g, "").substring(0, 160)}
        />
      </Head>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <article>
          <header className="mb-8">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {post.author.name}
                </p>
                <div className="flex space-x-1 text-sm text-gray-500">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </header>

          <div className="relative h-96 w-full mb-8 rounded-xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/blogs"
              className="inline-flex items-center text-green-600 hover:text-green-700"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
    revalidate: 60,
  };
}
