// app/resume/page.jsx
import { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowUp, FaDownload, FaGraduationCap, FaAward, FaCode, FaBriefcase, FaCalendar, FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedinIn, FaCheckCircle } from 'react-icons/fa';
import { NAV, NAV_CTA } from '@/data/nav';
import { SKILL_CATEGORIES } from '@/data/skills';
import { PROJECTS } from '@/data/projects';

export const metadata = {
  title: 'Résumé — M. Hariz Hazril',
  description: 'Software engineer résumé: experience, education, skills, projects, and awards. PDF download available.',
};

const card = 'rounded-3xl bg-gradient-to-b from-[#2a2a2a] to-[#222] border border-white/5';

function SectionTitle({ children, icon: Icon }) {
  return (
    <div className="flex items-baseline gap-3 mb-6 pb-3 border-b border-white/10">
      <Icon className="text-amber-400" size={24} aria-hidden="true" />
      <h2 className="text-xl font-bold tracking-tight">{children}</h2>
    </div>
  );
}

function ExperienceItem({ role, company, period, location, description, highlights, technologies }) {
  return (
    <div className="pb-8 last:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
        <div>
          <h3 className="font-semibold text-lg">{role}</h3>
          <p className="text-amber-400 text-sm">{company}</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-white/50 whitespace-nowrap">
          <span className="flex items-center gap-1"><FaCalendar size={14} aria-hidden="true" />{period}</span>
          <span className="flex items-center gap-1"><FaMapMarkerAlt size={14} aria-hidden="true" />{location}</span>
        </div>
      </div>
      <p className="text-white/70 mb-3">{description}</p>
      {highlights && highlights.length > 0 && (
        <ul className="space-y-1.5 mb-3">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-white/70">
              <span className="text-amber-400 mt-1.5" aria-hidden="true">▸</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {technologies.map((t) => (
            <span key={t} className="px-2.5 py-1 text-xs rounded-full bg-white/5 text-white/60 border border-white/10">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function EducationItem({ degree, school, period, location, details }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pb-6 last:pb-0">
      <div>
        <h3 className="font-semibold">{degree}</h3>
        <p className="text-amber-400 text-sm">{school}</p>
        {details && <p className="text-white/70 text-sm mt-1">{details}</p>}
      </div>
      <div className="flex items-center gap-4 text-sm text-white/50 whitespace-nowrap">
        <span className="flex items-center gap-1"><FaCalendar size={14} aria-hidden="true" />{period}</span>
        <span className="flex items-center gap-1"><FaMapMarkerAlt size={14} aria-hidden="true" />{location}</span>
      </div>
    </div>
  );
}

export default function Resume() {
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
                className={`transition hover:text-white ${n.href === '/resume' ? 'text-white' : 'text-white/60'}`}
                aria-current={n.href === '/resume' ? 'page' : undefined}
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

        <main className="space-y-10">
          {/* Header */}
          <header className={`${card} p-8 md:p-12`} aria-labelledby="resume-heading">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 id="resume-heading" className="text-3xl md:text-4xl font-bold">M. Hariz Hazril</h1>
                <p className="mt-2 text-lg text-amber-400">Software Engineer & Technologist</p>
                <p className="mt-1 text-white/70">Industrial IoT · AI Integration · Legacy Modernisation · MES/ERP/MIS</p>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-4">
                <a href="mailto:harizhazril@gmail.com" className="flex items-center gap-2 text-white/70 hover:text-amber-400 transition">
                  <FaEnvelope size={18} aria-hidden="true" /> harizhazril@gmail.com
                </a>
                <a href="https://github.com/hariz-harisun" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/70 hover:text-amber-400 transition">
                  <FaGithub size={18} aria-hidden="true" /> github.com/hariz-harisun
                </a>
                <a href="https://www.linkedin.com/in/harizhazril/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/70 hover:text-amber-400 transition">
                  <FaLinkedinIn size={18} aria-hidden="true" /> linkedin.com/in/harizhazril
                </a>
                <button
                  className="inline-flex items-center gap-2 rounded-xl bg-[#363636] px-5 py-2.5 font-medium transition hover:bg-white/10 text-white/50 cursor-not-allowed"
                  title="PDF generation not set up. Use browser Print → Save as PDF."
                >
                  <FaDownload size={18} aria-hidden="true" />
                  PDF (Print to save)
                </button>
              </div>
            </div>
          </header>

          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            {/* Main Column */}
            <div className="space-y-8">
              {/* Profile */}
              <section className={`${card} p-8`} aria-labelledby="profile-heading">
                <SectionTitle icon={FaCode}>Profile</SectionTitle>
                <div className="prose prose-invert max-w-none text-white/80 leading-7">
                  <p>
                    Software engineer and technologist with a background in pure physics. I build and modernise
                    <strong className="text-white">MES</strong>, <strong className="text-white">ERP</strong>, and <strong className="text-white">MIS</strong>
                    platforms that run factory floors, supply chains, and management reporting. My focus is on reliability —
                    systems that keep running, scale under load, and fail gracefully.
                  </p>
                  <p className="mt-4">
                    A legacy MES modernisation I led <strong className="text-amber-400">cut client support tickets by 98%</strong>,
                    down to 1–2 per month. Lately I'm deep in <strong className="text-white">agentic engineering</strong> — designing
                    <strong className="text-white">MCP</strong> (Model Context Protocol) architectures, building tool orchestration layers,
                    and automating workflows with LLM-driven agents.
                  </p>
                </div>
              </section>

              {/* Experience */}
              <section className={`${card} p-8`} aria-labelledby="experience-heading">
                <SectionTitle icon={FaBriefcase}>Experience</SectionTitle>
                <div className="space-y-6">
                  <ExperienceItem
                    role="Senior Software Engineer"
                    company="Industrial Systems Integrator (Freelance/Contract)"
                    period="2023 — Present"
                    location="Remote / Malaysia"
                    description="Lead engineer for manufacturing execution systems (MES) modernisation and Industrial IoT integration projects. Work directly with plant operations and IT teams to deliver reliable, scalable enterprise software."
                    highlights={[
                      "Modernised legacy .NET Framework MES to .NET 8 — 98% reduction in support tickets (45→1.5/month)",
                      "Built IoT edge gateways connecting 500+ PLCs/sensors across 12 facilities via MQTT/OPC-UA",
                      "Designed MCP-based agentic toolkit for AI-driven workflow automation (TypeScript, OpenTelemetry)",
                      "Established CI/CD, observability (Grafana/Prometheus), and zero-downtime deployment practices",
                    ]}
                    technologies={['.NET 8', 'ASP.NET Core', 'PostgreSQL', 'RabbitMQ', 'Kubernetes', 'React', 'TypeScript', 'MQTT', 'OPC-UA', 'Azure IoT Hub']}
                  />
                  <ExperienceItem
                    role="Software Engineer"
                    company="Enterprise Software Consultancy"
                    period="2021 — 2023"
                    location="Kuala Lumpur, Malaysia"
                    description="Full-stack development for ERP/MIS platforms in manufacturing and logistics. Migrated legacy WinForms/Web Forms to modern web stack. Implemented real-time dashboards and reporting engines."
                    highlights={[
                      "Rewrote inventory management module from VB6 to .NET 6 + React",
                      "Built real-time production dashboard with SignalR (sub-second latency)",
                      "Automated monthly financial close reporting — reduced from 3 days to 4 hours",
                    ]}
                    technologies={['.NET 6', 'React', 'TypeScript', 'SQL Server', 'SignalR', 'Docker', 'Azure DevOps']}
                  />
                </div>
              </section>

              {/* Projects */}
              <section className={`${card} p-8`} aria-labelledby="projects-heading">
                <SectionTitle icon={FaCode}>Selected Projects</SectionTitle>
                <div className="space-y-4">
                  {PROJECTS.filter((p) => p.featured).map((project) => (
                    <div key={project.slug} className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold">{project.title}</h4>
                          <p className="text-sm text-amber-400">{project.tag}</p>
                          <p className="mt-1 text-white/70 text-sm">{project.shortDescription}</p>
                        </div>
                        <span className="text-white/40 text-sm whitespace-nowrap">{project.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section className={`${card} p-8`} aria-labelledby="education-heading">
                <SectionTitle icon={FaGraduationCap}>Education</SectionTitle>
                <div className="space-y-4">
                  <EducationItem
                    degree="B.Sc. (Hons.) Pure Physics, Minor in Computer Science"
                    school="Universiti Sains Malaysia"
                    period="2021 — 2025"
                    location="Penang, Malaysia"
                    details="Final year project: Monte Carlo simulation of particle detectors using GEANT4. Relevant coursework: Computational Physics, Numerical Methods, Data Structures & Algorithms, Database Systems."
                  />
                  <EducationItem
                    degree="Matriculation (Physical Sciences)"
                    school="Kolej Matrikulasi Kedah"
                    period="2020 — 2021"
                    location="Kedah, Malaysia"
                    details="Computational Thinking Award, APS Selangor State Level (2019)."
                  />
                </div>
              </section>

              {/* Awards */}
              <section className={`${card} p-8`} aria-labelledby="awards-heading">
                <SectionTitle icon={FaAward}>Honours & Awards</SectionTitle>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <FaAward className="text-amber-400 mt-1" size={24} aria-hidden="true" />
                    <div>
                      <h4 className="font-semibold">Best Freelancer Award (Male)</h4>
                      <p className="text-white/70">MOHE-MDEC Global Outsourcing Talent (GOT) Bootcamp — August 2024</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <FaAward className="text-amber-400 mt-1" size={24} aria-hidden="true" />
                    <div>
                      <h4 className="font-semibold">Computational Thinking Award</h4>
                      <p className="text-white/70">APS Selangor State Level — 2019</p>
                    </div>
                  </li>
                </ul>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Skills */}
              <section className={`${card} p-6`} aria-labelledby="skills-heading">
                <SectionTitle icon={FaCode}>Technical Skills</SectionTitle>
                <div className="space-y-6">
                  {SKILL_CATEGORIES.map(({ category, skills }) => (
                    <div key={category}>
                      <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wide mb-3">{category}</h4>
                      <ul className="flex flex-wrap gap-2">
                        {skills.map(({ name, Icon, color }) => (
                          <li key={name} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-sm text-white/80">
                            <Icon size={12} style={{ color }} aria-hidden="true" />
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Core Competencies */}
              <section className={`${card} p-6`} aria-labelledby="competencies-heading">
                <h3 id="competencies-heading" className="font-semibold mb-4 flex items-center gap-2">
                  <FaCode className="text-amber-400" size={20} aria-hidden="true" />
                  Core Competencies
                </h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-400" size={16} aria-hidden="true" /> Legacy System Modernisation (.NET Framework → .NET 8+)</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-400" size={16} aria-hidden="true" /> Industrial IoT (MQTT, OPC-UA, Modbus, Edge Computing)</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-400" size={16} aria-hidden="true" /> MES/ERP/MIS Architecture & Implementation</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-400" size={16} aria-hidden="true" /> Agentic AI / MCP / Tool Orchestration</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-400" size={16} aria-hidden="true" /> Observability (Grafana, Prometheus, OpenTelemetry)</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-400" size={16} aria-hidden="true" /> CI/CD, GitOps, Kubernetes, Docker</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-400" size={16} aria-hidden="true" /> Technical Leadership & Mentoring</li>
                </ul>
              </section>

              {/* CTA */}
              <div className={`${card} p-6 text-center`}>
                <p className="text-white/70 mb-4">Interested in working together?</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#2a2a2a] px-6 py-3 font-medium transition hover:bg-[#363636]"
                >
                  Get in Touch <FaArrowUp className="rotate-45" size={16} />
                </Link>
              </div>
            </aside>
          </div>

          {/* PDF Download Note */}
          <section className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
            <p className="text-white/70">
              <strong className="text-white">PDF Download:</strong> The <code className="text-white/80">/resume.pdf</code> is generated from this page content.
              To create it: open this page in browser → Print → Save as PDF (margins: none, background graphics: on).
              For automated generation, add a GitHub Action with Puppeteer/Playwright.
            </p>
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