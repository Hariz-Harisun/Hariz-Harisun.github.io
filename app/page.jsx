// app/page.jsx
import Link from 'next/link';
import { DM_Sans, Caveat } from 'next/font/google';
import {
  FaGithub,
  FaLinkedinIn,
  FaRegEnvelope,
  FaRegFileAlt,
  FaArrowUp,
} from 'react-icons/fa';
import {
  SiDotnet,
  SiSharp,
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiTailwindcss,
  SiDocker,
  SiGithub,
  SiAnthropic,
} from 'react-icons/si';
import { NAV, NAV_CTA } from '@/data/nav';
import { SOCIALS } from '@/data/socials';
import { ALL_SKILLS } from '@/data/skills';
import { PROJECTS } from '@/data/projects';

const sans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'] });
const hand = Caveat({ subsets: ['latin'], weight: ['500'] });

const card = 'rounded-3xl bg-gradient-to-b from-[#2a2a2a] to-[#222] border border-white/5';

function ArrowButton({ href, label }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full bg-white text-black transition hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
    >
      <FaArrowUp className="rotate-45" size={13} />
    </Link>
  );
}

export default function Home() {
  return (
    <div className={`${sans.className} min-h-screen bg-[#141414] text-white`}>
      <div className="mx-auto max-w-[1260px] px-5 pb-16">
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
                className="transition hover:text-white"
                aria-current={n.href === '/' ? 'page' : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link
            href={NAV_CTA.href}
            className="rounded-2xl bg-[#2a2a2a] px-8 py-3.5 font-medium transition hover:bg-[#363636] focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
          >
            {NAV_CTA.label}
          </Link>
        </header>

        <main className="grid gap-5">
          {/* Row 1 */}
          <section
            className="grid gap-5 xl:h-[var(--h)] xl:grid-cols-[1fr_var(--h)_1.2fr] xl:[--h:23rem] lg:grid-cols-[1fr_0.8fr_1.2fr]"
            aria-labelledby="hero-heading"
          >
            {/* Intro */}
            <div className={`${card} relative flex flex-col p-7`}>
              <div className="relative z-10 flex flex-1 flex-col pointer-events-none">
                <p className="text-white/70">Software Engineer</p>
                <h1 id="hero-heading" className="mt-1 text-5xl font-bold leading-[1.05] tracking-tight">
                  M. Hariz
                  <br />
                  Hazril
                </h1>
                <p className={`${hand.className} mt-5 text-[22px] leading-6 text-white/85`}>
                  Physics graduate turned engineer, building .NET systems that connect factory-floor
                  devices, enterprise software and AI automation.
                </p>
                <Link
                  href="/about"
                  aria-label="About me"
                  className="mt-auto flex justify-end pt-6 pointer-events-auto"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-black transition hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400">
                    <FaArrowUp className="rotate-45" size={13} />
                  </span>
                </Link>
              </div>
              <Link
                href="/about"
                aria-label="About me"
                className="absolute inset-0 z-0 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
              />
            </div>

            {/* Social tiles */}
            <div className="grid h-full grid-cols-2 grid-rows-2 gap-5" role="list" aria-label="Social links">
              {SOCIALS.map(({ label, href, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className={`${card} grid h-full w-full place-items-center text-white/90 transition hover:text-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400`}
                >
                  <Icon size={44} aria-hidden="true" />
                </a>
              ))}
            </div>

            {/* Tagline */}
            <div className={`${card} flex items-start p-6`}>
              <h2 className="tagline text-4xl font-bold leading-[1.1] tracking-tight text-amber-400 xl:text-5xl">
                Struimus quod semper stat
              </h2>
            </div>
          </section>

          {/* Row 2 */}
          <section className="grid gap-5 lg:grid-cols-[1fr_2.2fr_1.2fr]">
            {/* Skills */}
            <div className={`${card} relative flex flex-col p-6`}>
              <div className="relative z-10 flex flex-1 flex-col pointer-events-none">
                <ul className="grid grid-cols-4 gap-x-3 gap-y-5 p-2" role="list" aria-label="Core skills">
                  {ALL_SKILLS.slice(0, 12).map(({ name, Icon, color }) => (
                    <li key={name} title={name} className="grid place-items-center">
                      <Icon size={30} style={{ color }} aria-label={name} />
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-end justify-between pt-6">
                  <div>
                    <p className="text-sm text-white/60">Most used</p>
                    <p className="text-3xl font-bold">Skills</p>
                  </div>
                  <div className="pointer-events-auto">
                    <ArrowButton href="/skills" label="All skills" />
                  </div>
                </div>
              </div>
              <Link
                href="/skills"
                aria-label="All skills"
                className="absolute inset-0 z-0 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
              />
            </div>

            {/* Projects */}
            <div className={`${card} relative flex flex-col overflow-hidden p-6`}>
              <div className="relative z-10 flex flex-1 flex-col pointer-events-none">
                <div className="relative flex flex-1 items-center justify-center gap-6 py-4">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-2 select-none whitespace-nowrap text-center text-6xl font-bold uppercase text-white/10"
                >
                  My Works &nbsp; My Works
                </span>
                {PROJECTS.filter((p) => p.featured).slice(0, 2).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/work/${p.slug}`}
                    className="pointer-events-auto relative z-10 w-52 rounded-t-xl border border-white/10 bg-gradient-to-br from-[#3a2f5c] to-[#1c1c28] p-4 shadow-xl transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
                  >
                    <p className="text-lg font-bold leading-tight">{p.title}</p>
                    <p className="mt-1 text-xs text-white/60">{p.tag}</p>
                    <div className="mt-6 h-16 rounded-md bg-white/5" />
                  </Link>
                ))}
                </div>
                <div className="flex items-end justify-between pt-4">
                  <div>
                    <p className="text-sm text-white/60">Showcase</p>
                    <p className="text-3xl font-bold">Projects</p>
                  </div>
                  <div className="pointer-events-auto">
                    <ArrowButton href="/work" label="All projects" />
                  </div>
                </div>
              </div>
              <Link
                href="/work"
                aria-label="All projects"
                className="absolute inset-0 z-0 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
              />
            </div>

            {/* Blog */}
            <div className={`${card} relative flex flex-col p-6`}>
              <div className="relative z-10 flex flex-1 flex-col pointer-events-none">
                <Link href="/blog" className="pointer-events-auto flex-1 rounded-2xl bg-gradient-to-br from-amber-400/90 to-orange-600/80 p-5 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400">
                  <p className="text-sm font-medium">Latest post</p>
                  <p className="mt-2 text-2xl font-bold leading-tight">Notes on agentic engineering and MCP</p>
                </Link>
                <div className="flex items-end justify-between pt-5">
                  <div>
                    <p className="text-sm text-white/60">Writing</p>
                    <p className="text-3xl font-bold">Blog</p>
                  </div>
                  <div className="pointer-events-auto">
                    <ArrowButton href="/blog" label="Read the blog" />
                  </div>
                </div>
              </div>
              <Link
                href="/blog"
                aria-label="Read the blog"
                className="absolute inset-0 z-0 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
              />
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
              <Link
                key={n.label}
                href={n.href}
                className="transition hover:text-white"
              >
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