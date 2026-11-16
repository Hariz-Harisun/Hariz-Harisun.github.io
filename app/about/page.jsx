// app/about/page.jsx
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowUp, FaAward, FaGraduationCap, FaCode, FaCog, FaBrain, FaServer, FaCloud } from 'react-icons/fa';
import { NAV, NAV_CTA } from '@/data/nav';
import { SOCIALS } from '@/data/socials';
import { SKILL_CATEGORIES } from '@/data/skills';

export const metadata = {
  title: 'About — M. Hariz Hazril',
  description: 'Software engineer and technologist focused on Industrial IoT, AI integration, MES/ERP/MIS enterprise systems, and legacy modernisation. Physics graduate from USM.',
};

const card = 'rounded-3xl bg-gradient-to-b from-[#2a2a2a] to-[#222] border border-white/5';

function SectionTitle({ children, icon: Icon }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <Icon className="text-amber-400" size={28} aria-hidden="true" />
      <h2 className="text-2xl font-bold tracking-tight">{children}</h2>
    </div>
  );
}

function TimelineItem({ date, title, description, icon: Icon }) {
  return (
    <div className="relative pl-8 pb-10 border-l border-white/10 last:pb-0 last:border-0">
      <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#141414] border border-white/10">
        <Icon className="text-amber-400" size={16} aria-hidden="true" />
      </div>
      <p className="text-sm text-white/50 mb-1">{date}</p>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-white/70">{description}</p>
    </div>
  );
}

export default function About() {
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
                className={`transition hover:text-white ${n.href === '/about' ? 'text-white' : 'text-white/60'}`}
                aria-current={n.href === '/about' ? 'page' : undefined}
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

        <main className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Profile Card */}
            <div className={`${card} p-6 text-center`}>
              <div className="relative w-36 h-36 mx-auto mb-4 rounded-2xl overflow-hidden ring-2 ring-white/10">
                <Image
                  src="/profile.jpg"
                  alt="M. Hariz Hazril"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <h1 className="text-2xl font-bold">M. Hariz Hazril</h1>
              <p className="mt-1 text-white/70">Software Engineer & Technologist</p>
              <p className="mt-3 text-sm text-white/50">Physics grad · USM 2025</p>
              <div className="mt-6 flex justify-center gap-4">
                {SOCIALS.filter((s) => s.external).map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/60 hover:text-amber-400 transition"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <nav className={`${card} p-6`} aria-label="Quick links">
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#who-i-am" className="text-white/70 hover:text-amber-400 transition">Who I Am</a></li>
                <li><a href="#what-i-do" className="text-white/70 hover:text-amber-400 transition">What I Do</a></li>
                <li><a href="#technical-focus" className="text-white/70 hover:text-amber-400 transition">Technical Focus</a></li>
                <li><a href="#education" className="text-white/70 hover:text-amber-400 transition">Education</a></li>
                <li><a href="#awards" className="text-white/70 hover:text-amber-400 transition">Honours & Awards</a></li>
                <li><a href="/contact" className="text-amber-400 font-medium">Contact Me →</a></li>
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <article className="space-y-12">
            {/* Who I Am */}
            <section id="who-i-am" className={`${card} p-8`}>
              <SectionTitle icon={FaCode}>Who I Am</SectionTitle>
              <div className="prose prose-invert max-w-none text-white/80 leading-7">
                <p className="text-lg">
                  I&apos;m a software engineer and technologist with a background in pure physics. My work sits at the intersection of
                  <strong className="text-white">industrial systems</strong>, <strong className="text-white">enterprise software</strong>, and <strong className="text-white">AI automation</strong>.
                </p>
                <p className="mt-4">
                  I build and modernise <strong className="text-white">MES</strong>, <strong className="text-white">ERP</strong>, and <strong className="text-white">MIS</strong> platforms that run factory floors, supply chains, and management reporting.
                  My focus is on reliability — systems that keep running, scale under load, and fail gracefully. A legacy MES modernisation I led
                  <strong className="text-amber-400">cut client support tickets by 98%</strong>, down to 1–2 per month.
                </p>
                <p className="mt-4">
                  Lately I&apos;m deep in <strong className="text-white">agentic engineering</strong> — designing <strong className="text-white">MCP</strong> (Model Context Protocol) architectures,
                  building tool orchestration layers, and automating workflows with LLM-driven agents. I believe the next wave of industrial software
                  will be defined by how well we integrate AI reasoning into deterministic control systems.
                </p>
              </div>
            </section>

            {/* What I Do */}
            <section id="what-i-do" className={`${card} p-8`}>
              <SectionTitle icon={FaCog}>What I Do</SectionTitle>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <h3 className="font-semibold text-lg flex items-center gap-2"><FaServer className="text-amber-400" size={20} aria-hidden="true" /> Legacy Modernisation</h3>
                  <p className="mt-2 text-white/70">Strangler-fig migrations, domain-driven redesign, zero-downtime cutovers from .NET Framework to .NET 8+.</p>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <h3 className="font-semibold text-lg flex items-center gap-2"><FaCloud className="text-amber-400" size={20} aria-hidden="true" /> Industrial IoT Integration</h3>
                  <p className="mt-2 text-white/70">Edge gateways, protocol translation (OPC-UA, MQTT, Modbus), cloud sync with store-and-forward resilience.</p>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <h3 className="font-semibold text-lg flex items-center gap-2"><FaBrain className="text-amber-400" size={20} aria-hidden="true" /> AI & Agentic Workflows</h3>
                  <p className="mt-2 text-white/70">MCP server development, tool orchestration, RAG for technical docs, LLM-driven automation pipelines.</p>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <h3 className="font-semibold text-lg flex items-center gap-2"><FaCog className="text-amber-400" size={20} aria-hidden="true" /> Enterprise Systems</h3>
                  <p className="mt-2 text-white/70">MES/ERP/MIS architecture, multi-tenant SaaS, real-time dashboards, reporting engines.</p>
                </div>
              </div>
            </section>

            {/* Technical Focus */}
            <section id="technical-focus" className={`${card} p-8`}>
              <SectionTitle icon={FaCog}>Technical Focus</SectionTitle>
              <div className="space-y-8">
                {SKILL_CATEGORIES.map(({ category, skills }) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-amber-400 mb-3">{category}</h3>
                    <ul className="flex flex-wrap gap-2">
                      {skills.map(({ name, Icon, color }) => (
                        <li key={name} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-sm text-white/80">
                          <Icon size={14} style={{ color }} aria-hidden="true" />
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section id="education" className={`${card} p-8`}>
              <SectionTitle icon={FaGraduationCap}>Education</SectionTitle>
              <div className="space-y-6">
                <TimelineItem
                  date="2021–2025"
                  title="B.Sc. (Hons.) Pure Physics, Minor in Computer Science"
                  description="Universiti Sains Malaysia. Focus: computational physics, numerical methods, data analysis. Final year project: Monte Carlo simulation of particle detectors."
                  icon={FaGraduationCap}
                />
                <TimelineItem
                  date="2020–2021"
                  title="Matriculation (Kolej Matrikulasi Kedah)"
                  description="Pre-university programme in physical sciences. Awarded Computational Thinking Award at APS Selangor State Level (2019)."
                  icon={FaAward}
                />
              </div>
            </section>

            {/* Awards */}
            <section id="awards" className={`${card} p-8`}>
              <SectionTitle icon={FaAward}>Honours & Awards</SectionTitle>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <FaAward className="text-amber-400 mt-1" size={24} aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold">Best Freelancer Award (Male)</h3>
                    <p className="text-white/70">MOHE-MDEC Global Outsourcing Talent (GOT) Bootcamp — August 2024</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <FaAward className="text-amber-400 mt-1" size={24} aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold">Computational Thinking Award</h3>
                    <p className="text-white/70">APS Selangor State Level — 2019</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* CTA */}
            <div className="text-center pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#2a2a2a] px-8 py-3.5 font-medium transition hover:bg-[#363636]"
              >
                Get in touch <FaArrowUp className="rotate-45" size={16} />
              </Link>
            </div>
          </article>
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