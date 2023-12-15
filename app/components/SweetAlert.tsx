'use client';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';

type SweetAlertProps = {
    title: string;
    text: string;
    icon: 'success' | 'error' | 'warning' | 'info' | 'question';
    confirmButtonText: string;
    cancelButtonText: string;
    confirmButtonColor: string;
    cancelButtonColor: string;
    showCancelButton: boolean;
    showConfirmButton: boolean;
    reverseButtons: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
};

export default function SweetAlert({
    title,
    text,
    icon,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor,
    cancelButtonColor,
    showCancelButton,
    showConfirmButton,
    reverseButtons,
    onConfirm,
    onCancel,
}: SweetAlertProps) {
    const [result, setResult] = useState<{ value?: boolean }>({});

    useEffect(() => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            confirmButtonColor: confirmButtonColor,
            cancelButtonColor: cancelButtonColor,
            showCancelButton: showCancelButton,
            showConfirmButton: showConfirmButton,
            reverseButtons: reverseButtons,
        }).then((result) => {
            setResult(result);
            if (result.value && onConfirm) {
                onConfirm();
            } else if (!result.value && onCancel) {
                onCancel();
            }
        });
    }, [title, text, icon, confirmButtonText, cancelButtonText, confirmButtonColor, cancelButtonColor, showCancelButton, showConfirmButton, reverseButtons, onConfirm, onCancel]);

    return (
        <div>
            {/* Customize the rendering logic based on your requirements */}
            <p>{JSON.stringify(result)}</p>
        </div>
    )
}
