import { ThemeToggle } from "@/components/theme-toggle";
import { LayoutTransition } from "@/layout-transition";
import clsx from "clsx";
import * as motion from "motion/react-client";
import type { Metadata } from "next";
import { Lexend, Roboto } from "next/font/google";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

import "./globals.css";

const roboto = Roboto({
    variable: "--font-roboto",
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
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <meta property="og:image" content="/apple-touch-icon.png" />
                <meta name="theme-color" content="#f2f6d0" />
            </head>
            <body
                className={clsx(
                    ...[lexend, roboto].map((f) => f.variable),
                    "antialiased",
                    "flex flex-col min-h-screen overflow-x-hidden overflow-y-scroll",
                )}
            >
                <div className="grow flex flex-col w-full max-w-5xl mx-auto px-3">
                    <header className="h-32 lg:h-42 mb-2 select-none">
                        <div className="h-full flex flex-row items-center justify-between">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <p className="text-5xl font-bold transition-colors">
                                        <Link href="/" tabIndex={-1}>
                                            CSP Solvers
                                        </Link>
                                    </p>
                                </motion.div>
                            </motion.div>
                            <div>
                                <div className="-translate-y-8 lg:-translate-y-12 text-background-muted">
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                    </header>
                    <motion.main className="relative flex flex-col grow mb-8" layout>
                        <LayoutTransition
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col grow h-full"
                        >
                            {children}
                        </LayoutTransition>
                    </motion.main>
                    <footer className="h-14 lg:h-24 flex flex-row items-center justify-between justify-self-end text-background-muted select-none">
                        <div className="text-xl lg:text-3xl font-bold">
                            <p>A collection of CSP solvers.</p>
                        </div>
                        <div className="text-2xl lg:text-3xl">
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
                </div>
            </body>
        </html>
    );
}
