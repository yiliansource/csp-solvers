import Image from "next/image";
import Link from "next/link";

interface CSPProperties {
    identifier: string;
    title: string;
}

const csps: CSPProperties[] = [
    {
        identifier: "skyscrapers",
        title: "Skyscrapers",
    },
];

export default function Home() {
    return (
        <>
            <div className="mb-12 text-lg *:mb-2 text-justify">
                <p className="font-light">
                    <b className="font-bold">Constraint satisfaction problems (CSPs)</b> are mathematical questions
                    defined as a set of objects whose state must satisfy a number of constraints or limitations. CSPs
                    represent the entities in a problem as a homogeneous collection of finite constraints over
                    variables, which is solved by constraint satisfaction methods.
                </p>
                <p className="font-light">
                    This website serves as a host to a collection of interactive CSP solvers, each of which is designed
                    to solve a specific type of CSP. The solvers are implemented in TypeScript and are available for use
                    in the browser. The source code is available on GitHub.
                </p>
            </div>
            <div className="flex flex-row gap-2">
                {csps.map((csp) => (
                    <div key={csp.identifier}>
                        <Link href={`/problems/${csp.identifier}`}>
                            <div className="px-12 py-6 bg-black/20 rounded-lg">
                                <p className="text-2xl font-bold">{csp.title}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
