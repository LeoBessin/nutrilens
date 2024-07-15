import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google"
import "./globals.css";
import React from 'react';
import Image from "next/image";
import Link from "next/link";

const spacegrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NutriLens",
  description: "Keep track of your diet and nutrition with NutriLens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    return (
        <html lang="en">
        <body className={`${spacegrotesk.className} flex flex-col justify-center bg-primary-400 p-6`}>
        <Link href="/" className="w-fit pb-4 transition-all hover:scale-110">
            <Image src='/nutrilens.png' width="100" height="100" alt='nutrilens logo' className="opacity-60"/>
        </Link>
        {children}
        </body>
        </html>
    );
}
