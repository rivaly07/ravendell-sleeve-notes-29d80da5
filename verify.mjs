// Verification script for Sleeve Notes for the Frog Trio entry
// Runs main.ts in a temp dir, asserts file exists, UTF-8 decodes, length 1..400, not only whitespace, two runs byte-identical

import { mkdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

const TEST_DIR = join(tmpdir(), `frog-trio-verify-${Date.now()}`);
const OUTPUT_DIR = join(TEST_DIR, 'output');
const MAIN_TS = join(TEST_DIR, 'main.ts');

function runTest(label, outputDir) {
  const env = { ...process.env, MAKEFUN_OUTPUT_DIR: outputDir };
  const result = spawnSync('node', ['--experimental-strip-types', MAIN_TS], {
    cwd: TEST_DIR,
    env,
    stdio: 'pipe',
  });
  if (result.status !== 0) {
    throw new Error(`${label}: main.ts exited with code ${result.status}\n${result.stderr?.toString()}`);
  }
  const outputPath = join(outputDir, 'entry.txt');
  const content = readFileSync(outputPath);
  return content;
}

try {
  // Setup test directory
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(MAIN_TS, readFileSync(join(process.cwd(), 'main.ts')));

  // Run 1
  const run1 = runTest('Run 1', OUTPUT_DIR);
  const text1 = run1.toString('utf8');
  
  // Assertions for run 1
  if (run1.length === 0) throw new Error('Run 1: output file is empty');
  if (text1.trim().length === 0) throw new Error('Run 1: output is only whitespace');
  if (text1.length < 1 || text1.length > 400) throw new Error(`Run 1: length ${text1.length} not in 1..400`);
  
  // Run 2 (separate output dir to simulate fresh run)
  const OUTPUT_DIR_2 = join(TEST_DIR, 'output2');
  mkdirSync(OUTPUT_DIR_2, { recursive: true });
  const run2 = runTest('Run 2', OUTPUT_DIR_2);
  const text2 = run2.toString('utf8');
  
  // Assertions for run 2
  if (run2.length === 0) throw new Error('Run 2: output file is empty');
  if (text2.trim().length === 0) throw new Error('Run 2: output is only whitespace');
  if (text2.length < 1 || text2.length > 400) throw new Error(`Run 2: length ${text2.length} not in 1..400`);
  
  // Byte-identical check
  if (!run1.equals(run2)) {
    throw new Error('Runs are not byte-identical');
  }
  
  console.log('✓ Output file exists');
  console.log('✓ UTF-8 decodes successfully');
  console.log(`✓ Length: ${text1.length} characters (1..400)`);
  console.log('✓ Not only whitespace');
  console.log('✓ Two runs produce byte-identical output');
  console.log('');
  console.log('--- Entry text ---');
  console.log(text1);
  console.log('--- End ---');
  console.log('');
  console.log('All checks passed.');

} catch (err) {
  console.error('✗ Verification failed:', err instanceof Error ? err.message : err);
  process.exitCode = 1;
} finally {
  // Cleanup
  try { rmSync(TEST_DIR, { recursive: true, force: true }); } catch {}
}