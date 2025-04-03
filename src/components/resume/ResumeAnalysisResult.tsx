import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ResumeAnalysis, enhanceResume } from "@/services/resumeService";
import { CheckIcon, DownloadIcon, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface ResumeFormatOption {
  id: string;
  name: string;
  description: string;
}

interface ResumeAnalysisResultProps {
  analysis: ResumeAnalysis;
  originalResume: string;
  onReset: () => void;
}

const ResumeAnalysisResult = ({
  analysis,
  originalResume,
  onReset,
}: ResumeAnalysisResultProps) => {
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  const [enhancedContent, setEnhancedContent] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [selectedFormatOption, setSelectedFormatOption] = useState<
    string | null
  >(null);

  const formatOptions: ResumeFormatOption[] = [
    {
      id: "clean",
      name: "Clean Professional",
      description: "A clean, minimal design with clear section headers",
    },
    {
      id: "modern",
      name: "Modern Creative",
      description:
        "A contemporary design with accent colors and modern typography",
    },
    {
      id: "traditional",
      name: "Traditional",
      description:
        "A classic resume format preferred in conservative industries",
    },
  ];

  const handleSuggestionToggle = (suggestion: string) => {
    setSelectedSuggestions((prev) =>
      prev.includes(suggestion)
        ? prev.filter((s) => s !== suggestion)
        : [...prev, suggestion]
    );
  };

  const handleEnhance = async () => {
    if (selectedSuggestions.length === 0) {
      toast.warning(
        "Please select at least one suggestion to enhance your resume."
      );
      return;
    }

    setIsEnhancing(true);

    try {
      const enhanced = await enhanceResume(originalResume, selectedSuggestions);
      setEnhancedContent(enhanced);
      toast.success("Resume enhanced successfully!");
    } catch (error) {
      console.error("Error enhancing resume:", error);
      toast.error("Failed to enhance resume. Please try again.");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleDownload = () => {
    const content = enhancedContent || originalResume;
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `enhanced_resume${
      selectedFormatOption ? `_${selectedFormatOption}` : ""
    }.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast.success("Resume downloaded successfully!");
  };

  const handleFormatChange = (formatId: string) => {
    setSelectedFormatOption(formatId);
    toast.success(
      `${formatOptions.find((f) => f.id === formatId)?.name} format applied!`
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Tabs defaultValue="analysis">
          <TabsList className="mb-4">
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="format">Format & Style</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis">
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white rounded-lg shadow-md p-6 border">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Resume Analysis</h2>
                    <p className="text-muted-foreground">
                      AI-powered insights to improve your resume
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center gap-2">
                    <span className="text-sm font-medium">Overall Score:</span>
                    <span
                      className={`text-2xl font-bold ${getScoreColor(
                        analysis.overallScore
                      )}`}
                    >
                      {analysis.overallScore}/100
                    </span>
                  </div>
                </div>

                <Tabs defaultValue="suggestions" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                    <TabsTrigger value="original">Original Resume</TabsTrigger>
                    <TabsTrigger value="enhanced" disabled={!enhancedContent}>
                      Enhanced Resume
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="suggestions" className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        General Suggestions
                      </h3>
                      <ul className="space-y-2">
                        {analysis.generalSuggestions.map((suggestion, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 p-3 bg-blue-50 rounded-md"
                          >
                            <div className="flex-shrink-0 text-blue-500 mt-0.5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                              </svg>
                            </div>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Section Analysis
                      </h3>
                      <div className="space-y-6">
                        {analysis.sections.map((section, i) => (
                          <Card key={i} className="overflow-hidden">
                            <CardContent className="p-0">
                              <div className="p-4 border-b bg-secondary/50">
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-medium">
                                    {section.name}
                                  </h4>
                                  <span
                                    className={`font-bold ${getScoreColor(
                                      section.score
                                    )}`}
                                  >
                                    {section.score}/100
                                  </span>
                                </div>
                                <Progress
                                  value={section.score}
                                  className="h-2"
                                  indicatorClassName={getProgressColor(
                                    section.score
                                  )}
                                />
                              </div>
                              <div className="p-4">
                                <h5 className="text-sm font-medium mb-2">
                                  Improvement Suggestions:
                                </h5>
                                <ul className="space-y-2">
                                  {section.suggestions.map((suggestion, j) => (
                                    <li
                                      key={j}
                                      className="flex items-center space-x-2"
                                    >
                                      <Checkbox
                                        id={`suggestion-${i}-${j}`}
                                        checked={selectedSuggestions.includes(
                                          suggestion
                                        )}
                                        onCheckedChange={() =>
                                          handleSuggestionToggle(suggestion)
                                        }
                                      />
                                      <label
                                        htmlFor={`suggestion-${i}-${j}`}
                                        className="text-sm cursor-pointer"
                                      >
                                        {suggestion}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        className="button-gradient text-white"
                        onClick={handleEnhance}
                        disabled={
                          isEnhancing || selectedSuggestions.length === 0
                        }
                      >
                        {isEnhancing ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Enhancing...
                          </>
                        ) : (
                          "Apply Selected Improvements"
                        )}
                      </Button>
                      <Button variant="outline" onClick={onReset}>
                        Start Over
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="original">
                    <Card>
                      <CardContent className="p-4">
                        <div className="font-mono text-sm whitespace-pre-wrap bg-muted p-4 rounded-md overflow-auto max-h-[600px]">
                          {originalResume}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="enhanced">
                    <Card>
                      <CardContent className="p-4">
                        <div className="font-mono text-sm whitespace-pre-wrap bg-muted p-4 rounded-md overflow-auto max-h-[600px]">
                          {enhancedContent}
                        </div>
                        <div className="mt-4 flex gap-4">
                          <Button
                            className="button-gradient text-white"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                enhancedContent || ""
                              );
                              toast.success("Copied to clipboard!");
                            }}
                          >
                            Copy to Clipboard
                          </Button>
                          <Button variant="outline" onClick={handleDownload}>
                            <DownloadIcon className="mr-2 h-4 w-4" />
                            Download Resume
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resume">
            <Card>
              <CardHeader>
                <CardTitle>
                  {enhancedContent ? "Enhanced Resume" : "Original Resume"}
                </CardTitle>
                <CardDescription>
                  {enhancedContent
                    ? "Your resume with selected improvements applied"
                    : "Your original uploaded resume"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={enhancedContent || originalResume}
                  className="min-h-[500px] font-mono text-sm"
                  readOnly
                />
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  {!enhancedContent && (
                    <Button
                      onClick={handleEnhance}
                      disabled={isEnhancing || selectedSuggestions.length === 0}
                      className="flex-1"
                    >
                      {isEnhancing ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Enhancing...
                        </>
                      ) : (
                        "Apply Selected Improvements"
                      )}
                    </Button>
                  )}
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="flex-1"
                  >
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Download Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="format">
            <Card>
              <CardHeader>
                <CardTitle>Format & Style Options</CardTitle>
                <CardDescription>
                  Choose a formatting style for your resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {formatOptions.map((format) => (
                    <div
                      key={format.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-primary ${
                        selectedFormatOption === format.id
                          ? "border-primary bg-primary/5"
                          : ""
                      }`}
                      onClick={() => handleFormatChange(format.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{format.name}</h3>
                        {selectedFormatOption === format.id && (
                          <CheckIcon className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border rounded-lg p-4 bg-muted/50">
                  <h3 className="font-medium mb-2">Format Preview</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This is how your resume will appear when formatted with the
                    selected style.
                  </p>

                  <div className="aspect-[8.5/11] border bg-white rounded shadow-sm p-6 max-w-md mx-auto">
                    {selectedFormatOption ? (
                      <div
                        className={`h-full ${
                          selectedFormatOption === "modern"
                            ? "border-l-4 border-blue-500 pl-4"
                            : selectedFormatOption === "traditional"
                            ? "text-center"
                            : ""
                        }`}
                      >
                        <div
                          className={`${
                            selectedFormatOption === "modern"
                              ? "text-blue-600"
                              : selectedFormatOption === "traditional"
                              ? "uppercase tracking-wider"
                              : "border-b"
                          } font-bold text-xl mb-2`}
                        >
                          John Doe
                        </div>

                        <div className="text-sm mb-4">
                          {selectedFormatOption === "traditional"
                            ? "john.doe@email.com | (123) 456-7890"
                            : "john.doe@email.com • (123) 456-7890"}
                        </div>

                        <div
                          className={`${
                            selectedFormatOption === "modern"
                              ? "text-blue-600 uppercase text-sm tracking-wider"
                              : selectedFormatOption === "traditional"
                              ? "text-center border-b border-t py-1 uppercase"
                              : "font-medium"
                          } mb-1`}
                        >
                          Experience
                        </div>

                        <div className="text-xs mb-2">
                          Software Developer, XYZ Company (2020-Present)
                        </div>

                        <div className="text-xs">
                          • Developed key features that increased user
                          engagement by 30%
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                        Select a format to preview
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ... existing right sidebar ... */}
    </div>
  );
};

export default ResumeAnalysisResult;
