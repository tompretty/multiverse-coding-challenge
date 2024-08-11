import { readInput } from "./input.ts";
import { printSummary } from "./output.ts";
import { simulateWorld } from "./simulate.ts";

async function run() {
  const worldInput = await readInput();
  const worldOutput = simulateWorld(worldInput);
  printSummary(worldOutput);
}

run();
