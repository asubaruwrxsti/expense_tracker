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
}: SweetAlertProps) {
    const [result, setResult] = useState();

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
            console.log(result);
        });
    }, []);

    return (
        <div>
            <p>{result}</p>
        </div>
    )
}
