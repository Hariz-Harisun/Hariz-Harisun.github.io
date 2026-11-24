// app/skills/page.jsx
import { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowUp, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { NAV, NAV_CTA } from '@/data/nav';
import { SKILL_CATEGORIES, ALL_SKILLS } from '@/data/skills';
import { SOCIALS } from '@/data/socials';

export const metadata = {
  title: 'Skills — M. Hariz Hazril',
  description: 'Technical skills across backend/.NET, frontend, industrial IoT, AI & agents, and DevOps tools. Grouped by category with icons.',
};

const card = 'rounded-3xl bg-gradient-to-b from-[#2a2a2a] to-[#222] border border-white/5';

function SectionTitle({ children, icon: Icon }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      {Icon && <Icon className="text-amber-400" size={28} aria-hidden="true" />}
      <h2 className="text-2xl font-bold tracking-tight">{children}</h2>
    </div>
  );
}

function SkillCard({ name, Icon, color, description }) {
  return (
    <div className="group relative p-5 rounded-2xl bg-white/5 border border-white/5 transition hover:border-amber-400/50 hover:bg-white/10">
      <div className="flex items-center gap-3 mb-3">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10" aria-hidden="true">
          <Icon size={24} style={{ color }} />
        </div>
        <h3 className="font-semibold text-lg">{name}</h3>
      </div>
      {description && (
        <p className="text-white/60 text-sm line-clamp-2">{description}</p>
      )}
    </div>
  );
}

export default function Skills() {
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
                className={`transition hover:text-white ${n.href === '/skills' ? 'text-white' : 'text-white/60'}`}
                aria-current={n.href === '/skills' ? 'page' : undefined}
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
          <section className={`${card} p-10 md:p-16 text-center`} aria-labelledby="skills-hero">
            <h1 id="skills-hero" className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Technical <span className="text-amber-400">Skills</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              A pragmatic toolkit built over years of shipping industrial systems, enterprise platforms, and AI-driven workflows.
              Grouped by domain — not just a keyword list.
            </p>
            <p className="mt-6 text-sm text-white/50">{ALL_SKILLS.length} technologies across {SKILL_CATEGORIES.length} categories</p>
          </section>

          {/* Categories */}
          <section className="space-y-5" aria-labelledby="skills-categories">
            {SKILL_CATEGORIES.map(({ category, skills }) => (
              <div key={category} className={`${card} p-8`}>
                <SectionTitle>{category}</SectionTitle>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
                  {skills.map(({ name, Icon, color }) => (
                    <li key={name}>
                      <SkillCard name={name} Icon={Icon} color={color} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Philosophy */}
          <section className={`${card} p-8 md:p-12`} aria-labelledby="skills-philosophy">
            <SectionTitle>How I Choose Tools</SectionTitle>
            <div className="prose prose-invert max-w-none text-white/80 leading-7 space-y-4">
              <p>
                <strong className="text-white">Right tool for the job</strong> — not the trendiest. I default to battle-tested stacks (.NET, PostgreSQL, React)
                because they&apos;re predictable, well-supported, and hireable.
              </p>
              <p>
                <strong className="text-white">Boring architecture, exciting outcomes</strong> — monoliths first, extract services when pain demands it.
                Event-driven where latency matters; request-response where simplicity wins.
              </p>
              <p>
                <strong className="text-white">Observability by default</strong> — structured logs, metrics, traces. If you can&apos;t see it, you can&apos;t fix it.
              </p>
              <p>
                <strong className="text-white">AI as a force multiplier</strong> — MCP for tool exposure, agents for orchestration, RAG for knowledge retrieval.
                The model reasons; the tools execute deterministically.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#2a2a2a] px-8 py-3.5 font-medium transition hover:bg-[#363636]"
            >
              See these in action → <FaArrowUp className="rotate-45" size={16} />
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