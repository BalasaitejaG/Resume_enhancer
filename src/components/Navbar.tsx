
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-resume-indigo"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
          <span className="text-xl font-bold tracking-tighter">
            Resume<span className="text-resume-blue">AI</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-resume-blue transition-colors">
            Home
          </Link>
          <Link to="/enhance" className="text-sm font-medium hover:text-resume-blue transition-colors">
            Enhance Resume
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-resume-blue transition-colors">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button className="button-gradient text-white">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
