// app/blog/page.jsx
import { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowUp, FaCalendar, FaTag } from 'react-icons/fa';
import { NAV, NAV_CTA } from '@/data/nav';
import { getAllPosts } from '@/lib/mdx';

export const metadata = {
  title: 'Blog — M. Hariz Hazril',
  description: 'Writing on Industrial IoT, .NET modernisation, AI agents, MCP, and software engineering. Technical deep-dives and lessons learned.',
};

const card = 'rounded-3xl bg-gradient-to-b from-[#2a2a2a] to-[#222] border border-white/5';

async function BlogContent() {
  const posts = await getAllPosts();
  
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

        <main className="space-y-12">
          {/* Hero */}
          <section className="text-center" aria-labelledby="blog-hero">
            <h1 id="blog-hero" className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              <span className="text-amber-400">Blog</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Technical writing on systems that keep running. Industrial IoT, legacy modernisation, agentic AI, and the craft of software engineering.
            </p>
          </section>

          {/* Posts Grid */}
          <section aria-labelledby="posts-list">
            {posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-white/60">No posts yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <article key={post.slug} className={`${card} flex flex-col h-full p-6 transition hover:border-amber-400/50`}>
                    <div className="flex items-center gap-2 text-xs text-white/50 mb-3">
                      <time dateTime={post.frontmatter.date}>
                        <FaCalendar className="inline" size={12} aria-hidden="true" />
                        {new Date(post.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </time>
                      {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                        <>
                          <span aria-hidden="true">·</span>
                          <FaTag size={12} aria-hidden="true" />
                          {post.frontmatter.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-white/50">{tag}</span>
                          ))}
                          {post.frontmatter.tags.length > 2 && (
                            <span className="text-white/40">+{post.frontmatter.tags.length - 2}</span>
                          )}
                        </>
                      )}
                    </div>
                    <Link href={`/blog/${post.slug}`} className="group">
                      <h2 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition">{post.frontmatter.title}</h2>
                      <p className="text-white/70 flex-1 mb-4 line-clamp-3">{post.frontmatter.summary}</p>
                    </Link>
                    <div className="mt-auto pt-4 border-t border-white/10">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-400 hover:text-amber-300 transition"
                      >
                        Read more <FaArrowUp className="rotate-45" size={12} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* CTA */}
          <section className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#2a2a2a] px-8 py-3.5 font-medium transition hover:bg-[#363636]"
            >
              Want to collaborate? <FaArrowUp className="rotate-45" size={16} />
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

export default BlogContent;