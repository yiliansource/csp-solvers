"use client";

import { range } from "@/lib/collections";
import { solve } from "@/problems/skyscrapers";
import { produce } from "immer";
import { useState } from "react";

export default function SkyscrapersPage() {
    const size = 4;
    const [heights, setHeights] = useState<(number | null)[]>(range(0, size ** 2).map((i) => null));
    const [clues, setClues] = useState<(number | null)[]>(range(0, size * 4).map((i) => null));
    const [isSolving, setIsSolving] = useState(false);

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
        const number = parseInt(value.replace(/^\-+/, ""));
        console.log(i, number);
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
        }
        setIsSolving(false);
    };

    const handleClear = () => {
        setHeights(range(0, size ** 2).map((i) => null));
    };

    return (
        <>
            <div className="flex flex-col">
                <div
                    className="mb-8 mx-auto grid gap-3 select-none"
                    style={{
                        gridTemplateRows: `repeat(${size + 2}, ${cellSize})`,
                        gridTemplateColumns: `repeat(${size + 2}, ${cellSize})`,
                    }}
                >
                    {heights.map((height, i) => (
                        <div
                            key={"cell-" + i}
                            className="aspect-square bg-black/20 flex rounded-lg"
                            style={{
                                gridRowStart: Math.floor(i / size) + 2,
                                gridColumnStart: (i % size) + 2,
                            }}
                        >
                            <p className="m-auto text-2xl font-bold">{height}</p>
                        </div>
                    ))}
                    {clues.slice(0, clueIndices.length).map((clue, i) => (
                        <div
                            key={"clue-" + i}
                            className="aspect-square flex"
                            style={{
                                gridRowStart: Math.floor(clueIndices[i] / (size + 2)) + 1,
                                gridColumnStart: (clueIndices[i] % (size + 2)) + 1,
                            }}
                            tabIndex={1 + i}
                        >
                            <div className="m-auto text-2xl">
                                <input
                                    className="w-full text-center"
                                    value={clues[i] ?? "-"}
                                    onChange={(e) => handleHeightChange(i, e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mx-auto flex flex-row gap-2">
                    <button
                        className="px-12 py-3 bg-black/20 rounded-lg text-xl font-semibold"
                        onClick={handleClear}
                        disabled={isSolving}
                    >
                        Clear
                    </button>
                    <button
                        className="px-12 py-3 bg-black/20 rounded-lg text-xl font-semibold"
                        onClick={handleSolve}
                        disabled={isSolving}
                    >
                        Solve
                    </button>
                </div>
            </div>
        </>
    );
}
