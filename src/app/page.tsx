"use client";

import { metadatas as problemMetadatas } from "@/problems";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import * as motion from "motion/react-client";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <div className="mb-6 text-lg *:mb-4 text-justify font-(family-name:--font-roboto) leading-8">
                <p>
                    <b className="font-bold">Constraint satisfaction problems (CSPs)</b> are mathematical questions
                    defined as a set of objects whose state must satisfy a number of constraints or limitations. CSPs
                    represent the entities in a problem as a homogeneous collection of finite constraints over
                    variables, which is solved by constraint satisfaction methods.
                </p>
                <p>
                    This website serves as a host to a collection of interactive CSP solvers, each of which is designed
                    to solve a specific type of CSP. The solvers are implemented in TypeScript and are available for use
                    in the browser. The source code is available on GitHub.
                </p>
            </div>
            <div className="mb-12">
                <h3 className="mb-3 text-2xl font-bold">Take a look!</h3>
                <div className="flex flex-row flex-wrap gap-2 lg:gap-4">
                    {problemMetadatas.map((problem, i) => (
                        <motion.div
                            key={problem.key}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 * i }}
                            layout
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href={`/problems/${problem.key}`}>
                                    <div className="px-8 py-4 bg-background-muted rounded-lg">
                                        <p className="text-lg lg:text-xl font-bold">{problem.title}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="text-lg font-(family-name:--font-roboto) leading-8">
                <MathJaxContext>
                    <p>
                        Formally, a CSP is a defined as a triple{" "}
                        <MathJax inline>{"\\( \\langle X, D, C \\rangle \\)"}</MathJax>, where
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
                        The assignments of the variables <MathJax inline>{"\\( x_1, \\dots, x_n \\)"}</MathJax> must
                        always be contained in their respective domain,{" "}
                        <MathJax inline>{"\\( x_i \\in D_i \\)"}</MathJax>. An evaluation{" "}
                        <MathJax inline>{"\\( u \\)"}</MathJax> assigns a subset of the variables{" "}
                        <MathJax inline>{"\\( X \\)"}</MathJax> to specific values in their respective domains. Such an
                        evaluation is said to be <em>consistent</em> if the assigned values satisfy all constraints
                        associated with their variables. It is called <em>complete</em> if all variables have an
                        assigned value. An evaluation that is both consistent and complete is called a <b>solution</b>.
                    </p>
                    <p>
                        The solver on this site uses a recursive backtracking strategy to find such a solution. For some
                        puzzles this process can be optimized by explicit restrictions on the domains and faster
                        constraint checks.
                    </p>
                </MathJaxContext>
            </div>
        </>
    );
}
