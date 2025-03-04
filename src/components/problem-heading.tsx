import * as motion from "motion/react-client";

export function ProblemHeading({ title }: { title: string }) {
    return (
        <motion.div className="mb-6 lg:mb-0 select-none transition-colors">
            <motion.div
                className="hidden lg:block absolute right-0 -top-26"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
            >
                <h1 className="text-3xl font-bold">{title}</h1>
            </motion.div>
            <motion.div
                className="block lg:hidden absolute -top-12"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
            >
                <h1 className="text-2xl font-bold">{title}</h1>
            </motion.div>
        </motion.div>
    );
}
