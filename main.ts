import { readInput } from "./input.ts";
import { printSummary } from "./output.ts";
import { simulateWorld } from "./simulate.ts";

// ---- Constants ---- //

const INPUT_FILE_PATH = "./problem.txt";

// ---- Run ---- //

async function run() {
  const worldInput = await readInput(INPUT_FILE_PATH);
  const worldOutput = simulateWorld(worldInput);
  printSummary(worldOutput);
}

run();
