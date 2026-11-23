// Sleeve Notes for the Frog Trio — entry point
// Writes album title and back cover blurb to MAKEFUN_OUTPUT_DIR/entry.txt or /output/entry.txt

const ENTRY_TEXT = `Night at the Sedge
The Sedge Club, second set, the faithful remain. Webster's tenor floats "My Foolish Heart" — breathy, patient, each phrase a question. Mott answers on bass, lines that converse. Croak's brushes color the silence. A waiter sets drinks down without a clink. At the bridge, the room leans in. The gig you tell people about decades later.`;

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const outputPath = `${outputDir}/entry.txt`;

  // Ensure parent directory exists
  const fs = require('node:fs');
  const path = require('node:path');
  fs.mkdirSync(outputDir, { recursive: true });

  // Write the entry
  fs.writeFileSync(outputPath, ENTRY_TEXT, 'utf8');
}

main();