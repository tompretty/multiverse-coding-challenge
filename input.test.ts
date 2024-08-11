import { assertEquals } from "jsr:@std/assert@1";
import { describe, it } from "jsr:@std/testing@0.225.3/bdd";
import { parseRobotLine, parseRobotLines, parseSizeLine } from "./input.ts";

describe("parseSizeLine", () => {
  it("parses a valid size line", () => {
    const line = "4 8";

    const size = parseSizeLine(line);

    assertEquals(size, { width: 4, height: 8 });
  });
});

describe("parseRobotLines", () => {
  it("parses a valid array of robot lines", () => {
    const lines = ["(2, 3, E) LFRFF", "(0, 2, N) FFLFRFF"];

    const robots = parseRobotLines(lines);

    assertEquals(robots, [
      {
        position: { x: 2, y: 3, direction: "E" },
        moves: ["L", "F", "R", "F", "F"],
      },
      {
        position: { x: 0, y: 2, direction: "N" },
        moves: ["F", "F", "L", "F", "R", "F", "F"],
      },
    ]);
  });
});

describe("parseRobotLine", () => {
  it("parses a valid robot line", () => {
    const line = "(2, 3, E) LFRFF";

    const robot = parseRobotLine(line);

    assertEquals(robot, {
      position: { x: 2, y: 3, direction: "E" },
      moves: ["L", "F", "R", "F", "F"],
    });
  });
});
