import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="max-w-xl mx-auto px-6 py-32 text-center">
      <p className="font-mono text-sm mb-4 text-[var(--color-electric-400)]">404</p>
      <h1 className="font-display text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
        Page Not Found
      </h1>
      <p className="mb-10 text-[var(--color-text-muted)]">
        Looks like this page doesn't exist. Maybe it was hacked? 😅
      </p>
      <Button onClick={() => navigate("/")}>Back to Home</Button>
    </section>
  );
}
