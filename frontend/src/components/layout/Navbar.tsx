import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Dictionary", path: "/dictionary" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Security Explained", path: "/security-explained" },
  { label: "Contact Us", path: "/contact-us" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0D0D0D] border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-white font-bold text-lg tracking-tight shrink-0"
        >
          CyberWallah
        </NavLink>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {NAV_LINKS.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <NavLink to="/join" className="hidden md:block">
          <button className="bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-1.5">
            Join Free <ArrowRight size={14} />
          </button>
        </NavLink>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="md:hidden text-gray-400 hover:text-white transition-colors p-1"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0D0D0D] border-t border-white/5 px-4 pb-4">
          <div className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "text-white bg-white/5" : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <NavLink to="/join" onClick={() => setIsOpen(false)}>
              <button className="mt-2 w-full bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-semibold px-5 py-3 rounded-xl flex items-center justify-center gap-1.5">
                Join Free <ArrowRight size={14} />
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
