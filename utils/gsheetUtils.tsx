import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const CREDENTIALS_PATH = path.resolve('./credentials.json');
export const TOKEN_PATH = path.resolve('./token.json');
export const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content.toString());
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

export async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content.toString());
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

export async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

export async function listMajors(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: 'A1:E',
    });
    const rows = res.data.values;
    if (!rows || rows.length === 0) {
        console.log('No data found.');
        return;
    }
    console.log('Name, Major:');
    rows.forEach((row) => {
        // Print columns A and E, which correspond to indices 0 and 4.
        console.log(`${row[0]}, ${row[4]}`);
    });
}