"use client";

import { ProblemHeading } from "@/components/problem-heading";
import { range } from "@/lib/collections";
import { useWindowWidth } from "@/lib/hooks/use-window-width";
import { solve } from "@/problems/sudoku";
import { produce } from "immer";
import * as motion from "motion/react-client";
import * as party from "party-js";
import { useState } from "react";

export default function SudokuPage() {
    const [cells, setCells] = useState<(number | null)[]>(
        [
            [null, null, null, null, 1, null, 3, 7, null],
            [null, null, null, 3, null, 7, 4, null, null],
            [3, null, 4, null, null, null, 5, 6, null],
            [null, null, 1, 2, null, null, null, 8, 4],
            [null, null, null, null, 3, null, 2, 5, null],
            [8, null, null, 9, null, null, null, null, 3],
            [4, null, 6, null, null, 1, null, null, null],
            [null, 1, 8, 6, 9, null, null, null, null],
            [7, null, null, null, null, null, null, 9, 6],
        ].flat(),
    );
    const [isSolving, setIsSolving] = useState(false);
    const [noSolution, setNoSolution] = useState(false);

    const windoWidth = useWindowWidth();

    const smallCellGap = windoWidth < 640 ? 2 : 4;
    const largeCellGap = windoWidth < 640 ? 6 : 10;
    const cellWidth = windoWidth < 640 ? 36 : 48;

    const handleCellChange = (i: number, value: string) => {
        if (value == "") {
            setCells(
                produce((draft) => {
                    draft[i] = null;
                }),
            );
            setNoSolution(false);

            return;
        }

        const number = parseInt(value);
        if (isNaN(number) || i < 0 || i >= 9 ** 2 || number < 1 || number > 9) return;

        setCells(
            produce((draft) => {
                draft[i] = number;
            }),
        );
        setNoSolution(false);
    };

    const handleSolve = () => {
        setIsSolving(true);

        const initialAssignment = new Map<number, number>(
            cells.map((v, i) => [i, v]).filter(([, v]) => v !== null) as [number, number][],
        );
        const solution = solve(initialAssignment);

        if (solution) {
            setCells(solution);

            party.settings.gravity = 1200;
            party.confetti(document.getElementById("solve-button")!, {
                count: party.variation.range(30, 40),
                size: 1,
            });
        }

        setNoSolution(!solution);
        setIsSolving(false);
    };

    const handleClear = () => {
        setCells(Array.from<number | null>({ length: 9 ** 2 }).fill(null));
        setNoSolution(false);
    };

    return (
        <>
            <ProblemHeading title="Sudoku" />
            <motion.div
                className="mb-8 mx-auto grid"
                style={{
                    gridTemplateColumns: `repeat(3, ${cellWidth * 3 + smallCellGap * 2}px)`,
                    gap: largeCellGap + "px",
                }}
            >
                {range(0, 3).flatMap((qy) =>
                    range(0, 3).map((qx) => (
                        <div
                            key={qx + "-" + qy}
                            className="grid grid-cols-3 aspect-square"
                            style={{ gap: smallCellGap + "px" }}
                        >
                            {range(0, 3)
                                .map((ry) => qy * 3 + ry)
                                .flatMap((y) =>
                                    range(0, 3)
                                        .map((rx) => qx * 3 + rx)
                                        .map((x) => (
                                            <motion.div
                                                className="flex flex-col bg-background-muted aspect-square rounded-lg"
                                                key={qx * 3 + x + "-" + (qy * 3 + y)}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.03 * (qx * 3 + x + (qy * 3 + y)) }}
                                            >
                                                <input
                                                    key={x + "-" + y}
                                                    className="m-auto outline-none text-center w-full text-xl lg:text-2xl font-bold"
                                                    type="tel"
                                                    value={cells[y * 9 + x] ?? ""}
                                                    onChange={(e) => handleCellChange(y * 9 + x, e.target.value)}
                                                    tabIndex={y * 9 + x + 1}
                                                />
                                            </motion.div>
                                        )),
                                )}
                        </div>
                    )),
                )}
            </motion.div>
            <motion.div className="mb-4 h-8 flex" layout>
                <motion.div
                    className="m-auto text-red-700 dark:text-red-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: noSolution ? 1 : 0 }}
                >
                    No solution could be found.
                </motion.div>
            </motion.div>
            <motion.div className="mx-auto flex flex-row gap-2" animate={{ opacity: isSolving ? 0.5 : 1 }} layout>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }}>
                    <motion.button
                        className="px-12 py-3 bg-red-700/40 rounded-lg text-xl font-semibold"
                        onClick={handleClear}
                        disabled={isSolving}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Clear
                    </motion.button>
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }}>
                    <motion.button
                        className="px-12 py-3 bg-green-700/40 rounded-lg text-xl font-semibold"
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
        </>
    );
}
