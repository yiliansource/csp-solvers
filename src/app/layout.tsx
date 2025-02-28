import { LayoutTransition } from "@/layout-transition";
import clsx from "clsx";
import * as motion from "motion/react-client";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend } from "next/font/google";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const lexend = Lexend({
    variable: "--font-lexend",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "CSP Solvers",
    description: "An interactive collection of CSP solvers.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta name="theme-color" content="#ee5050" />
            </head>
            <body
                className={clsx(
                    ...[geistSans, geistMono, lexend].map((f) => f.variable),
                    "antialiased",
                    "flex flex-col min-h-screen overflow-x-hidden overflow-y-scroll",
                )}
            >
                <header className="h-42 mb-2 mx-auto max-w-4xl w-full select-none">
                    <div className="h-full flex flex-row items-center">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <p className="text-5xl font-bold">
                                    <Link href="/" tabIndex={-1}>
                                        CSP Solvers
                                    </Link>
                                </p>
                            </motion.div>
                        </motion.div>
                        <div></div>
                    </div>
                </header>
                <main className="relative flex flex-col grow mb-8 mx-auto max-w-4xl w-full">
                    <LayoutTransition
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col grow h-full"
                    >
                        {children}
                    </LayoutTransition>
                </main>
                <footer className="flex flex-row items-center justify-between justify-self-end mx-auto max-w-4xl w-full text-background-muted select-none">
                    <div className="py-8 text-3xl font-bold">
                        <p>A collection of CSP solvers.</p>
                    </div>
                    <div className="text-3xl">
                        <motion.a
                            className="block p-1"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            href="https://github.com/yiliansource/csp-solvers"
                            target="_blank"
                            tabIndex={-1}
                        >
                            <FaGithub />
                        </motion.a>
                    </div>
                </footer>
            </body>
        </html>
    );
}
