import { getPostData, getAllPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug);
  
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Rohan Hasabe`,
    description: post.content.slice(0, 160),
  };
}

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Convert headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');

  // Convert bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Convert code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');

  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Convert images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />');

  // Convert horizontal rules
  html = html.replace(/^---$/gim, '<hr />');

  // Convert unordered lists
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
  
  // Wrap consecutive list items in ul
  html = html.replace(/(<li>.*<\/li>\n)+/g, '<ul>$&</ul>');

  // Convert numbered lists
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');

  // Convert paragraphs (lines that aren't already wrapped)
  const lines = html.split('\n');
  html = lines.map(line => {
    const trimmed = line.trim();
    if (
      trimmed &&
      !trimmed.startsWith('<') &&
      !trimmed.startsWith('```') &&
      trimmed.length > 0
    ) {
      return `<p>${trimmed}</p>`;
    }
    return line;
  }).join('\n');

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');

  return html;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    notFound();
  }

  const contentHtml = markdownToHtml(post.content);

  return (
    <main className="max-w-xl mx-auto mt-4 mb-8 px-4">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 mb-6 text-sm opacity-70 hover:opacity-100 transition-opacity"
      >
        <ArrowLeft size={16} />
        Back to blog
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
          <time className="text-sm opacity-60">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </header>

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </main>
  );
}
