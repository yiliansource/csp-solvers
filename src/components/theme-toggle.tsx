"use client";

import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const KEY = "dark-theme";

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem(KEY);
        if (theme !== null) {
            setIsDark(theme == "true");
            return;
        }
        console.log("override");
        setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }, []);

    useEffect(() => {
        localStorage.setItem(KEY, String(isDark));
        document.body.classList.toggle("dark", isDark);
    }, [isDark]);

    return (
        <button className="p-2" onClick={() => setIsDark((prev) => !prev)}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={isDark ? "dark" : "light"}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="scale-125">{isDark ? <FaSun /> : <FaMoon />}</div>
                </motion.div>
            </AnimatePresence>
        </button>
    );
}
