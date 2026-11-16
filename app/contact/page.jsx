// app/contact/page.jsx
import { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowUp, FaEnvelope, FaGithub, FaLinkedinIn, FaCheckCircle } from 'react-icons/fa';
import { NAV, NAV_CTA } from '@/data/nav';
import { SOCIALS, FOOTER_SOCIALS } from '@/data/socials';
import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact — M. Hariz Hazril',
  description: 'Get in touch for consulting, collaboration, or just to say hello. Email, GitHub, LinkedIn, and a working contact form.',
};

const card = 'rounded-3xl bg-gradient-to-b from-[#2a2a2a] to-[#222] border border-white/5';

export default function Contact() {
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
                className={`transition hover:text-white ${n.href === '/contact' ? 'text-white' : 'text-white/60'}`}
                aria-current={n.href === '/contact' ? 'page' : undefined}
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

        <main className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Info Column */}
          <aside className="space-y-6">
            <div className={`${card} p-8 text-center`}>
              <h2 className="text-2xl font-bold mb-2">Let's Talk</h2>
              <p className="text-white/70">
                Whether it's a project inquiry, a technical question, or just saying hello — I'd love to hear from you.
              </p>
            </div>

            <div className={`${card} p-6 space-y-4`} aria-label="Contact methods">
              {SOCIALS.filter((s) => s.external).map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 transition hover:border-amber-400/50 hover:bg-white/10"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/10" aria-hidden="true">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">{label}</p>
                    <p className="font-medium truncate">{href.replace(/^https?:\/\//, '').replace(/^mailto:/, '')}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className={`${card} p-6`}>
              <h3 className="font-semibold mb-4">Availability</h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-amber-400" size={18} aria-hidden="true" />
                  Open to consulting (Industrial IoT, .NET modernisation, AI agents)
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-amber-400" size={18} aria-hidden="true" />
                  Available for speaking/mentoring
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-amber-400" size={18} aria-hidden="true" />
                  Respond within 1–2 business days
                </li>
              </ul>
            </div>
          </aside>

          {/* Form Column */}
          <ContactForm />
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
          <div className="mt-6 flex justify-center gap-6">
            {FOOTER_SOCIALS.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className="text-white/50 hover:text-amber-400 transition"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm text-white/60">
            © {new Date().getFullYear()} M. Hariz Hazril · harizhazril@gmail.com
          </p>
        </footer>
      </div>
    </div>
  );
}