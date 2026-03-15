import { NavLink } from "react-router-dom";

const FOOTER_LINKS = [
  { label: "Home", path: "/" },
  { label: "Dictionary", path: "/dictionary" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Quiz", path: "/quiz" },
  { label: "Contact Us", path: "/contact-us" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <h4 className="text-white font-semibold mb-3">About Us</h4>
          <p className="text-sm font-semibold text-gray-300 mb-2">
            What is CyberWallah?
          </p>
          <p className="text-gray-500 text-sm leading-relaxed max-w-md">
            India's go-to destination for cybersecurity knowledge — built by
            the community, for the community.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Explore</h4>
          <div className="flex flex-col gap-2">
            {FOOTER_LINKS.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                className="text-gray-500 hover:text-blue-400 text-sm transition-colors w-fit"
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-gray-600 text-sm">
            © 2026 CyberWallah. Made with ❤️ in India.
          </span>
          <span className="text-blue-500 font-semibold text-sm">
            cyberwallah.in
          </span>
        </div>
      </div>
    </footer>
  );
}