// app/not-found.jsx
import Link from 'next/link';
import { FaArrowUp, FaHome, FaSearch, FaCompass } from 'react-icons/fa';
import { NAV } from '@/data/nav';

const card = 'rounded-3xl bg-gradient-to-b from-[#2a2a2a] to-[#222] border border-white/5';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center px-5">
      <div className="max-w-md w-full text-center">
        <div className={`${card} p-12 md:p-16`}>
          <div className="text-9xl font-bold text-amber-400/20 mb-4" aria-hidden="true">404</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-white/70 mb-8 max-w-sm mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 text-black px-6 py-3 font-medium transition hover:bg-amber-300"
            >
              <FaHome size={18} aria-hidden="true" />
              Go Home
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#2a2a2a] text-white px-6 py-3 font-medium border border-white/10 transition hover:border-amber-400/50 hover:bg-white/5"
            >
              <FaCompass size={18} aria-hidden="true" />
              Browse Blog
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="text-sm text-white/50 mb-4">Or explore the main sections:</p>
            <nav className="flex flex-wrap justify-center gap-3" aria-label="Main sections">
              {NAV.map((n) => (
                <Link
                  key={n.label}
                  href={n.href}
                  className="px-4 py-2 rounded-xl bg-white/5 text-white/70 text-sm border border-white/10 hover:border-amber-400/50 hover:text-white transition"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <p className="mt-6 text-sm text-white/40">
          <FaSearch className="inline mr-1" size={14} aria-hidden="true" />
          Nothing here? <Link href="/contact" className="text-amber-400 hover:underline">Let me know</Link>
        </p>
      </div>
    </div>
  );
}