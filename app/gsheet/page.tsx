import Sidebar from "@/app/components/LeftSection";
import RightSection from "@/app/components/RightSection";
import { Metadata } from "next";
import { getSheetData } from "@/utils/gsheetUtils";
import RenderGsheetExpenses from "../components/RenderGsheetExpenses";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Google Sheets'
    }
}

export default async function gsheet() {
    const data = await getSheetData('A1:E');
    const table_titles = data ? data[0] : [];
    const expense = data ? data.slice(1).map((value: any) => {
        return table_titles.reduce((acc: any, curr: any, index: number) => {
            acc[curr] = value[index];
            return acc;
        }, {});
    }) : [];

    return (
        <div className={'container'}>
            <Sidebar active={'/gsheet'} />
            <main style={{ margin: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'top' }}>
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '10px',
                        }}>
                        <h1 className="text-center" style={{ marginRight: '10px' }}> Google Sheets </h1>
                        <p className={'text-muted'}>Today's Date is: {new Date().toLocaleDateString()}</p>
                    </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '18px', color: '#555', marginBottom: '15px' }}>
                        Unsynchronized Expenses
                    </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <RenderGsheetExpenses expense={expense} />
                </div>
            </main>
            <RightSection />
        </div>
    );
}