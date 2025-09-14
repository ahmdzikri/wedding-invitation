# Troubleshooting Guide: "Failed to add greeting" Error

This guide helps you debug and fix the "Failed to add greeting" error when submitting greetings.

## Common Causes and Solutions

### 1. Environment Variables Not Configured

**Symptoms:**
- Error: "Google Spreadsheet ID not configured"
- Error: "Google client email not configured"
- Error: "Google private key not configured"

**Solution:**
Ensure your `.env` file contains all required variables:
```env
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 2. Missing 'Greetings' Sheet

**Symptoms:**
- Error: "Unable to parse range: Greetings!A:C"
- Error: "Requested entity was not found"

**Solution:**
The API now automatically creates the 'Greetings' sheet if it doesn't exist. If you still get this error:
1. Ensure the service account has "Editor" permissions on the spreadsheet
2. Verify the spreadsheet ID is correct
3. Check that the service account email has been shared with the spreadsheet

### 3. Google Sheets API Access Issues

**Symptoms:**
- Error: "The caller does not have permission"
- Error: "Requested entity was not found"

**Solution:**
1. Verify the spreadsheet ID is correct
2. Ensure the service account email has been shared with the spreadsheet
3. Check that the service account has "Editor" permissions
4. The 'Greetings' sheet will be created automatically if it doesn't exist

### 4. Private Key Format Issues

**Symptoms:**
- Error: "Invalid JWT"
- Error: "Invalid key format"

**Solution:**
Ensure the private key in `.env` is properly formatted:
- Wrapped in double quotes
- Contains literal `\n` characters (not actual line breaks)
- Includes the full key from `-----BEGIN PRIVATE KEY-----` to `-----END PRIVATE KEY-----`

### 5. Network/CORS Issues

**Symptoms:**
- Error: "Failed to fetch"
- Network errors in browser console

**Solution:**
1. Check if the development server is running
2. Verify the API route is accessible at `/api/greetings`
3. Check browser network tab for detailed error information

## Debugging Steps

### Step 1: Check Environment Variables
1. Open your `.env` file
2. Verify all three variables are present and properly formatted
3. Restart your development server after making changes

### Step 2: Test API Endpoint Directly
1. Open browser developer tools
2. Go to Network tab
3. Try submitting a greeting
4. Check the API request/response details

### Step 3: Check Server Logs
1. Look at your terminal/console where the dev server is running
2. Check for detailed error messages and stack traces
3. The enhanced logging will show:
   - Request data received
   - Environment variable status
   - Google Sheets API responses
   - Detailed error information

### Step 4: Verify Google Sheets Setup
1. Open your Google Spreadsheet
2. Ensure it has a sheet named "Greetings"
3. Verify the service account email has access
4. Check that columns A, B, C are available for Timestamp, Name, Message

### Step 5: Test with Manual API Call
Use a tool like Postman or curl to test the API directly:
```bash
curl -X POST http://localhost:3000/api/greetings \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","message":"Test message"}'
```

## Error Messages Reference

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "Google Spreadsheet ID not configured" | Missing GOOGLE_SPREADSHEET_ID | Add to .env file |
| "Google client email not configured" | Missing GOOGLE_CLIENT_EMAIL | Add to .env file |
| "Google private key not configured" | Missing GOOGLE_PRIVATE_KEY | Add to .env file |
| "Unable to parse range: Greetings!A:C" | Missing 'Greetings' sheet | Sheet will be created automatically |
| "Name and message are required" | Empty form fields | Fill in both name and message |
| "The caller does not have permission" | Service account lacks access | Share spreadsheet with service account |
| "Requested entity was not found" | Wrong spreadsheet ID or missing sheet | Verify ID, sheet created automatically |
| "Invalid JWT" | Malformed private key | Check private key format |

## Getting Help

If you're still experiencing issues:
1. Check the browser console for JavaScript errors
2. Check the server console for API errors
3. Verify your Google Cloud project settings
4. Ensure the Google Sheets API is enabled
5. Try creating a new service account key

## Test Script

Run the test script to verify your configuration:
```bash
node test-sheets-api.js
```

This will test your Google Sheets API connection and help identify configuration issues.