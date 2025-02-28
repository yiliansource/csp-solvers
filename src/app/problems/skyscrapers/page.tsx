"use client";

import { range } from "@/lib/collections";
import { solve } from "@/problems/skyscrapers";
import { produce } from "immer";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import * as party from "party-js";
import { useEffect, useState } from "react";

export default function SkyscrapersPage() {
    const [size, setSize] = useState(4);
    const [heights, setHeights] = useState<(number | null)[]>([]);
    const [clues, setClues] = useState<(number | null)[]>([]);
    const [isSolving, setIsSolving] = useState(false);

    useEffect(() => {
        setHeights(Array.from<number | null>({ length: size ** 2 }).fill(null));
        setClues(Array.from<number | null>({ length: size * 4 }).fill(null));
    }, [size]);

    useEffect(() => {
        setClues([2, 1, 2, 2, 2, 3, 2, 1, 1, 2, 4, 3, 3, 2, 1, 2]);
    }, []);

    const cellSize = "64px";
    const clueIndices = [
        ...range(0, size).map((i) => i + 1),
        ...range(0, size).map((i) => (i + 2) * (size + 2) - 1),
        ...range(0, size)
            .reverse()
            .map((i) => (size + 2) ** 2 - size - 1 + i),
        ...range(0, size)
            .reverse()
            .map((i) => (i + 1) * (size + 2)),
    ];

    const handleHeightChange = (i: number, value: string) => {
        if (value === "") {
            setClues(
                produce((draft) => {
                    draft[i] = null;
                }),
            );
            return;
        }

        const number = parseInt(value.replace(/\-/g, ""));
        if (isNaN(number) || i < 0 || i >= size * 4 || number < 1 || number > size) return;

        setClues(
            produce((draft) => {
                draft[i] = number;
            }),
        );
    };

    const handleSolve = () => {
        handleClear();
        setIsSolving(true);
        const solution = solve(
            size,
            clues.map((c) => c ?? 0),
        );
        if (solution) {
            setHeights(solution);

            party.settings.gravity = 1200;
            party.confetti(document.getElementById("solve-button")!, {
                count: party.variation.range(30, 40),
                size: 1,
            });
        }
        setIsSolving(false);
    };

    const handleClear = () => {
        setHeights(Array.from<number | null>({ length: size ** 2 }).fill(null));
    };

    return (
        <>
            <div className="relative flex flex-col">
                <motion.div
                    className="mb-6 mx-auto flex flex-row items-center gap-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.45 }}
                    layout
                >
                    <p className="text-xl font-bold">Size</p>
                    <input
                        className=""
                        type="range"
                        min="1"
                        max="7"
                        value={size}
                        onChange={(e) => setSize(parseInt(e.target.value))}
                    />
                </motion.div>
                <motion.div
                    className="mb-10 mx-auto grid gap-3 select-none"
                    style={{
                        gridTemplateRows: `repeat(${size + 2}, ${cellSize})`,
                        gridTemplateColumns: `repeat(${size + 2}, ${cellSize})`,
                    }}
                    id="skyscraper-grid"
                    layout
                >
                    {heights.map((height, i) => (
                        <motion.div
                            key={"cell-" + i}
                            className="aspect-square bg-background-muted flex rounded-lg"
                            style={{
                                gridRowStart: Math.floor(i / size) + 2,
                                gridColumnStart: (i % size) + 2,
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: ((i % size) + Math.floor(i / size)) * 0.05 }}
                        >
                            <AnimatePresence mode="wait">
                                {!!height && (
                                    <motion.p
                                        key={height}
                                        className="m-auto text-2xl font-bold"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{ duration: 0.1 }}
                                    >
                                        {height}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                    {clues.slice(0, clueIndices.length).map((clue, i) => (
                        <motion.div
                            key={"clue-" + i}
                            className="relative aspect-square flex"
                            style={{
                                gridRowStart: Math.floor(clueIndices[i] / (size + 2)) + 1,
                                gridColumnStart: (clueIndices[i] % (size + 2)) + 1,
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.04 }}
                        >
                            <input
                                className="m-auto text-2xl font-bold w-full h-full text-center outline-none rounded-lg border-2 border-transparent focus:border-white transition-colors"
                                value={clues[i] ?? "-"}
                                onChange={(e) => handleHeightChange(i, e.target.value)}
                                tabIndex={1 + i}
                            />
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div className="mx-auto flex flex-row gap-2" layout>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}>
                        <motion.button
                            className="px-12 py-3 bg-background-muted rounded-lg text-xl font-semibold"
                            onClick={handleClear}
                            disabled={isSolving}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Clear
                        </motion.button>
                    </motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }}>
                        <motion.button
                            className="px-12 py-3 bg-background-muted rounded-lg text-xl font-semibold"
                            onClick={handleSolve}
                            disabled={isSolving}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            id="solve-button"
                        >
                            Solve
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}
