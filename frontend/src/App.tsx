import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Background } from "./components/layout/Background";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import YouTube from "./pages/YouTube";
import Resources from "./pages/Resources";
import Dictionary from "./pages/Dictionary";
import DictionaryDetail from "./pages/DictionaryDetail";
import Quiz from "./pages/Quiz";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Newsletter from "./pages/Newsletter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import IdCardPublic from "./pages/IdCardPublic";
import NotFound from "./pages/NotFound";

function RootLayout() {
  const location = useLocation();

  return (
    <div className="relative flex min-h-screen flex-col font-body text-[var(--color-text-primary)] antialiased">
      <Background />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "blog", element: <Blog /> },
      { path: "en/blog/:slug", element: <BlogPost /> },
      { path: "hi/blog/:slug", element: <BlogPost /> },
      { path: "youtube", element: <YouTube /> },
      { path: "resources", element: <Resources /> },
      { path: "quiz", element: <Quiz /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "contact-us", element: <Contact /> },
      { path: "newsletter", element: <Newsletter /> },
      { path: "dictionary", element: <Dictionary /> },
      { path: "dictionary/:slug", element: <DictionaryDetail /> },
      { path: "case-studies", element: <Blog /> },
      { path: "security-explained", element: <Resources /> },
      { path: "join", element: <Newsletter /> },
      // Auth
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "auth/callback", element: <AuthCallback /> },
      // Public member verification
      { path: "id/:cardNumber", element: <IdCardPublic /> },
      // Protected
      {
        element: <ProtectedRoute />,
        children: [{ path: "dashboard", element: <Dashboard /> }],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  );
}