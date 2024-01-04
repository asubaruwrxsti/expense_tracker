import Sidebar from "@/app/components/LeftSection";
import RightSection from "@/app/components/RightSection";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/app/components/Loading";
import { getSheetData } from "@/utils/gsheetUtils";
import { Expense } from "@prisma/client";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Google Sheets'
    }
}

export default async function gsheet() {
    const data = await getSheetData('A1:E');

    return (
        <Suspense fallback={<Loading icon="info" />}>
            <div className={'container'}>
                <Sidebar active={'/gsheet'} />
                <main>
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
                    <h3 style={{ fontSize: '16px', color: '#555', marginBottom: '15px' }}>
                        Unsynchronized Expenses
                    </h3>
                    <div className={'analyse'}>
                        <div className={'analyse-card'}>
                            <div className={'analyse-card-header'}>
                                <h4>Expenses</h4>
                                <span className={'material-icons-sharp'}>receipt_long</span>
                            </div>
                            <div className={'analyse-card-body'}>
                                {data ? Array.from(data).map((value) => {
                                    return (
                                        <div className={'analyse-card-body-item'}>
                                            <div className={'flex justify-between'}>
                                                <div className={'flex justify-between'}>
                                                    <div className={'flex flex-col'}>
                                                        <span className={'text-muted'}>Name</span>
                                                        <span>{value[1]}</span>
                                                    </div>
                                                    <div className={'flex flex-col'}>
                                                        <span className={'text-muted'}>Description</span>
                                                        <span>{value[2]}</span>
                                                    </div>
                                                    <div className={'flex flex-col'}>
                                                        <span className={'text-muted'}>Categories</span>
                                                        <span>{value[3]}</span>
                                                    </div>
                                                    <div className={'flex flex-col'}>
                                                        <span className={'text-muted'}>Amount</span>
                                                        <span>{value[4]}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : <Loading icon="info" />}
                            </div>
                        </div>
                    </div>
                </main>
                <RightSection />
            </div>
        </Suspense>
    );
}