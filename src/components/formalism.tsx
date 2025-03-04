"use client";

import { MathJax, MathJaxContext } from "better-react-mathjax";

export function Formalism() {
    return (
        <MathJaxContext>
            <p>
                Formally, a CSP is a defined as a triple <MathJax inline>{"\\( \\langle X, D, C \\rangle \\)"}</MathJax>
                , where
            </p>
            <ul className="my-3 list-disc list-inside">
                <li>
                    <MathJax inline>{"\\( X = \\{ x_1, \\dots, x_n \\} \\)"}</MathJax> is a set of variables,
                </li>
                <li>
                    <MathJax inline>{"\\( D = \\{ D_1, \\dots, D_n \\} \\)"}</MathJax> is a set of domains, and
                </li>
                <li>
                    <MathJax inline>{"\\( C = \\{ C_1, \\dots, C_m \\} \\)"}</MathJax> is a set of constraints.
                </li>
            </ul>
            <p className="mb-4">
                The assignments of the variables <MathJax inline>{"\\( x_1, \\dots, x_n \\)"}</MathJax> must always be
                contained in their respective domain, <MathJax inline>{"\\( x_i \\in D_i \\)"}</MathJax>. An evaluation{" "}
                <MathJax inline>{"\\( u \\)"}</MathJax> assigns a subset of the variables{" "}
                <MathJax inline>{"\\( X \\)"}</MathJax> to specific values in their respective domains. Such an
                evaluation is said to be <em>consistent</em> if the assigned values satisfy all constraints associated
                with their variables. It is called <em>complete</em> if all variables have an assigned value. An
                evaluation that is both consistent and complete is called a <b>solution</b>.
            </p>
            <p>
                The solver on this site uses a recursive backtracking strategy to find such a solution. For some puzzles
                this process can be optimized by explicit restrictions on the domains and faster constraint checks.
            </p>
        </MathJaxContext>
    );
}
