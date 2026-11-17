// app/work/[slug]/page.jsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowUp, FaGithub, FaExternalLinkAlt, FaLock, FaCog } from 'react-icons/fa';
import { NAV, NAV_CTA } from '@/data/nav';
import { PROJECTS } from '@/data/projects';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

const card = 'rounded-3xl bg-gradient-to-b from-[#2a2a2a] to-[#222] border border-white/5';

function SectionTitle({ children, icon: Icon }) {
  return (
    <div className="flex items-baseline gap-3 mb-4">
      <Icon className="text-amber-400" size={24} aria-hidden="true" />
      <h2 className="text-xl font-bold tracking-tight">{children}</h2>
    </div>
  );
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  
  if (!project) {
    notFound();
  }

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
                className={`transition hover:text-white ${n.href === '/work' ? 'text-white' : 'text-white/60'}`}
                aria-current={n.href === '/work' ? 'page' : undefined}
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

        <main className="space-y-8">
          {/* Back link */}
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-white/60 hover:text-amber-400 transition text-sm"
          >
            ← Back to Work
          </Link>

          {/* Header */}
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 text-sm font-medium text-amber-400 bg-amber-400/10 rounded-full">
                {project.tag}
              </span>
              {project.featured && (
                <span className="px-3 py-1 text-sm font-medium text-amber-400 bg-amber-400/10 rounded-full">
                  Featured
                </span>
              )}
              {project.placeholder && (
                <span className="px-3 py-1 text-sm font-medium text-white/50 bg-white/5 rounded-full">
                  Placeholder
                </span>
              )}
              <span className="text-white/40 text-sm">{project.year}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">{project.title}</h1>
            <p className="text-lg text-white/70 max-w-3xl">{project.shortDescription}</p>
          </header>

          {/* Tech Stack */}
          <section className={`${card} p-6`} aria-labelledby="tech-stack">
            <h2 id="tech-stack" className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaCog className="text-amber-400" size={20} aria-hidden="true" />
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-xl bg-white/5 text-white/80 border border-white/10 text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Content Sections */}
                    <article className="prose prose-invert max-w-none text-white/80 leading-7 space-y-10">
                      <MDXRemote source={project.description} options={{ remarkPlugins: [remarkGfm] }} />
                    </article>

          {/* Links */}
          <section className={`${card} p-6`} aria-labelledby="project-links">
            <h2 id="project-links" className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaExternalLinkAlt className="text-amber-400" size={20} aria-hidden="true" />
              Links
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#363636] px-5 py-2.5 font-medium transition hover:bg-white/10"
              >
                <FaArrowUp className="rotate-45" size={14} />
                Discuss Similar Work
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 font-medium text-white/70 transition hover:border-white/30 hover:text-white"
              >
                View All Projects
              </Link>
            </div>
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