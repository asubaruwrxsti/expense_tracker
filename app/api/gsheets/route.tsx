import { NextResponse } from 'next/server';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import process from 'process';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request: Request) {
    const TOKEN_PATH = path.join(__dirname, 'token.json');
    const CREDENTIALS_PATH = path.join(__dirname, 'client_secret.json');
    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

    async function loadSavedCredentialsIfExist() {
        try {
          const content = (await fs.readFile(TOKEN_PATH)).toString();
          const credentials = JSON.parse(content);
          return google.auth.fromJSON(credentials);
        } catch (err) {
          return null;
        }
    }

    async function saveCredentials(client: any) {
        const content = (await fs.readFile(TOKEN_PATH)).toString();
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

    async function authorize() {
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

    async function listMajors(auth: any) {
        const sheets = google.sheets({version: 'v4', auth});
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
          // Print columns A and E, which correspond to indices 0 and 4.
          console.log(`${row[0]}, ${row[4]}`);
        });
    }
      
    authorize().then(listMajors).catch(console.error);
}