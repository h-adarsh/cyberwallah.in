import { NavLink } from "react-router-dom";
import { TerminalSquare, Youtube, Instagram, Linkedin, Twitter, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const COLUMNS: { heading: string; links: { label: string; path: string }[] }[] = [
  {
    heading: "Explore",
    links: [
      { label: "Home", path: "/" },
      { label: "Blog", path: "/blog" },
      { label: "YouTube", path: "/youtube" },
      { label: "Resources", path: "/resources" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "Dictionary", path: "/dictionary" },
      { label: "Quiz", path: "/quiz" },
      { label: "Case Studies", path: "/blog" },
      { label: "About", path: "/about" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Newsletter", path: "/newsletter" },
      { label: "Contact", path: "/contact" },
    ],
  },
];

// NOTE: replace these with your real handles.
const SOCIALS: { label: string; Icon: LucideIcon; href: string }[] = [
  { label: "YouTube", Icon: Youtube, href: "https://youtube.com/@cyberwallah" },
  { label: "X / Twitter", Icon: Twitter, href: "https://x.com/cyberwallah" },
  { label: "Instagram", Icon: Instagram, href: "https://instagram.com/cyberwallah" },
  { label: "LinkedIn", Icon: Linkedin, href: "https://linkedin.com/company/cyberwallah" },
  { label: "Telegram", Icon: Send, href: "https://t.me/cyberwallah" },
];

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-[var(--color-border-subtle)]">
      {/* top gradient hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border-glow)] to-transparent" />

      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-10 px-4 py-14 sm:px-8 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:px-16">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <NavLink to="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-[var(--shadow-glow-sm)]">
              <TerminalSquare className="h-5 w-5 text-white" strokeWidth={2.25} />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
              Cyber<span className="text-gradient">Wallah</span>
            </span>
          </NavLink>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-text-muted)]">
            India's go-to destination for cybersecurity knowledge — built by the community,
            for the community. Free, always.
          </p>

          {/* Socials */}
          <div className="mt-6 flex items-center gap-2.5">
            {SOCIALS.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 text-[var(--color-text-muted)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-border-glow)] hover:text-[var(--color-electric-400)]"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {COLUMNS.map(({ heading, links }) => (
          <div key={heading}>
            <h4 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">{heading}</h4>
            <div className="mt-4 flex flex-col gap-2.5">
              {links.map(({ label, path }) => (
                <NavLink
                  key={label}
                  to={path}
                  className="w-fit text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-electric-400)]"
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-border-subtle)]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-4 py-5 sm:flex-row sm:px-8 md:px-16">
          <span className="text-sm text-[var(--color-text-dim)]">
            © 2026 CyberWallah. Made with <span className="text-[var(--color-danger)]">❤</span> in India.
          </span>
          <span className="font-mono text-sm text-gradient">cyberwallah.in</span>
        </div>
      </div>
    </footer>
  );
}
