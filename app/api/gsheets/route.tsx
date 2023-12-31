import { NextResponse } from 'next/server';
import { authorize, listMajors } from '@/utils/gsheetUtils';

export async function GET(request: Request) {
    return authorize()
    .then(listMajors)
    .catch((error) => {
        console.error(error);
        return new NextResponse(JSON.stringify({ error: error }), {
            headers: { 'content-type': 'application/json' },
        });
    });
}