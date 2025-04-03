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
./start.sh
```

This script will:

1. Install the required Python dependencies
2. Start the Python backend server on port 5000
3. Start the frontend development server on port 5173

Then open http://localhost:5173 in your browser to use the application.

### Manual Setup

If you prefer to run the servers manually:

1. Start the Python backend:

   ```bash
   cd backend
   pip install -r requirements.txt
   python server.py
   ```

2. In another terminal, start the frontend:
   ```bash
   npm run dev
   ```

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

1. Make sure the Python backend server is running
2. Check that your PDF is not password-protected
3. Ensure the PDF file is valid and not corrupted
4. Try restarting both the frontend and backend servers

## Technologies Used

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn-ui
- **Backend**: Python, Flask, PyMuPDF
- **AI**: Gemini AI for resume analysis and suggestions

## Project Structure

- `src/` - Frontend React application
- `backend/` - Python backend for PDF processing
- `public/` - Static assets
- `start.sh` - Convenience script to start both frontend and backend

## License

This project is licensed under the MIT License - see the LICENSE file for details.
