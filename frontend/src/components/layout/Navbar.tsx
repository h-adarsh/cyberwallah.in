import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  TerminalSquare,
  X,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuth } from "../../context/AuthProvider";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Blog", path: "/blog" },
  { label: "YouTube", path: "/youtube" },
  { label: "Resources", path: "/resources" },
  { label: "Dictionary", path: "/dictionary" },
  { label: "Quiz", path: "/quiz" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, profile, loading, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen]);

  const displayName =
    profile?.full_name?.trim().split(/\s+/)[0] ||
    user?.email?.split("@")[0] ||
    "Member";
  const initial = (
    profile?.full_name?.trim()?.[0] ||
    user?.email?.[0] ||
    "M"
  ).toUpperCase();

  const handleSignOut = async () => {
    setMenuOpen(false);
    setIsOpen(false);
    await signOut();
    navigate("/");
  };

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass-strong border-b border-[var(--color-border-default)] shadow-[var(--shadow-glass)]"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-8 md:px-16">
        {/* Logo */}
        <NavLink to="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-[var(--shadow-glow-sm)] transition-transform duration-300 group-hover:scale-105">
            <TerminalSquare className="h-5 w-5 text-white" strokeWidth={2.25} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
            Cyber<span className="text-gradient">Wallah</span>
          </span>
        </NavLink>

        {/* Desktop nav links */}
        <div className="hidden flex-1 items-center justify-center gap-0.5 md:flex">
          {NAV_LINKS.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-gradient-primary shadow-[var(--shadow-glow-sm)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Desktop auth cluster */}
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          {loading ? null : user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-xl border border-[var(--color-border-subtle)] py-1.5 pl-1.5 pr-3 transition-colors hover:border-[var(--color-border-strong)]"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-primary text-xs font-bold text-white">
                  {initial}
                </span>
                <span className="max-w-[8rem] truncate text-sm font-medium text-[var(--color-text-primary)]">
                  {displayName}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-[var(--color-text-muted)] transition-transform",
                    menuOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="glass-strong absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-[var(--color-border-default)] p-1 shadow-[var(--shadow-glass)]"
                    role="menu"
                  >
                    <NavLink
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-electric-950)] hover:text-[var(--color-electric-300)]"
                      role="menuitem"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </NavLink>
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-electric-500)]/10 hover:text-[var(--color-text-primary)]"
                      role="menuitem"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                Log in
              </NavLink>
              <NavLink to="/signup">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-glow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-glow-md)]"
                >
                  Sign up
                </motion.button>
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="rounded-lg p-1.5 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden glass-strong border-t border-[var(--color-border-default)] md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 pb-4 pt-2">
              {NAV_LINKS.map(({ label, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={path === "/"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-[var(--color-electric-950)] text-[var(--color-electric-300)]"
                        : "text-[var(--color-text-muted)] hover:bg-[var(--color-electric-500)]/10 hover:text-[var(--color-text-primary)]"
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}

              <div className="my-2 h-px bg-[var(--color-border-subtle)]" />

              {loading ? null : user ? (
                <>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-4 py-3 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-electric-500)]/10 hover:text-[var(--color-text-primary)]"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2.5 rounded-lg px-4 py-3 text-left text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-electric-500)]/10 hover:text-[var(--color-text-primary)]"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-electric-500)]/10 hover:text-[var(--color-text-primary)]"
                  >
                    Log in
                  </NavLink>
                  <NavLink to="/signup" onClick={() => setIsOpen(false)}>
                    <button className="mt-1 w-full rounded-xl bg-gradient-primary px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow-sm)]">
                      Sign up
                    </button>
                  </NavLink>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
