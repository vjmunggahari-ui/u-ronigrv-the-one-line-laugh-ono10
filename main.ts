// The One-Line Laugh entry (Node 22, standard library only).
// Writes one funny line to /output/entry.txt.
// The line: a GPS that knows too much — an everyday truth (the GPS reroutes
// you) with a surprise turn at the end (it knows your search history).
// Gate: UTF-8 text of 1-200 characters, not only whitespace, one line.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const LINE =
  "I asked the GPS for the fastest route home and it drove me past my ex's house, so apparently it knows my search history too.";

const byteLength = Buffer.byteLength(LINE, 'utf8');
if (byteLength < 1 || byteLength > 200) {
  console.error(`entry must be 1-200 bytes, got ${byteLength}`);
  process.exit(1);
}
if (LINE.trim().length === 0) {
  console.error('entry must not be only whitespace');
  process.exit(1);
}
if (LINE.includes('\n') || LINE.includes('\r')) {
  console.error('entry must be a single line');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
const dest = join(OUTPUT_DIR, 'entry.txt');
writeFileSync(dest, LINE, 'utf8');

// Read-back: the written file must be byte-identical to the line.
const back = readFileSync(dest, 'utf8');
if (back !== LINE) {
  console.error('entry.txt read-back differs from the line');
  process.exit(1);
}
// Byte-level second read-back: compare raw bytes, exact length, no trailing space.
const raw = readFileSync(dest);
if (!raw.equals(Buffer.from(LINE, 'utf8'))) {
  console.error('entry.txt bytes differ from the line');
  process.exit(1);
}
if (LINE.length !== 124) {
  console.error(`entry must be exactly 124 chars, got ${LINE.length}`);
  process.exit(1);
}
if (LINE !== LINE.trim()) {
  console.error('entry must not start or end with whitespace');
  process.exit(1);
}
console.log(`wrote entry.txt (${LINE.length} chars, ${byteLength} bytes)`);
