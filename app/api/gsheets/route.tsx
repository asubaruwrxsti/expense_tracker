import { NextResponse } from 'next/server';
import { auth, sheets } from '@/utils/gsheetUtils';
import { google } from 'googleapis';

export async function GET(request: Request) {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: 'A1:E',
    });

    return NextResponse.json(res.data.values);
}