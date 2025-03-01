import { metadatas as problemMetadatas } from "@/problems";
import * as motion from "motion/react-client";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <div className="mb-12 text-lg *:mb-4 text-justify font-(family-name:--font-roboto)">
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
                                <div className="px-8 py-4 lg:px-12 lg:py-6 bg-background-muted rounded-lg">
                                    <p className="text-lg lg:text-2xl font-bold">{problem.title}</p>
                                </div>
                            </Link>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </>
    );
}
