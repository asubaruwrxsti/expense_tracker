import { NextResponse } from 'next/server';
import { getSheetData } from '@/utils/gsheetUtils';

export async function GET(request: Request) {
    try {
        const params = new URLSearchParams(request.url.split('?')[1]);
        const range = params.get('range') || 'A1:E';
        const res = await getSheetData(range);
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.error();
    }
}