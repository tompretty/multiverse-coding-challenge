import { Direction, Move, RobotState, Size, WorldState } from "./world.ts";

export async function readInput(): Promise<WorldState> {
  const lines = await readFileContents();
  const size = parseSizeLine(lines[0]);
  const robots = parseRobotLines(lines.slice(1));

  return { size, robots };
}

// ---- Helpers ---- //

async function readFileContents(): Promise<string[]> {
  const contents = await Deno.readTextFile(INPUT_FILE_PATH);
  const lines = contents.split("\n");

  return lines;
}

export function parseSizeLine(line: string): Size {
  const [width, height] = line.split(" ").map((n) => parseInt(n));

  return { width, height };
}

export function parseRobotLines(lines: string[]): RobotState[] {
  const robots = lines.map((l) => parseRobotLine(l));

  return robots;
}

export function parseRobotLine(line: string): RobotState {
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

const INPUT_FILE_PATH = "./problem.txt";

const ROBOT_LINE_REGEX = /^\((\d+), (\d+), ([NESW])\) ([FLR]+)$/;
