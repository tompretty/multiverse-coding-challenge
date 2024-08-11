import { Direction, Move, RobotInput, Size, WorldInput } from "./world.ts";

export async function readInput(inputFilePath: string): Promise<WorldInput> {
  const lines = await readFileContents(inputFilePath);
  const size = parseSizeLine(lines[0]);
  const robots = parseRobotLines(lines.slice(1));

  return { size, robots };
}

// ---- Helpers ---- //

async function readFileContents(inputFilePath: string): Promise<string[]> {
  const contents = await Deno.readTextFile(inputFilePath);
  const lines = contents.split("\n");

  return lines;
}

export function parseSizeLine(line: string): Size {
  const [width, height] = line.split(" ").map((n) => parseInt(n));

  return { width, height };
}

export function parseRobotLines(lines: string[]): RobotInput[] {
  const robots = lines.map((l) => parseRobotLine(l));

  return robots;
}

export function parseRobotLine(line: string): RobotInput {
  const match = ROBOT_LINE_REGEX.exec(line);

  if (!match) {
    throw Error(`Invalid robot line: ${line}`);
  }

  const x = parseInt(match[1]);
  const y = parseInt(match[2]);
  const direction = match[3] as Direction;
  const moves = match[4].split("") as Move[];

  return { moves, position: { x, y, direction } };
}

// ---- Constants ---- //

const ROBOT_LINE_REGEX = /^\((\d+), (\d+), ([NESW])\) ([FLR]+)$/;
