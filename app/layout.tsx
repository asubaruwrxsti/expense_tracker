import { Inter } from 'next/font/google'
import '../public/globals.css'
import '../public/material-dashboard.min.css'
import Navbar from "@/app/components/Navbar";
import React from "react";

const inter = Inter({ subsets: ['latin'] })
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <title>Home</title>
            </head>
            <body className={'mt-5'} style={{
                backgroundImage: "url(https://source.unsplash.com/vZlTg_McCDo/1600x900)",
                backgroundSize: "cover",
            }}>
                <Navbar />
                {children}
            </body>
        </html>
    )
}
