import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { ArrowBigRight } from "lucide-react";

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <main className="max-w-xl mx-auto mt-4 mb-8 px-4 blog-content">
      <h1 className="text-2xl font-bold mb-6">Blog</h1>
      
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug} className="group">
              <Link
                href={`/blog/${post.slug}`}
                className="flex items-start gap-2 transition-all duration-300 hover:translate-x-2"
              >
                <ArrowBigRight
                  size={16}
                  className="mt-1 flex-shrink-0 transition-all duration-300 group-hover:rotate-[20deg]"
                  style={{ color: "var(--foreground)", opacity: 0.7 }}
                />
                <div className="flex-1">
                  <h2 className="font-semibold group-hover:text-[#660000] transition-colors">
                    {post.title}
                  </h2>
                  <time className="text-sm opacity-60">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
