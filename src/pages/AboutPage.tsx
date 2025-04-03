
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-heading">
              About ResumeAI
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to help job seekers create standout resumes that get them noticed.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 gradient-heading">Our Mission</h2>
                <p className="text-gray-600 mb-4">
                  At ResumeAI, we believe that everyone deserves the opportunity to present their skills and experience in the most effective way possible. Our AI-powered platform is designed to help job seekers create resumes that stand out to employers and increase their chances of landing interviews.
                </p>
                <p className="text-gray-600">
                  We combine cutting-edge AI technology with expert knowledge of resume best practices to provide personalized recommendations that help you showcase your unique value proposition.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 gradient-heading">How Our AI Works</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our advanced AI system is trained on thousands of successful resumes across various industries to provide you with the most relevant and effective suggestions.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
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
                    className="text-resume-blue"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Content Analysis</h3>
                <p className="text-gray-600">
                  Our AI analyzes your resume content, identifying strengths and areas for improvement in each section.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
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
                    className="text-resume-purple"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Industry Benchmarking</h3>
                <p className="text-gray-600">
                  We compare your resume against industry standards and best practices to ensure it meets employer expectations.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
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
                    className="text-resume-indigo"
                  >
                    <path d="M12 2v2" />
                    <path d="M12 8v2" />
                    <path d="M12 14v2" />
                    <path d="M12 20v2" />
                    <path d="M6 12H2" />
                    <path d="M8 12h2" />
                    <path d="M14 12h2" />
                    <path d="M18 12h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Smart Suggestions</h3>
                <p className="text-gray-600">
                  Based on our analysis, we provide tailored suggestions to enhance your resume's effectiveness and impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Take Your Resume to the Next Level?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join thousands of job seekers who have improved their resumes and landed their dream jobs.
            </p>
            <Link to="/enhance">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg">
                Enhance Your Resume Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
