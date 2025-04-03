
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none gradient-heading">
                    Transform Your Resume with AI
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Get tailored suggestions, improve your resume's impact, and stand out to employers with our AI-powered resume enhancement tool.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/enhance">
                    <Button className="button-gradient text-white px-8 py-6 text-lg">
                      Enhance Your Resume
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="Resume AI Hero"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-heading">
                  How ResumeAI Works
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered platform analyzes your resume and provides tailored suggestions to help you stand out to employers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-resume-blue to-resume-indigo">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-white"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Upload Your Resume</h3>
                  <p className="text-gray-500">
                    Upload your existing resume in various formats including PDF, DOC, DOCX, or TXT.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-resume-teal to-resume-blue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-white"
                  >
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                    <line x1="16" y1="8" x2="2" y2="22" />
                    <line x1="17.5" y1="15" x2="9" y2="15" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">AI Analysis</h3>
                  <p className="text-gray-500">
                    Our AI analyzes your resume for strengths and areas of improvement across different sections.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-resume-purple to-resume-indigo">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-white"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Get Improvements</h3>
                  <p className="text-gray-500">
                    Receive tailored suggestions and improvements to enhance your resume's impact and chances of success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-heading">
                  What Our Users Say
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of job seekers who have improved their resumes with our AI-powered platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-between rounded-xl border bg-white p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 text-yellow-400"
                        >
                          <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.4 7.4-6-4.6-6 4.6 2.4-7.4-6-4.6h7.6z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-500">
                      "ResumeAI helped me refine my resume and land interviews at top tech companies. The suggestions were spot-on and significantly improved how I presented my experience."
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="rounded-full bg-gray-100 p-1">
                    <div className="h-10 w-10 rounded-full bg-gray-300" />
                  </div>
                  <div>
                    <p className="font-semibold">Sarah J.</p>
                    <p className="text-sm text-gray-500">Software Engineer</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-xl border bg-white p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 text-yellow-400"
                        >
                          <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.4 7.4-6-4.6-6 4.6 2.4-7.4-6-4.6h7.6z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-500">
                      "As a recent graduate, I was struggling to make my resume stand out. ResumeAI provided actionable suggestions that helped me showcase my skills effectively."
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="rounded-full bg-gray-100 p-1">
                    <div className="h-10 w-10 rounded-full bg-gray-300" />
                  </div>
                  <div>
                    <p className="font-semibold">Michael T.</p>
                    <p className="text-sm text-gray-500">Marketing Graduate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-heading">
                  Ready to Enhance Your Resume?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Start improving your resume now and increase your chances of landing your dream job.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/enhance">
                  <Button className="button-gradient text-white px-8">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
