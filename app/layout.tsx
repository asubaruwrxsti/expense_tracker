import '@/public/material-dashboard.min.css'
import React from "react";
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
				<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp" rel="stylesheet"></link>
				<title>Home</title>
			</head>
			<body className={'mt-5'} style={{
				backgroundImage: "url('/v904-nunny-012.jpg')",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}>
				{children}
			</body>
		</html>
	)
}
