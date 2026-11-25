import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I put my savings in the blender — turns out I'm liquidating my assets.";

// Gate guard: the sealed scorer only accepts UTF-8 text of 1–140
// characters, not only whitespace. Fail loudly instead of shipping
// an invalid entry.
if (
  ENTRY.length < 1 ||
  ENTRY.length > 140 ||
  ENTRY.trim().length === 0 ||
  ENTRY.includes("\n")
) {
  throw new Error(
    `entry fails the 1–140 char single-line gate (got ${ENTRY.length} chars)`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
