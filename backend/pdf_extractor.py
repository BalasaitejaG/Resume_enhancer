#!/usr/bin/env python3
"""
PDF Resume Text Extractor using PyMuPDF (fitz)
This script extracts text from PDF resumes while preserving formatting and structure.
"""

import os
import json
import fitz  # PyMuPDF
import sys
import argparse
import logging
from typing import Dict, List, Any, Optional

# Set up logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extract text from PDF using PyMuPDF with layout preservation.

    Args:
        pdf_path: Path to the PDF file

    Returns:
        Extracted text with formatting preserved
    """
    try:
        logger.info(f"Opening PDF file: {pdf_path}")
        # Check if file exists
        if not os.path.isfile(pdf_path):
            logger.error(f"PDF file does not exist: {pdf_path}")
            return ""

        # Check file size
        file_size = os.path.getsize(pdf_path)
        logger.info(f"PDF file size: {file_size} bytes")
        if file_size == 0:
            logger.error("PDF file is empty")
            return ""

        # Open the PDF
        try:
            doc = fitz.open(pdf_path)
            logger.info(f"Successfully opened PDF with {len(doc)} pages")
        except Exception as e:
            logger.error(f"Failed to open PDF with fitz: {e}")
            return ""

        if len(doc) == 0:
            logger.warning("PDF has no pages")
            return ""

        full_text = []

        # Process each page
        for page_num in range(len(doc)):
            try:
                page = doc[page_num]
                logger.info(f"Processing page {page_num+1}/{len(doc)}")

                # Extract text blocks with their bounding boxes
                blocks = page.get_text("dict")["blocks"]
                logger.info(f"Found {len(blocks)} blocks on page {page_num+1}")

                # Sort blocks by vertical position (top to bottom)
                blocks.sort(key=lambda b: b["bbox"][1])

                page_text = []

                # Process each block
                for block in blocks:
                    if "lines" not in block:
                        continue

                    # Sort lines within block (top to bottom)
                    block["lines"].sort(key=lambda l: l["bbox"][1])

                    for line in block["lines"]:
                        if "spans" not in line:
                            continue

                        # Sort spans within line (left to right)
                        line["spans"].sort(key=lambda s: s["bbox"][0])

                        # Extract and join text from spans
                        line_text = " ".join(span["text"]
                                             for span in line["spans"])
                        page_text.append(line_text)

                # Join all lines with newlines
                full_text.append("\n".join(page_text))
                logger.info(
                    f"Extracted {len(page_text)} lines from page {page_num+1}")
            except Exception as e:
                logger.error(f"Error processing page {page_num+1}: {e}")
                # Continue with next page instead of failing completely

        # Join all pages with double newlines
        result = "\n\n".join(full_text)
        logger.info(f"Total extracted text length: {len(result)} characters")

        # If text is too short, it might indicate extraction issues
        if len(result) < 50 and len(doc) > 0:
            logger.warning(
                f"Extracted text is suspiciously short ({len(result)} chars) for a {len(doc)}-page document")

        return result

    except Exception as e:
        logger.error(f"Error extracting text from PDF: {e}", exc_info=True)
        return ""


def extract_sections(text: str) -> Dict[str, str]:
    """
    Attempt to extract common resume sections from text.

    Args:
        text: Extracted text from resume

    Returns:
        Dictionary of section names and their content
    """
    sections = {}

    # Common section titles in resumes
    section_keywords = {
        "contact": ["contact", "personal information", "personal info"],
        "summary": ["summary", "profile", "objective", "professional summary"],
        "experience": ["experience", "work experience", "employment", "work history"],
        "education": ["education", "academic", "qualifications", "training"],
        "skills": ["skills", "competencies", "expertise", "technical skills"],
        "projects": ["projects", "personal projects", "academic projects"],
        "certifications": ["certifications", "certificates", "licenses"],
        "awards": ["awards", "honors", "achievements"]
    }

    # Split text into lines for processing
    lines = text.split("\n")

    current_section = "unsorted"
    sections[current_section] = []

    # First attempt to identify contact information at the top
    contact_info = []
    contact_line_count = 0

    # Get contact info from the first few lines (usually name, email, phone, etc.)
    for i, line in enumerate(lines[:10]):  # Check only first 10 lines
        if i == 0 and line.strip():  # First non-empty line is usually the name
            contact_info.append(line)
            contact_line_count += 1
        elif any(marker in line.lower() for marker in ["@", "gmail", "email", "phone", "tel:", "+", "linkedin", "github"]):
            contact_info.append(line)
            contact_line_count += 1
        elif line.strip() and contact_line_count > 0 and contact_line_count < 5:
            # Continue adding lines that might be part of contact info block
            # but only if we've already started the contact section and it's not too long
            contact_info.append(line)
            contact_line_count += 1

    if contact_info:
        sections["contact"] = "\n".join(contact_info)

    # Second pass to handle the main content sections
    i = contact_line_count
    while i < len(lines):
        line = lines[i].strip()
        line_lower = line.lower()

        # Check for explicit section headers (e.g., "Skills:", "Projects:", etc.)
        matched_section = None

        # Section headers are often short, capitalized, or have special formatting
        if (line and len(line) < 50 and  # Not too long
                (line.isupper() or  # All caps like "EXPERIENCE"
                 line.endswith(':') or  # Has colon like "Experience:"
                 # Bullet points often start sections
                         line.startswith('•') or
                         # Markdown-like formatting
                         any(line.startswith(marker) for marker in ["#", "-", "*"]))
                ):
            # Try to match with known section keywords
            for section, keywords in section_keywords.items():
                if any(keyword in line_lower for keyword in keywords):
                    matched_section = section
                    break

        # Special case for "Projects" section which often doesn't have an explicit header
        if not matched_section and "project" in line_lower and (
            # Often project titles end with technologies in parentheses
            line.endswith(')') or
            "tech stack:" in line_lower or
            any(tech in line_lower for tech in [
                "python", "javascript", "java", "react", "node", "django"])
        ):
            matched_section = "projects"

        if matched_section:
            current_section = matched_section
            # Skip this line if it's just a header (starts with # or is all caps)
            if line.startswith('#') or line.isupper() or line.endswith(':'):
                sections[current_section] = []
            else:
                sections[current_section] = [line]
        else:
            # Add to current section
            if current_section in sections:
                sections[current_section].append(line)
            else:
                sections[current_section] = [line]

        i += 1

    # Convert lists to strings
    for section, content in sections.items():
        if isinstance(content, list):
            sections[section] = "\n".join(content).strip()

    # If projects section wasn't found explicitly but contains project keywords,
    # try to extract it from experience or unsorted sections
    if "projects" not in sections or not sections["projects"]:
        possible_project_text = sections.get(
            "experience", "") + "\n" + sections.get("unsorted", "")
        project_lines = []
        project_section_started = False

        for line in possible_project_text.split("\n"):
            line_lower = line.lower()

            # Detect start of a project section
            if ("project" in line_lower or
                    any(tech + " " in line_lower for tech in ["react", "angular", "vue", "django", "flask"])):
                project_section_started = True
                project_lines.append(line)
            elif project_section_started:
                # Continue collecting project lines
                if line.strip():  # Non-empty line
                    project_lines.append(line)
                elif len(project_lines) > 0:
                    # Empty line after some project content might end the section
                    project_lines.append(line)

        if project_lines:
            sections["projects"] = "\n".join(project_lines).strip()

    return sections


def process_resume(pdf_path: str) -> Dict[str, Any]:
    """
    Process a resume PDF and return both the raw text and structured sections.

    Args:
        pdf_path: Path to the PDF file

    Returns:
        Dictionary with extracted text and sections
    """
    # Extract text from PDF
    extracted_text = extract_text_from_pdf(pdf_path)

    # Extract sections from the text
    sections = extract_sections(extracted_text)

    return {
        "full_text": extracted_text,
        "sections": sections
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Extract text from a resume PDF")
    parser.add_argument("pdf_path", help="Path to the PDF resume file")
    parser.add_argument("--output", "-o", help="Output JSON file (optional)")

    args = parser.parse_args()

    result = process_resume(args.pdf_path)

    if args.output:
        with open(args.output, "w") as f:
            json.dump(result, f, indent=2)
    else:
        print(json.dumps(result, indent=2))
