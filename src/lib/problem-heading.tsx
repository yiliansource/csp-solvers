export function ProblemHeading({ title }: { title: string }) {
    return (
        <div className="mb-6 lg:mb-0 select-none">
            <div className="hidden lg:block absolute right-0 -top-26">
                <h1 className="text-3xl font-bold">{title}</h1>
            </div>
            <div className="block lg:hidden absolute -top-12">
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>
        </div>
    );
}
