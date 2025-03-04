import * as fs from "fs";
import { glob } from "glob";
import * as path from "path";
import { z } from "zod";

const problemMetaJsonSchema = z.object({
    id: z.string(),
    title: z.string(),
});

export type ProblemMetadata = z.infer<typeof problemMetaJsonSchema>;

export async function getProblems(): Promise<ProblemMetadata[]> {
    const problems: ProblemMetadata[] = [];

    const problemsRoot = path.join(process.cwd(), "src", "problems");
    const problemMetadataFiles = await glob("**/meta.json", { cwd: problemsRoot });

    for (const problemMetadataFile of problemMetadataFiles) {
        const problemMetadataPath = path.join(problemsRoot, problemMetadataFile);
        const problemMetadataContents = fs.readFileSync(problemMetadataPath, "utf-8");

        const result = problemMetaJsonSchema.safeParse(JSON.parse(problemMetadataContents));
        if (!result.success) continue;

        problems.push(result.data);
    }

    return problems;
}
