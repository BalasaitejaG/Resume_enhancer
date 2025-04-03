import { toast } from "sonner";

type ResumeSection = {
  name: string;
  content: string;
  suggestions: string[];
  score: number;
};

export type ResumeAnalysis = {
  overallScore: number;
  sections: ResumeSection[];
  generalSuggestions: string[];
};

// Get the Gemini API key from environment variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// Function to analyze resume using Gemini AI
export const analyzeResume = async (resumeText: string): Promise<ResumeAnalysis> => {
  try {
    // Check if API key is configured
    if (!GEMINI_API_KEY) {
      console.error("Gemini API key is not configured. Using mock data instead.");
      return getMockAnalysis(resumeText);
    }

    // Prepare the prompt for Gemini
    const prompt = `
You are an expert AI resume analyzer. Please analyze the following resume and provide detailed feedback:

RESUME:
${resumeText}

Please format your response as a JSON object with the following structure:
{
  "overallScore": number from 0-100,
  "sections": [
    {
      "name": "Section Name (e.g., Contact Information, Professional Summary, Work Experience, Education, Skills)",
      "content": "extracted content for this section",
      "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
      "score": number from 0-100
    }
  ],
  "generalSuggestions": ["general suggestion 1", "general suggestion 2", "general suggestion 3"]
}

Please provide specific, actionable suggestions for improvement. Focus on ATS optimization, clarity, impact, and formatting.
Identify at least 3 suggestions for each section. Score each section based on its completeness, clarity, and impact.
`;

    // Call the Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      throw new Error(`Gemini API error: ${errorData.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    
    // Extract the JSON response from Gemini's output
    const textResponse = data.candidates[0].content.parts[0].text;
    
    // Find JSON object in the response
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      console.error("Failed to parse Gemini response to JSON");
      throw new Error("Failed to parse AI response");
    }
    
    try {
      const analysisResult = JSON.parse(jsonMatch[0]);
      
      // Ensure the response has the expected structure
      if (!analysisResult.overallScore || !analysisResult.sections || !analysisResult.generalSuggestions) {
        throw new Error("AI response is missing required fields");
      }
      
      // Add extracted content to sections if not present
      analysisResult.sections.forEach((section: ResumeSection) => {
        if (!section.content) {
          section.content = extractSectionFromResume(resumeText, section.name.toLowerCase());
        }
      });
      
      return analysisResult as ResumeAnalysis;
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      throw new Error("Failed to parse AI response");
    }
  } catch (error) {
    console.error("Error analyzing resume:", error);
    toast.error("Failed to analyze resume with AI. Using fallback analysis.");
    
    // Fall back to mock data if the API call fails
    return getMockAnalysis(resumeText);
  }
};

// Helper function to extract sections from resume
function extractSectionFromResume(resume: string, sectionName: string): string {
  // Simple section extraction based on common headings and patterns
  const sectionPatterns: Record<string, RegExp> = {
    contact: /(?:contact|personal|info).*?\n([\s\S]*?)(?:\n\n|\n[A-Z]|$)/i,
    summary: /(?:summary|profile|objective).*?\n([\s\S]*?)(?:\n\n|\n[A-Z]|$)/i,
    experience: /(?:experience|work|employment).*?\n([\s\S]*?)(?:\n\n(?:education|skills|projects|languages)|$)/i,
    education: /(?:education|academic|qualification).*?\n([\s\S]*?)(?:\n\n(?:skills|experience|projects|languages)|$)/i,
    skills: /(?:skills|technologies|competencies).*?\n([\s\S]*?)(?:\n\n|\n[A-Z]|$)/i
  };
  
  // Convert section name to lowercase and find the best matching key
  const sectionKey = Object.keys(sectionPatterns).find(key => 
    sectionName.toLowerCase().includes(key)
  ) || "";
  
  const pattern = sectionPatterns[sectionKey];
  if (!pattern || !resume) return "";
  
  const match = resume.match(pattern);
  if (match && match[1]) {
    return match[1].trim();
  }
  
  // Fallback to empty string if section not found
  return "";
}

// Function to get mock analysis for testing or when API is unavailable
function getMockAnalysis(resumeText: string): ResumeAnalysis {
  return {
    overallScore: 72,
    sections: [
      {
        name: "Contact Information",
        content: extractSectionFromResume(resumeText, "contact"),
        suggestions: [
          "Add your LinkedIn profile URL",
          "Consider adding a professional email address",
          "Include your location (city, state)"
        ],
        score: 80
      },
      {
        name: "Professional Summary",
        content: extractSectionFromResume(resumeText, "summary"),
        suggestions: [
          "Quantify your achievements with numbers",
          "Focus more on results rather than responsibilities",
          "Include relevant keywords from the job description"
        ],
        score: 65
      },
      {
        name: "Work Experience",
        content: extractSectionFromResume(resumeText, "experience"),
        suggestions: [
          "Use action verbs to start each bullet point",
          "Include metrics and specific achievements",
          "Remove outdated experience (older than 10 years)"
        ],
        score: 70
      },
      {
        name: "Education",
        content: extractSectionFromResume(resumeText, "education"),
        suggestions: [
          "List relevant coursework for recent graduates",
          "Add GPA if above 3.5",
          "Include certifications relevant to the job"
        ],
        score: 85
      },
      {
        name: "Skills",
        content: extractSectionFromResume(resumeText, "skills"),
        suggestions: [
          "Group skills by category (technical, soft, languages)",
          "Prioritize skills mentioned in job descriptions",
          "Remove outdated or basic skills"
        ],
        score: 60
      }
    ],
    generalSuggestions: [
      "Tailor your resume for each job application",
      "Keep your resume to one page if possible",
      "Use a clean, professional format",
      "Proofread carefully for spelling and grammar errors"
    ]
  };
}

// Function to enhance resume based on AI suggestions
export const enhanceResume = async (
  originalResume: string, 
  selectedSuggestions: string[]
): Promise<string> => {
  try {
    // If Gemini API key is available, use it for more intelligent enhancements
    if (GEMINI_API_KEY && selectedSuggestions.length > 0) {
      // Prepare the prompt for Gemini
      const prompt = `
You are an expert AI resume enhancer. I have a resume that needs to be improved based on specific suggestions.

ORIGINAL RESUME:
${originalResume}

SUGGESTIONS TO IMPLEMENT:
${selectedSuggestions.map(s => `- ${s}`).join('\n')}

Please improve the resume by implementing ONLY these suggestions. Maintain the original structure and sections of the resume, but make specific improvements based on each suggestion.

For each suggestion, make targeted changes to relevant parts of the resume. Do not add completely new sections or drastically change the content beyond what is needed to implement the suggestions.

Return the complete improved resume text.
`;

      // Call the Gemini API
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 2048,
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const enhancedResume = data.candidates[0].content.parts[0].text;
        
        // Clean up any explanation text and just return the resume content
        const cleanedResume = enhancedResume.replace(/^(IMPROVED RESUME:|Here's the improved resume:|Enhanced Resume:)/i, '').trim();
        
        return cleanedResume;
      } else {
        console.error("Error from Gemini API for resume enhancement");
        // Fall back to rule-based enhancement if API fails
      }
    }
    
    // Fall back to rule-based enhancement if no API key or API call failed
    let enhancedResume = originalResume;
    
    // Apply improvements based on selected suggestions
    selectedSuggestions.forEach(suggestion => {
      switch (suggestion) {
        case "Add your LinkedIn profile URL":
          if (!enhancedResume.includes("linkedin.com")) {
            enhancedResume = enhancedResume.replace(
              /(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b)/,
              "$1\nLinkedIn: linkedin.com/in/your-profile"
            );
          }
          break;
          
        case "Quantify your achievements with numbers":
          // Find experience bullet points and add metrics
          enhancedResume = enhancedResume.replace(
            /- (Developed|Created|Built|Implemented|Led|Managed)([^0-9\n]*?)(\n|$)/gi,
            "- $1$2 resulting in 25% improvement in efficiency$3"
          );
          break;
          
        case "Use action verbs to start each bullet point":
          // Replace weak bullet points starting with "Was responsible for", etc.
          enhancedResume = enhancedResume.replace(
            /- (Was responsible for|Helped with|Worked on)([^\n]*?)(\n|$)/gi,
            "- Spearheaded$2$3"
          );
          break;
          
        case "Focus more on results rather than responsibilities":
          // Add results to statements that don't have them
          enhancedResume = enhancedResume.replace(
            /- ([^.]*)(?!\bwhich\b|\bresulting\b|\bleading to\b)\.?(\n|$)/gi,
            "- $1, which led to significant business impact.$2"
          );
          break;
          
        case "Include relevant keywords from the job description":
          // Add industry-relevant keywords
          if (!enhancedResume.toLowerCase().includes("agile")) {
            enhancedResume = enhancedResume.replace(
              /(skills|technologies).*?\n/i,
              "$&Agile Methodology, CI/CD, Cloud Infrastructure, "
            );
          }
          break;
          
        // Add more cases for other suggestions
        
        default:
          // No specific transformation for other suggestions
          break;
      }
    });
    
    return enhancedResume;
  } catch (error) {
    console.error("Error enhancing resume:", error);
    toast.error("Failed to enhance resume. Please try again.");
    throw error;
  }
};
