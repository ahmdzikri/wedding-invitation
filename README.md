# Wedding Invitation Website

A beautiful and modern wedding invitation website built with Next.js, featuring Google Sheets integration for guest greetings.

## Features

- 🎨 Beautiful and responsive design
- 💌 Guest greeting form with Google Sheets integration
- 🔗 Invitation link generator for personalized messages
- ⏰ Countdown timer to wedding day
- 📍 Event location with Google Maps integration
- 🎵 Background music player
- 📱 Mobile-friendly interface

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Google account for Sheets integration
- Google Cloud Console access

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd wedding-invitation
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

5. Run the development server:
```bash
bun dev
# or
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Google Sheets Integration Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"

### Step 2: Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `wedding-invitation-sheets`
   - Description: `Service account for wedding invitation Google Sheets integration`
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

### Step 3: Generate Service Account Key

1. In the "Credentials" page, find your service account
2. Click on the service account email
3. Go to the "Keys" tab
4. Click "Add Key" > "Create New Key"
5. Select "JSON" format and click "Create"
6. Download and save the JSON file securely

### Step 4: Create Google Spreadsheet

1. Create a new Google Spreadsheet
2. Rename the first sheet to "Greetings"
3. Add headers in the first row:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Message`
4. Copy the Spreadsheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

### Step 5: Share Spreadsheet with Service Account

1. In your Google Spreadsheet, click "Share"
2. Add the service account email (from the JSON file: `client_email`)
3. Give it "Editor" permissions
4. Click "Send"

### Step 6: Test the Integration

1. Start your development server
2. Navigate to the greeting form section
3. Submit a test greeting
4. Check your Google Spreadsheet to see if the data appears

## Invitation Link Generator

Access the invitation generator at `/generate` to create personalized invitation messages:

1. Navigate to `http://localhost:3000/generate`
2. Enter the guest name
3. Copy the generated message with personalized link
4. Share via WhatsApp or other messaging platforms

## Configuration

Edit `src/config/config.ts` to customize:
- Couple names and information
- Event details (date, time, location)
- Quran verse
- Gallery photos
- Meta information (title, description, OG image)

## Project Structure

```
wedding-invitation/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/          # API routes
│   │   ├── generate/     # Invitation generator page
│   │   └── page.tsx      # Main page
│   ├── components/       # Reusable components
│   │   └── ui/          # UI components
│   ├── config/          # Configuration files
│   ├── lib/             # Utility functions and hooks
│   └── modules/         # Page sections/modules
├── public/              # Static assets
└── .env                 # Environment variables
```

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

- Never commit your `.env` file to version control
- Keep your service account JSON file secure
- Regularly rotate your service account keys
- Use environment-specific service accounts for production

## Deployment

### Deploy on Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Configure environment variables in Vercel project settings
4. Deploy

### Environment Variables for Production

Set these in your hosting platform:
- `NEXT_PUBLIC_APP_URL`: Your production domain (e.g., `https://yourdomain.com`)
- `GOOGLE_SPREADSHEET_ID`: Your Google Spreadsheet ID
- `GOOGLE_CLIENT_EMAIL`: Service account email
- `GOOGLE_PRIVATE_KEY`: Service account private key

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Google Sheets API](https://developers.google.com/sheets/api) - Data storage
- [Lucide React](https://lucide.dev/) - Icons

## License

This project is open source and available under the [MIT License](LICENSE).
