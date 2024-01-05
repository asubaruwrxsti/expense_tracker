import Sidebar from "@/app/components/LeftSection";
import RightSection from "@/app/components/RightSection";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/app/components/Loading";
import { getSheetData } from "@/utils/gsheetUtils";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Google Sheets'
    }
}

export default async function gsheet() {
    const data = await getSheetData('A1:E');
    const table_titles = data ? data[0] : [];
    const expense = data ? data.slice(1).map((value) => {
        return table_titles.reduce((acc, curr, index) => {
            acc[curr] = value[index];
            return acc;
        }, {});
    }) : [];

    return (
        <div className={'container'}>
            <Sidebar active={'/gsheet'} />
            <main style={{ margin: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1 className="text-center" style={{ marginRight: '10px', color: '#333' }}> Google Sheets </h1>
                    <p className={'text-muted'}>Today's Date is: {new Date().toLocaleDateString()}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '18px', color: '#555', marginBottom: '15px' }}>
                        Unsynchronized Expenses
                    </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {expense.map((value, index) => {
                        return (
                            <div key={index} className={'analyse'}>
                                <div className={'sales'}>
                                    {Object.keys(value).map((key, index) => {
                                        return (
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                                                <span className={'text-muted'}>{key}</span>
                                                <span className={'text-muted'}> -- {value[key]}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
            <RightSection />
        </div>
    );
}