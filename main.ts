import { readInput } from "./input.ts";
import { simulateWorld } from "./simulate.ts";

async function run() {
  const worldInput = await readInput();
  const worldOutput = simulateWorld(worldInput);

  console.log({ worldOutput });
}

run();
