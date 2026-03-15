import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Contact from "./pages/Contact";
import Dictionary from "./pages/Dictionary";
import DictionaryDetail from "./pages/DictionaryDetail";
import CaseStudies from "./pages/CaseStudies";
import SecurityExplained from "./pages/SecurityExplained";
import NotFound from "./pages/NotFound";
import ComingSoon from "./pages/Join";

function RootLayout() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
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
      { path: "quiz", element: <Quiz /> },
      { path: "contact-us", element: <Contact /> },
      { path: "dictionary", element: <Dictionary /> },
      { path: "dictionary/:slug", element: <DictionaryDetail /> },
      { path: "case-studies", element: <CaseStudies /> },
      { path: "security-explained", element: <SecurityExplained /> },
      { path: "coming-soon", element: <ComingSoon /> },
      { path: "join", element: <ComingSoon /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}