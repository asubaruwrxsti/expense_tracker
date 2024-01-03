import { google } from 'googleapis';
import { Expense } from "@prisma/client";

export const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
    ],
});

export const sheets = google.sheets({ version: 'v4', auth });

export async function getSheetData(range: string) {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range,
    });

    return res.data.values;
}

export async function appendSheetData(range: string, values: Expense[]) {
    try {
        const res = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: values.map((value) => [
                    value.id,
                    value.name,
                    value.description,
                    value.categoriesId,
                    value.amount,
                ]),
            },
        });
        return res.data;

    } catch (error) {
        console.log(error);
    }
}

export async function updateSheetData(range: string, values: Expense[]) {
    const res = await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: values.map((value) => [
                value.id,
                value.name,
                value.description,
                value.categoriesId,
                value.amount,
            ]),
        },
    });

    return res.data;
}

export async function clearSheetData(range: string) {
    const res = await sheets.spreadsheets.values.clear({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range,
    });

    return res.data;
}