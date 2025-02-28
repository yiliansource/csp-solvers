import { findMinBy } from "./collections";

export type Constraint<V, D> = (variable: V, assigment: Map<V, D>) => boolean;

export class CSPSolver<V, D> {
    private constraints: Map<V, Constraint<V, D>[]> = new Map();

    /**
     * Initializes a new instance of a generic constraint-satisfaction-problem solver.
     *
     * @param variables The variables that need to be solved for.
     * @param domains The domains that each variable can take.
     */
    public constructor(private variables: V[], private domains: Map<V, D[]>) {
        for (const variable of this.variables) {
            // Initialize the constraint sets. By default, no variables are constrained.
            this.constraints.set(variable, []);
            if (!this.domains.has(variable)) {
                throw new Error("Every variable should have a domain assigned to it, even if it's empty.");
            }
        }
    }

    /**
     * Adds a new constraint. Variables referenced in this constraint will have it applied to it in the solver.
     */
    public constrain(variables: V[], constraint: Constraint<V, D>): CSPSolver<V, D> {
        for (const variable of variables) {
            const constraints = this.constraints.get(variable);
            if (!constraints) {
                throw new Error("Variable in constraint was not defined in the solver.");
            }
            constraints.push(constraint);
        }

        return this;
    }

    /**
     * Checks if the solver state is consistent (constraints are satisfied) given a changed variable and the changed state.
     *
     * @param variable The variable that was changed.
     * @param assignment The current state that should be tested.
     */
    public isConsistentWith(variable: V, assignment: Map<V, D>): boolean {
        for (const constraint of this.constraints.get(variable)!) {
            if (!constraint(variable, assignment)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Invokes a recursive solving algorithm to find out matching variable states.
     *
     * @param assignment An (optional) initial state.
     */
    public solve(assignment: Map<V, D> = new Map()): Map<V, D> | null {
        return this.backtrackingSolve(assignment);
    }

    private backtrackingSolve(assignment: Map<V, D>): Map<V, D> | null {
        if (assignment.size === this.variables.length) {
            return assignment;
        }

        const selected = findMinBy(
            this.variables.filter((v) => !assignment.has(v)),
            (v) => this.domains.get(v)!.length
        )!;

        for (const value of this.domains.get(selected)!) {
            const local = new Map<V, D>(assignment);
            local.set(selected, value);

            if (this.isConsistentWith(selected, local)) {
                const result = this.backtrackingSolve(local);
                if (result) {
                    return result;
                }
            }
        }

        return null;
    }
}
