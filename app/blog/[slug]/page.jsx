// app/blog/[slug]/page.jsx
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowUp, FaCalendar, FaTag, FaClock } from 'react-icons/fa';
import { NAV, NAV_CTA } from '@/data/nav';
import { getPostBySlug, getAllPosts, getAllTags } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: `${post.frontmatter.title} — M. Hariz Hazril`,
    description: post.frontmatter.summary,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      type: 'article',
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
      images: post.frontmatter.ogImage ? [{ url: post.frontmatter.ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      images: post.frontmatter.ogImage ? [post.frontmatter.ogImage] : [],
    },
  };
}

function ReadingTime({ content }) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return (
    <span className="flex items-center gap-1.5 text-white/50 text-sm">
      <FaClock size={14} aria-hidden="true" />
      {minutes} min read
    </span>
  );
}

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  const allPosts = await getAllPosts();
  const tags = getAllTags(allPosts);
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = allPosts[currentIndex + 1];
  const nextPost = allPosts[currentIndex - 1];

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <div className="mx-auto max-w-[1260px] px-5 py-16">
        {/* Nav */}
        <header className="flex items-center justify-between py-8">
          <Link href="/" className="text-3xl font-bold tracking-tight" aria-label="Home">
            Hariz<span className="text-amber-400">.</span>
          </Link>
          <nav className="hidden gap-12 text-[15px] text-white/60 md:flex" aria-label="Main navigation">
            {NAV.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                className={`transition hover:text-white ${n.href === '/blog' ? 'text-white' : 'text-white/60'}`}
                aria-current={n.href === '/blog' ? 'page' : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link
            href={NAV_CTA.href}
            className="rounded-2xl bg-[#2a2a2a] px-8 py-3.5 font-medium transition hover:bg-[#363636]"
          >
            {NAV_CTA.label}
          </Link>
        </header>

        <main className="space-y-10 max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-amber-400 transition text-sm"
          >
            ← Back to Blog
          </Link>

          {/* Article Header */}
          <article className="space-y-6">
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <time dateTime={post.frontmatter.date} className="flex items-center gap-1.5 text-white/50">
                  <FaCalendar size={14} aria-hidden="true" />
                  {new Date(post.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <ReadingTime content={post.frontmatter.summary} />
                {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <FaTag size={14} className="text-white/40" aria-hidden="true" />
                    {post.frontmatter.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="px-2 py-1 rounded-full bg-white/5 text-white/60 text-xs border border-white/10 hover:border-amber-400/50 hover:text-white transition"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">{post.frontmatter.title}</h1>
              <p className="text-lg text-white/70 border-l-4 border-amber-400 pl-4 italic">{post.frontmatter.summary}</p>
            </header>

            {/* MDX Content */}
            <div className="prose prose-invert max-w-none text-white/80 leading-8" style={{ '--tw-prose-links-color': '#fbbf24' }}>
              <MDXRemote source={post.content} />
            </div>

            {/* Tags */}
            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <footer className="pt-8 border-t border-white/10">
                <div className="flex flex-wrap items-center gap-2">
                  <FaTag className="text-white/50" size={16} aria-hidden="true" />
                  {post.frontmatter.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-sm border border-white/10 hover:border-amber-400/50 hover:text-white transition"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </footer>
            )}

            {/* Navigation */}
            {(prevPost || nextPost) && (
              <nav className="flex items-center justify-between pt-8 border-t border-white/10" aria-label="Post navigation">
                {prevPost && (
                  <Link href={`/blog/${prevPost.slug}`} className="flex items-center gap-2 text-white/70 hover:text-amber-400 transition">
                    <FaArrowUp className="rotate-45 -rotate-90" size={16} />
                    <span className="text-sm">Previous</span>
                    <span className="font-medium hidden sm:block">{prevPost.frontmatter.title}</span>
                  </Link>
                )}
                {nextPost && (
                  <Link href={`/blog/${nextPost.slug}`} className="flex items-center gap-2 text-white/70 hover:text-amber-400 transition text-right">
                    <span className="text-sm">Next</span>
                    <span className="font-medium hidden sm:block">{nextPost.frontmatter.title}</span>
                    <FaArrowUp className="rotate-45" size={16} />
                  </Link>
                )}
              </nav>
            )}
          </article>

          {/* CTA */}
          <section className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#2a2a2a] px-8 py-3.5 font-medium transition hover:bg-[#363636]"
            >
              Let's discuss this topic <FaArrowUp className="rotate-45" size={16} />
            </Link>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center" role="contentinfo">
          <p className="text-3xl font-bold" aria-hidden="true">
            Hariz<span className="text-amber-400">.</span>
          </p>
          <nav className="mt-5 flex justify-center gap-10 text-white/60" aria-label="Footer navigation">
            {NAV.map((n) => (
              <Link key={n.label} href={n.href} className="transition hover:text-white">
                {n.label}
              </Link>
            ))}
          </nav>
          <p className="mt-8 text-sm text-white/60">
            © {new Date().getFullYear()} M. Hariz Hazril · harizhazril@gmail.com
          </p>
        </footer>
      </div>
    </div>
  );
}