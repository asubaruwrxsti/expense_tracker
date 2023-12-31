import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { JWT } from 'google-auth-library';

export const CREDENTIALS_PATH = path.resolve('./credentials.json');
export const TOKEN_PATH = path.resolve('./token.json');
export const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export async function loadSavedCredentialsIfExist() {
    try {
        const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS!);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

export async function saveCredentials(client: any) {
    const content = (await fs.readFile(CREDENTIALS_PATH)).toString();
    const keys = JSON.parse(content);
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
    const client = await loadSavedCredentialsIfExist();
    if (client) {
        await client.getAccessToken();
        return client;
    }

    const auth = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );

    const url = auth.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });

    const code = new URL(process.env.GOOGLE_REDIRECT_URI as string).searchParams.get('code');
    if (code) {
        const { tokens } = await auth.getToken(code);
        auth.setCredentials(tokens);
        await saveCredentials(auth);
        return auth;
    }

    return new NextResponse(
        JSON.stringify({
            url,
        }),
        {
            headers: { 'content-type': 'application/json' },
        }
    );
}

export async function listMajors(auth: any) {
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        range: 'Class Data!A2:E',
    });
    const rows = res.data.values;
    if (!rows || rows.length === 0) {
        console.log('No data found.');
        return;
    }
    console.log('Name, Major:');
    rows.forEach((row) => {
        console.log(`${row[0]}, ${row[3]}`);
    });

    return new NextResponse(JSON.stringify(rows), {
        headers: { 'content-type': 'application/json' },
    });
}