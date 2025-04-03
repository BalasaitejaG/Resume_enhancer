# Setting Up Google Gemini AI for Resume Analysis

This application uses Google's Gemini API to provide AI-powered resume analysis and enhancement. Follow these steps to set up your Gemini API key:

## Steps to Get a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey) (formerly MakerSuite)
2. Sign in with your Google account
3. Click on "Get API key" or "Create API key"
4. Copy your new API key

## Setting Up Your Environment

1. Create a `.env` file in the root directory of the project (or rename `.env.example` to `.env`)
2. Add your Gemini API key to the `.env` file:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

## How the Gemini Integration Works

The application uses the Gemini API for two main purposes:

1. **Resume Analysis**: When you upload a resume, the app sends it to Gemini with a prompt asking for detailed analysis. Gemini returns section-by-section feedback, suggestions, and scores.

2. **Resume Enhancement**: When you select suggestions to implement, the app can use Gemini to intelligently apply those improvements to your resume.

If the Gemini API key is not configured, the application will fall back to using predefined mock data and rule-based enhancements.

## Troubleshooting

- Make sure you've created the `.env` file in the root directory
- Verify that your API key is correct
- Check the browser console for any API-related errors
- If the API isn't working, the app will automatically fall back to using mock data

## API Quotas

The Gemini API currently has free usage quotas, but be aware of potential rate limits. If you encounter issues with the API, the application will gracefully fall back to using the built-in rule-based analysis.

## Privacy Considerations

Your resume data is sent to Google's Gemini API for processing. Please review Google's privacy policy regarding how they handle data sent to their AI services.
