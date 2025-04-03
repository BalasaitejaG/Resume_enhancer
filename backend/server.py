#!/usr/bin/env python3
"""
Flask server for PDF text extraction
Provides an API endpoint for extracting text from uploaded PDF resumes
"""

import os
import tempfile
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from pdf_extractor import process_resume

# Set up logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Create Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for all routes

# Configure upload settings
UPLOAD_FOLDER = tempfile.gettempdir()
ALLOWED_EXTENSIONS = {'pdf'}


def allowed_file(filename):
    """Check if the uploaded file has an allowed extension"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/api/extract-pdf', methods=['POST'])
def extract_pdf():
    """
    API endpoint to extract text from uploaded PDF files

    Expects a file in the request with key 'file'
    Returns JSON with extracted text and structured sections
    """
    # Check if the post request has the file part
    if 'file' not in request.files:
        logger.warning("No file part in the request")
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    # If user does not select file, browser may send empty file without filename
    if file.filename == '':
        logger.warning("No file selected")
        return jsonify({'error': 'No file selected'}), 400

    if file and allowed_file(file.filename):
        # Save file to temporary location
        temp_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(temp_path)
        logger.info(f"Saved uploaded file to {temp_path}")

        try:
            # Process the PDF using our extraction function
            logger.info(f"Processing PDF: {file.filename}")
            result = process_resume(temp_path)

            # Check if text extraction was successful
            if not result.get('full_text') or len(result.get('full_text', '')) < 50:
                logger.warning(
                    f"PDF extraction returned insufficient text: {len(result.get('full_text', ''))} characters")
                # Clean up the temporary file
                os.remove(temp_path)
                return jsonify({
                    'error': 'Could not extract text from PDF',
                    'message': 'The PDF text extraction was unsuccessful. This could be due to PDF security settings, scanned content, or compatibility issues.',
                    'fileName': file.filename
                }), 422

            # Clean up the temporary file
            os.remove(temp_path)
            logger.info(f"Successfully processed {file.filename}")

            # Return the extraction results
            return jsonify(result)
        except Exception as e:
            logger.error(f"Error processing PDF: {str(e)}", exc_info=True)
            # Clean up in case of error
            if os.path.exists(temp_path):
                os.remove(temp_path)
            return jsonify({
                'error': f'Error processing PDF: {str(e)}',
                'message': 'Failed to process the PDF file. The file might be corrupt, password-protected, or in an unsupported format.',
                'fileName': file.filename
            }), 500

    logger.warning(f"Unsupported file type: {file.filename}")
    return jsonify({
        'error': 'File type not allowed',
        'message': 'Only PDF files are supported at this time.',
        'fileName': file.filename
    }), 400


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok'})


if __name__ == '__main__':
    # Get port from environment variable or use 5000 as default
    port = int(os.environ.get('PORT', 5000))

    # Log startup
    logger.info(f"Starting PDF extractor server on port {port}")

    # Run the app
    app.run(host='0.0.0.0', port=port, debug=True)
