import { NextResponse } from 'next/server';

// Debug endpoint to check environment configuration
export async function GET() {
  try {
    const envCheck = {
      GOOGLE_SPREADSHEET_ID: {
        configured: !!process.env.GOOGLE_SPREADSHEET_ID,
        value: process.env.GOOGLE_SPREADSHEET_ID ? 
          `${process.env.GOOGLE_SPREADSHEET_ID.substring(0, 10)}...` : 
          'Not set'
      },
      GOOGLE_CLIENT_EMAIL: {
        configured: !!process.env.GOOGLE_CLIENT_EMAIL,
        value: process.env.GOOGLE_CLIENT_EMAIL ? 
          `${process.env.GOOGLE_CLIENT_EMAIL.split('@')[0]}@...` : 
          'Not set'
      },
      GOOGLE_PRIVATE_KEY: {
        configured: !!process.env.GOOGLE_PRIVATE_KEY,
        startsWithBegin: process.env.GOOGLE_PRIVATE_KEY?.startsWith('-----BEGIN PRIVATE KEY-----') || false,
        endsWithEnd: process.env.GOOGLE_PRIVATE_KEY?.endsWith('-----END PRIVATE KEY-----\n') || false,
        length: process.env.GOOGLE_PRIVATE_KEY?.length || 0
      },
      NODE_ENV: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(envCheck);
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to check environment',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}