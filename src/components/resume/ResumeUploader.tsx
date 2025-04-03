import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

// Python backend API URL - can be configured in environment variables
const API_URL = "http://localhost:5000";

interface ResumeSection {
  [key: string]: string;
}

interface ResumeData {
  full_text: string;
  sections: ResumeSection;
}

interface ResumeUploaderProps {
  onUpload: (resumeText: string) => void;
}

const ResumeUploader = ({ onUpload }: ResumeUploaderProps) => {
  const [resumeText, setResumeText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setIsLoading(true);

    try {
      // Check file size
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        toast.error("File size exceeds 5MB limit");
        setIsLoading(false);
        return;
      }

      // For text files, use FileReader directly
      if (file.type === "text/plain") {
        const text = await readTextFile(file);
        setResumeText(text);
        toast.success("Resume uploaded successfully");
      }
      // For PDF files, use our Python backend
      else if (file.type === "application/pdf") {
        try {
          const resumeData = await extractResumeDataFromBackend(file);
          // Format the sections into a structured text format
          const formattedText = formatResumeDataToText(resumeData);
          setResumeText(formattedText);
          toast.success("Resume uploaded and processed successfully");
        } catch (error) {
          console.error("Error extracting text from PDF:", error);
          const fileName = file.name || "Unknown file";
          setResumeText(
            `Uploaded file: ${fileName}\n\nPlease paste your resume content manually if it couldn't be read automatically.`
          );
          toast.warning(
            "Could not extract text from PDF. Please paste your resume content manually."
          );
        }
      }
      // For other file types, attempt to read as text
      else {
        try {
          const text = await readTextFile(file);
          setResumeText(text);
          toast.success("Resume uploaded successfully");
        } catch (error) {
          console.error("Error reading file:", error);
          // If we can't read as text, extract at least the file name as a fallback
          const fileName = file.name || "Unknown file";
          setResumeText(
            `Uploaded file: ${fileName}\n\nPlease paste your resume content manually if it couldn't be read automatically.`
          );
          toast.warning(
            "Could not extract text from file. Please paste your resume content manually."
          );
        }
      }
    } catch (error) {
      console.error("Error handling file:", error);
      toast.error(
        "Failed to process file. Please try another file or paste your resume manually."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const extractResumeDataFromBackend = async (
    file: File
  ): Promise<ResumeData> => {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", file);

    // Send the file to our Python backend
    const response = await fetch(`${API_URL}/api/extract-pdf`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to extract text from PDF");
    }

    return await response.json();
  };

  // Format the structured resume data into a text format
  const formatResumeDataToText = (resumeData: ResumeData): string => {
    if (!resumeData.sections || Object.keys(resumeData.sections).length === 0) {
      return resumeData.full_text || "";
    }

    let formattedText = "";

    // First add any contact/header information
    if (resumeData.sections.contact) {
      formattedText += resumeData.sections.contact + "\n\n";
    }

    // Add summary if available
    if (resumeData.sections.summary) {
      formattedText += "# SUMMARY\n" + resumeData.sections.summary + "\n\n";
    }

    // Add experience if available
    if (resumeData.sections.experience) {
      formattedText +=
        "# EXPERIENCE\n" + resumeData.sections.experience + "\n\n";
    }

    // Add education if available
    if (resumeData.sections.education) {
      formattedText += "# EDUCATION\n" + resumeData.sections.education + "\n\n";
    }

    // Add skills if available
    if (resumeData.sections.skills) {
      formattedText += "# SKILLS\n" + resumeData.sections.skills + "\n\n";
    }

    // Add projects if available
    if (resumeData.sections.projects) {
      formattedText += "# PROJECTS\n" + resumeData.sections.projects + "\n\n";
    }

    // Add any other sections that were extracted
    const processedSections = [
      "contact",
      "summary",
      "experience",
      "education",
      "skills",
      "projects",
      "unsorted",
    ];
    for (const [section, content] of Object.entries(resumeData.sections)) {
      if (!processedSections.includes(section) && content.trim()) {
        formattedText += `# ${section.toUpperCase()}\n${content}\n\n`;
      }
    }

    // Add any unsorted content at the end
    if (resumeData.sections.unsorted && resumeData.sections.unsorted.trim()) {
      formattedText += resumeData.sections.unsorted + "\n";
    }

    return formattedText.trim();
  };

  const readTextFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        resolve(content);
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleSubmit = () => {
    if (!resumeText.trim()) {
      toast.error("Please enter or upload your resume");
      return;
    }
    onUpload(resumeText);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    // Handle pasted content
    const pastedText = e.clipboardData.getData("text");
    if (pastedText) {
      setResumeText(pastedText);
    }
  };

  return (
    <Card className="card-gradient border shadow-md">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Upload your resume</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Upload your resume or paste it directly below. We'll try to extract
            text from any file format.
          </p>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="resume-upload"
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                isDragging
                  ? "border-primary bg-primary/10"
                  : "bg-white/50 hover:bg-white/80"
              } transition-all`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className={`w-8 h-8 mb-3 ${
                    isDragging ? "text-primary" : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  Any file format (MAX. 5MB)
                </p>
              </div>
              <input
                id="resume-upload"
                type="file"
                className="hidden"
                onChange={handleInputChange}
                accept="*/*"
              />
            </label>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Or paste your resume</h3>
          <Textarea
            placeholder="Paste your resume content here..."
            className="min-h-[200px] bg-white/80"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            onPaste={handlePaste}
          />
        </div>
        <Button
          className="w-full button-gradient text-white"
          onClick={handleSubmit}
          disabled={isLoading || !resumeText.trim()}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            "Analyze Resume"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResumeUploader;
