# Google Sheets Integration Setup

This guide explains how to set up Google Sheets integration for the wedding invitation greeting form.

## Prerequisites

1. A Google account
2. Access to Google Cloud Console
3. A Google Spreadsheet for storing greetings

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"

## Step 2: Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `wedding-invitation-sheets`
   - Description: `Service account for wedding invitation Google Sheets integration`
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

## Step 3: Generate Service Account Key

1. In the "Credentials" page, find your service account
2. Click on the service account email
3. Go to the "Keys" tab
4. Click "Add Key" > "Create New Key"
5. Select "JSON" format and click "Create"
6. Download and save the JSON file securely

## Step 4: Create Google Spreadsheet

1. Create a new Google Spreadsheet
2. Rename the first sheet to "Greetings"
3. Add headers in the first row:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Message`
4. Copy the Spreadsheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

## Step 5: Share Spreadsheet with Service Account

1. In your Google Spreadsheet, click "Share"
2. Add the service account email (from the JSON file: `client_email`)
3. Give it "Editor" permissions
4. Click "Send"

## Step 6: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in the values from your service account JSON file:
   ```env
   GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here
   GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   ```

   **Important Notes:**
   - The `GOOGLE_PRIVATE_KEY` should include the full key with `\n` for line breaks
   - Wrap the private key in double quotes
   - Don't commit `.env.local` to version control

## Step 7: Test the Integration

1. Start your development server:
   ```bash
   bun run dev
   ```

2. Navigate to the greeting form section
3. Submit a test greeting
4. Check your Google Spreadsheet to see if the data appears

## Troubleshooting

### Common Issues:

1. **"Spreadsheet not found" error:**
   - Verify the `GOOGLE_SPREADSHEET_ID` is correct
   - Ensure the spreadsheet is shared with the service account email

2. **"Authentication failed" error:**
   - Check that `GOOGLE_CLIENT_EMAIL` and `GOOGLE_PRIVATE_KEY` are correct
   - Ensure the private key format is correct (with `\n` line breaks)

3. **"Sheet not found" error:**
   - Make sure the sheet is named exactly "Greetings"
   - Check that the sheet exists in the spreadsheet

4. **API not enabled error:**
   - Ensure Google Sheets API is enabled in Google Cloud Console
   - Wait a few minutes after enabling the API

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your service account JSON file secure
- Regularly rotate your service account keys
- Use environment-specific service accounts for production

## Production Deployment

For production deployment, set the environment variables in your hosting platform:
- Vercel: Project Settings > Environment Variables
- Netlify: Site Settings > Environment Variables
- Other platforms: Follow their specific documentation