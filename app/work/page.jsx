// app/work/page.jsx
import { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowUp } from 'react-icons/fa';
import { NAV, NAV_CTA } from '@/data/nav';
import { PROJECTS } from '@/data/projects';

export const metadata = {
  title: 'Work — M. Hariz Hazril',
  description: 'Selected projects: MES modernisation, IoT edge gateways, MCP agent toolkit, and this portfolio. Each with full technical details.',
};

const card = 'rounded-3xl bg-gradient-to-b from-[#2a2a2a] to-[#222] border border-white/5';

function ProjectCard({ project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`${card} flex flex-col h-full p-6 transition hover:border-amber-400/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-xs font-medium text-amber-400 uppercase tracking-wide">{project.tag}</span>
          {project.featured && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-400/20 text-amber-400">Featured</span>
          )}
        </div>
        <span className="text-white/30 text-2xl font-light" aria-hidden="true">{project.year}</span>
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition">{project.title}</h3>
      <p className="text-white/70 flex-1 mb-4">{project.shortDescription}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.techStack.slice(0, 5).map((tech) => (
          <span key={tech} className="px-2.5 py-1 text-xs rounded-full bg-white/5 text-white/60 border border-white/10">
            {tech}
          </span>
        ))}
        {project.techStack.length > 5 && (
          <span className="px-2.5 py-1 text-xs rounded-full bg-white/5 text-white/400 border border-white/10">
            +{project.techStack.length - 5} more
          </span>
        )}
      </div>
    </Link>
  );
}

export default function Work() {
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

        <main className="space-y-12">
          {/* Hero */}
          <section className="text-center" aria-labelledby="work-hero">
            <h1 id="work-hero" className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Selected <span className="text-amber-400">Work</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Real systems shipped for manufacturing, IoT, and AI automation. Each project shows the problem, my role, the stack, and measurable outcomes.
              <strong className="text-amber-400"> Projects marked as placeholders</strong> are representative samples — client names and specifics are anonymised.
            </p>
          </section>

          {/* Project Grid */}
          <section aria-labelledby="projects-list">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>

          {/* Note about placeholders */}
          <section className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
            <p className="text-white/70">
              <strong className="text-white">Note:</strong> {PROJECTS.filter((p) => p.placeholder).length} of {PROJECTS.length} projects are
              representative placeholders based on my actual work domains. I&apos;ll replace them with real case studies (with client permission)
              or sanitised versions. The <strong className="text-amber-400">98% ticket reduction</strong> figure is from my MES modernisation work.
            </p>
          </section>

          {/* CTA */}
          <section className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#2a2a2a] px-8 py-3.5 font-medium transition hover:bg-[#363636]"
            >
              Have a project in mind? <FaArrowUp className="rotate-45" size={16} />
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