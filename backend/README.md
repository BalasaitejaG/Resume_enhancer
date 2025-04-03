# Resume AI Backend

This is a Python backend for the Resume AI application, providing PDF text extraction services.

## About the PDF Extraction

We use PyMuPDF (fitz) to extract text from PDF resumes with special attention to:

1. **Layout Preservation**: Maintains the original document structure
2. **Text Flow**: Ensures proper reading order from top to bottom, left to right
3. **Section Detection**: Intelligently identifies common resume sections like:
   - Contact Information
   - Summary/Profile
   - Work Experience
   - Education
   - Skills
   - Projects
   - Certifications/Awards

## Improvements Over Client-Side Extraction

Compared to the previous PDF.js-based browser extraction:

- **Much Higher Accuracy**: PyMuPDF extracts text with better formatting
- **Better Structure Recognition**: Identifies resume sections even without explicit headers
- **Robust Processing**: Handles various PDF structures and formats
- **Language Support**: Better handles international characters and special formatting

## Setup Instructions

1. Install Python 3.8 or higher

2. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Run the server:
   ```bash
   python server.py
   ```

The server will start on http://localhost:5000

## API Endpoints

### PDF Text Extraction

- **URL**: `/api/extract-pdf`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Request Body**: Form with a file field named `file` containing the PDF to process
- **Response**: JSON containing the extracted text and structured sections

Example response:

```json
{
  "full_text": "Extracted text from the PDF...",
  "sections": {
    "contact": "Contact information...",
    "experience": "Work experience details...",
    "education": "Education details...",
    "skills": "Skills list..."
  }
}
```

### Health Check

- **URL**: `/api/health`
- **Method**: `GET`
- **Response**: `{"status": "ok"}`

## Using as a Standalone Tool

You can also use the PDF extractor directly from the command line:

```bash
python pdf_extractor.py path/to/resume.pdf --output output.json
```

This will extract text from the specified PDF and save the result to the given output file.
