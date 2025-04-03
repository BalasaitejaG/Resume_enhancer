# Resume AI Glowup

An AI-powered resume enhancement application that helps users improve their resumes for job applications. Upload your resume, get AI-powered suggestions, and enhance your chances of landing your dream job.

## Features

- **PDF Resume Parsing**: Advanced PDF text extraction with PyMuPDF
- **Section Detection**: Automatically identifies and organizes resume sections (Summary, Experience, Skills, etc.)
- **AI Analysis**: Uses Gemini AI to analyze resumes and provide personalized suggestions
- **Enhancement Suggestions**: Get actionable suggestions to improve your resume
- **Enhanced Resume Download**: Download your improved resume in various formats

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Python 3.8 or higher installed
- Git
- Google Gemini API key (for AI features) - see [Setting Up Google Gemini AI](#setting-up-google-gemini-ai) section

### Installation

1. Clone the repository

   ```sh
   git clone <YOUR_GIT_URL>
   cd resume-ai-glowup
   ```

2. Install frontend dependencies

   ```sh
   npm install
   ```

3. Install Python backend dependencies
   ```sh
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

### Running the Application

For the best experience with PDF resume uploads, use the provided start script that launches both the frontend and the Python backend:

```bash
# Make the script executable first (only needed once)
chmod +x start.sh

# Run the script
./start.sh
```

This script will:

1. Install the required Python dependencies
2. Start the Python backend server on port 5000
3. Start the frontend development server on port 5173

Then open http://localhost:5173 in your browser to use the application.

### Manual Setup

If you prefer to run the servers manually or if the start script doesn't work:

1. Start the Python backend:

   ```bash
   cd backend
   pip install -r requirements.txt
   python3 server.py
   ```

   You should see output like:

   ```
   INFO - Starting PDF extractor server on port 5000
   * Serving Flask app 'server'
   * Debug mode: on
   INFO - WARNING: This is a development server. Do not use it in a production deployment.
   * Running on all addresses (0.0.0.0)
   * Running on http://127.0.0.1:5000
   ```

2. In another terminal, start the frontend:

   ```bash
   npm run dev
   ```

3. Verify both servers are running:
   - Backend: Open http://localhost:5000/api/health in your browser, it should display `{"status":"ok"}`
   - Frontend: Open http://localhost:5173 in your browser to access the application

### Common Issues

#### Backend Server Not Starting

- **Error: "Address already in use"**: Another process is using port 5000
  - Solution: Kill the existing process: `lsof -i :5000` then `kill <PID>`, or change the port in the server.py file
- **Missing Dependencies**: Make sure you've installed requirements with `pip install -r requirements.txt`
- **Python Version**: Ensure you're using Python 3.8 or higher

#### PDF Extraction Fails

- **"Could not extract text from PDF"**: This can happen if:
  - The PDF has security settings preventing text extraction
  - The PDF contains mostly images/scanned content without OCR
  - The PDF uses custom fonts that can't be processed
  - The backend server isn't running properly
- **Solution**:
  - Use a different PDF without security restrictions
  - Manually paste your resume text in the text area
  - Check if the backend server is running properly
  - For scanned PDFs, use an OCR tool first to convert them to searchable PDFs

## Setting Up Google Gemini AI

This application uses Google's Gemini API to provide AI-powered resume analysis and enhancement. To get the full AI experience, you'll need to configure a Gemini API key:

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click on "Get API key" or "Create API key"
4. Copy your new API key

### Configuring Your API Key

1. Create a `.env` file in the root directory (or rename `.env.example` to `.env`)
2. Add your Gemini API key to the file:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

If you don't configure a Gemini API key, the application will fall back to using predefined mock data and rule-based enhancements.

## Python Backend for PDF Extraction

The application uses a Python backend with PyMuPDF for accurate PDF text extraction:

- **Advanced Text Extraction**: Preserves document layout and formatting
- **Intelligent Section Detection**: Identifies different resume sections automatically
- **Structure Preservation**: Maintains the hierarchical structure of resume content

### Recent Improvements

- **Enhanced PDF Parsing**: Improved text extraction using PyMuPDF instead of PDF.js
- **Intelligent Section Detection**: Better identification of resume sections even without explicit headers
- **Structured Data Format**: Organized resume content by sections for better analysis
- **Backend Processing**: Offloaded complex PDF processing to a Python backend

### Troubleshooting PDF Extraction

If you encounter issues with PDF text extraction:

1. Make sure the Python backend server is running. Check by opening http://localhost:5000/api/health
2. Check that your PDF is not password-protected or contains security restrictions
3. Ensure the PDF file is valid and not corrupted
4. For scanned PDFs, they may not contain extractable text - try using an OCR tool first
5. Try restarting both the frontend and backend servers
6. Check the Python backend logs for detailed error messages
7. As a workaround, you can always manually paste your resume text

## Technologies Used

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn-ui
- **Backend**: Python, Flask, PyMuPDF
- **AI**: Gemini AI for resume analysis and suggestions

## Project Structure

- `src/` - Frontend React application
- `backend/` - Python backend for PDF processing
- `public/` - Static assets
- `start.sh` - Convenience script to start both frontend and backend
- `.env` - Environment variables including Gemini API key

## License

This project is licensed under the MIT License - see the LICENSE file for details.
