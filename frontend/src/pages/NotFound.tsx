import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="max-w-xl mx-auto px-6 py-32 text-center">
      <p className="text-blue-500 font-mono text-sm mb-4">404</p>
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-gray-500 mb-10">
        Looks like this page doesn't exist. Maybe it was hacked? 😅
      </p>
      <Button onClick={() => navigate("/")}>Back to Home</Button>
    </section>
  );
}