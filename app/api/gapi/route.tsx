import {google} from 'googleapis';

const google_auth = {
	version: 'v1',
	client_id: process.env.GOOGLE_CLIENT_ID,
	client_secret: process.env.GOOGLE_CLIENT_SECRET,
};