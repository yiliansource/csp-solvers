import { Formalism } from "@/components/formalism";
import { getProblems } from "@/lib/problems";
import * as motion from "motion/react-client";
import Link from "next/link";

export default async function Home() {
    const problems = await getProblems();

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
                    {problems.map((problem, i) => (
                        <motion.div
                            key={problem.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 * i }}
                            layout
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href={`/problems/${problem.id}`}>
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
                <Formalism />
            </div>
        </>
    );
}
