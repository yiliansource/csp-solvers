import { hasDuplicates, range } from "@/lib/collections";
import { getColumnIndices, getRowIndices } from "@/lib/grid";
import { CSPSolver } from "@/lib/solver";

export function solve(initialCells: Map<number, number>): number[] | null {
    const variables = range(0, 9 ** 2);
    const domains = new Map<number, number[]>(variables.map((v) => [v, range(1, 9 + 1)]));

    // Create the solver instance and provide the constraints.
    const solution = new CSPSolver(variables, domains)
        .constrain(variables, (variable, assignment) => {
            const row = getRowIndices(9, variable)
                .filter((i) => assignment.has(i))
                .map((i) => assignment.get(i));
            if (hasDuplicates(row)) return false;

            const col = getColumnIndices(9, variable)
                .filter((i) => assignment.has(i))
                .map((i) => assignment.get(i));
            if (hasDuplicates(col)) return false;

            return true;
        })
        .constrain(variables, (variable, assignment) => {
            const qy = Math.floor(variable / 9 / 3);
            const qx = Math.floor((variable % 9) / 3);

            const square = range(0, 3)
                .flatMap((ry) => range(0, 3).map((rx) => (qy * 3 + ry) * 9 + qx * 3 + rx))
                .filter((i) => assignment.has(i))
                .map((i) => assignment.get(i));
            if (hasDuplicates(square)) return false;

            return true;
        })
        .solve(initialCells);

    return solution ? range(0, 9 ** 2).map((i) => solution.get(i)!) : null;
}
