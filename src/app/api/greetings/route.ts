import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const SHEET_NAME = "Greetings";

// Initialize Google Sheets API
const getGoogleSheetsClient = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
};

// GET - Fetch greetings from Google Sheets
export async function GET() {
  try {
    if (!SPREADSHEET_ID) {
      return NextResponse.json(
        { error: "Google Spreadsheet ID not configured" },
        { status: 500 }
      );
    }

    const sheets = getGoogleSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:D`, // Columns: Timestamp, Name, Message, Attendance
    });

    const rows = response.data.values || [];

    // Skip header row and format data
    const greetings = rows.slice(1).map((row) => ({
      timestamp: row[0] || "",
      name: row[1] || "",
      message: row[2] || "",
      attendance: row[3] || "",
    }));

    return NextResponse.json({ greetings });
  } catch (error) {
    console.error("Error fetching greetings:", error);
    return NextResponse.json(
      { error: "Failed to fetch greetings" },
      { status: 500 }
    );
  }
}

// POST - Add new greeting to Google Sheets
export async function POST(request: NextRequest) {
  try {
    if (!SPREADSHEET_ID) {
      console.error("GOOGLE_SPREADSHEET_ID not configured");
      return NextResponse.json(
        { error: "Google Spreadsheet ID not configured" },
        { status: 500 }
      );
    }

    if (!process.env.GOOGLE_CLIENT_EMAIL) {
      console.error("GOOGLE_CLIENT_EMAIL not configured");
      return NextResponse.json(
        { error: "Google client email not configured" },
        { status: 500 }
      );
    }

    if (!process.env.GOOGLE_PRIVATE_KEY) {
      console.error("GOOGLE_PRIVATE_KEY not configured");
      return NextResponse.json(
        { error: "Google private key not configured" },
        { status: 500 }
      );
    }

    const { name, message, attendance } = await request.json();

    if (!name || !attendance) {
      console.error("Missing required fields:", {
        name: !!name,
        message: !!message,
        attendance: !!attendance,
      });
      return NextResponse.json(
        { error: "Name, and attendance are required" },
        { status: 400 }
      );
    }

    const sheets = getGoogleSheetsClient();
    const timestamp = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:D`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[timestamp, name, message, attendance]],
      },
    });

    return NextResponse.json({
      success: true,
      greeting: { timestamp, name, message, attendance },
    });
  } catch (error) {
    console.error("Error adding greeting:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        error: "Failed to add greeting",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
