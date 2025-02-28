"use client";

import { range } from "@/lib/collections";
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

    const handleCellChange = (i: number, value: string) => {
        if (value == "") {
            setCells(
                produce((draft) => {
                    draft[i] = null;
                }),
            );
            return;
        }

        const number = parseInt(value);
        if (isNaN(number) || i < 0 || i >= 9 ** 2 || number < 1 || number > 9) return;

        setCells(
            produce((draft) => {
                draft[i] = number;
            }),
        );
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
        setIsSolving(false);
    };

    const handleClear = () => {
        setCells(Array.from<number | null>({ length: 9 ** 2 }).fill(null));
    };

    return (
        <>
            <div className="select-none absolute right-0 -top-26">
                <h1 className="text-3xl font-bold">Sudoku</h1>
            </div>
            <motion.div
                className="mb-8 mx-auto grid gap-2"
                style={{
                    gridTemplateColumns: "repeat(3, 160px)",
                }}
            >
                {range(0, 3).flatMap((qy) =>
                    range(0, 3).map((qx) => (
                        <div key={qx + "-" + qy} className="grid grid-cols-3 gap-1 aspect-square">
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
                                                {/* <p>
                                                    {Math.floor((y * 9 + x) / 9 / 3)},{" "}
                                                    {Math.floor(((y * 9 + x) % 9) / 3)}
                                                </p>
                                                <p>
                                                    {x}, {y}
                                                </p> */}
                                                <input
                                                    key={x + "-" + y}
                                                    className="m-auto outline-none text-center w-full text-2xl font-bold"
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
            <motion.div className="mx-auto flex flex-row gap-2" layout>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }}>
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
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }}>
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
        </>
    );
}
