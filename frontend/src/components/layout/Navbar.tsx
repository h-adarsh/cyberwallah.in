import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Dictionary", path: "/dictionary" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Security Explained", path: "/security-explained" },
  { label: "Contact Us", path: "/contact-us" },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0D0D0D] border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-16 h-16 flex items-center gap-8">
        <NavLink
          to="/"
          className="text-white font-bold text-lg tracking-tight mr-4 shrink-0"
        >
          CyberWallah
        </NavLink>

        <div className="flex items-center gap-1 flex-1 justify-center">
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

        <NavLink to="/join">
          <button className="bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-1.5">
            Join Free <ArrowRight size={14} />
          </button>
        </NavLink>
      </div>
    </nav>
  );
}