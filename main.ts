import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const TEXT = `You fall asleep in the hammock.
It holds you. A sway. A stillness.
Your father sits below, reading, low.
The rope above you has held
a hundred summers of sleepers,
and it is holding still,
over the grass, over you.
You do not have to hold on.
`;

const chars = [...TEXT].length;
if (chars < 1 || chars > 280) {
  console.error(`entry is ${chars} characters, must be 1-280`);
  process.exit(1);
}
if (TEXT.trim().length === 0) {
  console.error("entry is only whitespace");
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", TEXT, "utf8");

const written = readFileSync("/output/entry.txt", "utf8");
if (written !== TEXT) {
  console.error("written entry does not match the embedded text");
  process.exit(1);
}
const writtenBytes = readFileSync("/output/entry.txt");
if (!writtenBytes.equals(Buffer.from(TEXT, "utf8"))) {
  console.error("written entry bytes do not match the embedded text bytes");
  process.exit(1);
}
console.log(`wrote /output/entry.txt (${chars} characters)`);
