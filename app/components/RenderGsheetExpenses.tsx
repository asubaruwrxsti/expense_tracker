'use client';
import SweetAlert from "@/app/components/SweetAlert";
import React, { useState } from 'react';

export default function RenderGsheetExpenses({ expense }: any) {
    const [showAlert, setShowAlert] = useState(false);

    return (
        <div className={'analyse'}>
            {expense.map((value: any, index: number) => {
                return (
                    <div className={'sales'} key={index}>
                        <div>
                            <h4 style={{ fontSize: '16px', color: '#555', marginBottom: '15px' }}>
                                No {index + 1}
                            </h4>
                        </div>
                        {Object.keys(value).map((key, index) => {
                            return (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }} key={index}>
                                    <span className={'text-muted'}>{key}</span>
                                    <span className={'text-muted'}>{value[key]}</span>
                                </div>
                            )
                        })}
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <button className={'notification add-reminder'}
                                style={{
                                    padding: '1rem',
                                    margin: '0 10px 0 0',
                                    border: 'none',
                                    marginRight: '10px',
                                }}
                                onClick={() => setShowAlert(true)}
                            >
                                <i className={'material-icons-sharp'}>visibility</i>
                                <span>View</span>
                            </button>

                            {showAlert &&
                                <SweetAlert
                                    title="Success"
                                    text="Expense synced successfully!"
                                    icon="success"
                                    confirmButtonText="Ok"
                                    cancelButtonText="Cancel"
                                    confirmButtonColor="#d33"
                                    cancelButtonColor="#3085d6"
                                    showCancelButton={false}
                                    showConfirmButton={true}
                                    reverseButtons={false}
                                    onConfirm={() => setShowAlert(false)}
                                    onCancel={() => setShowAlert(false)}
                                />
                            }
                            <button className={'notification add-reminder'}
                                style={{
                                    padding: '1rem',
                                    margin: '0 10px 0 0',
                                    border: 'none',
                                    marginRight: '10px',
                                }}
                            >
                                <i className={'material-icons-sharp'}>sync</i>
                                <span>Sync</span>
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}