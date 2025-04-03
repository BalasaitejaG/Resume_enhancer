
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-12">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-resume-indigo"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
              <path d="M10 9H8" />
            </svg>
            <span className="text-lg font-bold tracking-tighter">
              Resume<span className="text-resume-blue">AI</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Enhancing your resume with the power of AI.
          </p>
        </div>
        <div>
          <h3 className="font-medium mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-resume-blue transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/enhance" className="text-muted-foreground hover:text-resume-blue transition-colors">
                Enhance Resume
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-resume-blue transition-colors">
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="text-muted-foreground hover:text-resume-blue transition-colors">
                Resume Tips
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-resume-blue transition-colors">
                Career Advice
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-resume-blue transition-colors">
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="text-muted-foreground hover:text-resume-blue transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-resume-blue transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 pt-8 border-t">
        <p className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} ResumeAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
