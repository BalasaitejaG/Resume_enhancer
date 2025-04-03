
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResumeUploader from "@/components/resume/ResumeUploader";
import ResumeAnalysisResult from "@/components/resume/ResumeAnalysisResult";
import { analyzeResume } from "@/services/resumeService";
import { toast } from "sonner";
import { ResumeAnalysis } from "@/services/resumeService";

const EnhancePage = () => {
  const [resumeText, setResumeText] = useState("");
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleResumeUpload = async (text: string) => {
    setResumeText(text);
    setIsAnalyzing(true);
    
    try {
      const analysis = await analyzeResume(text);
      setAnalysisResult(analysis);
      toast.success("Resume analyzed successfully!");
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast.error("Failed to analyze resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResumeText("");
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 md:py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
              Enhance Your Resume with AI
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Upload your resume, get AI-powered suggestions, and improve your chances of landing your dream job.
            </p>
          </div>

          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg font-medium">Analyzing your resume...</p>
              <p className="text-muted-foreground mt-2">
                This may take a few moments
              </p>
            </div>
          ) : analysisResult ? (
            <ResumeAnalysisResult
              analysis={analysisResult}
              originalResume={resumeText}
              onReset={handleReset}
            />
          ) : (
            <div className="max-w-2xl mx-auto">
              <ResumeUploader onUpload={handleResumeUpload} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EnhancePage;
