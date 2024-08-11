import { assertEquals } from "jsr:@std/assert@1";
import { describe, it } from "jsr:@std/testing@0.225.3/bdd";
import { Direction, Position, RobotInput, Size } from "./world.ts";
import {
  moveRobotForward,
  rotateRobotLeft,
  rotateRobotRight,
  simulateRobot,
} from "./simulate.ts";

describe("simulateRobot", () => {
  it("simulates a series of moves for a robot", () => {
    const robot: RobotInput = {
      position: { x: 2, y: 3, direction: "E" },
      moves: ["L", "F", "R", "F", "F"],
    };
    const worldSize: Size = { width: 4, height: 8 };

    const output = simulateRobot(robot, worldSize);

    assertEquals(output, {
      position: { x: 4, y: 4, direction: "E" },
      isLost: false,
    });
  });

  it("marks a robot as lost if it leaves the bounds of the world", () => {
    const robot: RobotInput = {
      position: { x: 0, y: 2, direction: "N" },
      moves: ["F", "F", "L", "F", "R", "F", "F"],
    };
    const worldSize: Size = { width: 4, height: 8 };

    const output = simulateRobot(robot, worldSize);

    assertEquals(output, {
      position: { x: 0, y: 4, direction: "W" },
      isLost: true,
    });
  });
});

describe("moveRobotForward", () => {
  const worldSize: Size = { width: 4, height: 8 };

  it("moves a northward facing robot one space north", () => {
    const position: Position = { x: 0, y: 0, direction: "N" };

    const output = moveRobotForward(position, worldSize);

    assertEquals(output, {
      position: { x: 0, y: 1, direction: "N" },
      isLost: false,
    });
  });

  it("marks a northward facing robot at the top of the world as lost", () => {
    const worldSize: Size = { width: 4, height: 8 };
    const position: Position = { x: 0, y: 8, direction: "N" };

    const output = moveRobotForward(position, worldSize);

    assertEquals(output, {
      position: { x: 0, y: 8, direction: "N" },
      isLost: true,
    });
  });

  it("moves an eastward facing robot one space east", () => {
    const position: Position = { x: 0, y: 0, direction: "E" };

    const output = moveRobotForward(position, worldSize);

    assertEquals(output, {
      position: { x: 1, y: 0, direction: "E" },
      isLost: false,
    });
  });

  it("marks an eastward facing robot at the right of the world as lost", () => {
    const worldSize: Size = { width: 4, height: 8 };
    const position: Position = { x: 4, y: 0, direction: "E" };

    const output = moveRobotForward(position, worldSize);

    assertEquals(output, {
      position: { x: 4, y: 0, direction: "E" },
      isLost: true,
    });
  });

  it("moves a southward facing robot one space south", () => {
    const position: Position = { x: 0, y: 1, direction: "S" };

    const output = moveRobotForward(position, worldSize);

    assertEquals(output, {
      position: { x: 0, y: 0, direction: "S" },
      isLost: false,
    });
  });

  it("marks a southward facing robot at the bottom of the world as lost", () => {
    const worldSize: Size = { width: 4, height: 8 };
    const position: Position = { x: 0, y: 0, direction: "S" };

    const output = moveRobotForward(position, worldSize);

    assertEquals(output, {
      position: { x: 0, y: 0, direction: "S" },
      isLost: true,
    });
  });

  it("moves a westward facing robot one space west", () => {
    const position: Position = { x: 1, y: 0, direction: "W" };

    const output = moveRobotForward(position, worldSize);

    assertEquals(output, {
      position: { x: 0, y: 0, direction: "W" },
      isLost: false,
    });
  });

  it("marks a wesward facing robot at the left of the world as lost", () => {
    const worldSize: Size = { width: 4, height: 8 };
    const position: Position = { x: 0, y: 0, direction: "W" };

    const output = moveRobotForward(position, worldSize);

    assertEquals(output, {
      position: { x: 0, y: 0, direction: "W" },
      isLost: true,
    });
  });
});

describe("rotateRobotLeft", () => {
  it("rotates the robot left 90 degrees", () => {
    assertEquals(
      rotateRobotLeft(positionWithDirection("N")).position.direction,
      "W"
    );
    assertEquals(
      rotateRobotLeft(positionWithDirection("E")).position.direction,
      "N"
    );
    assertEquals(
      rotateRobotLeft(positionWithDirection("S")).position.direction,
      "E"
    );
    assertEquals(
      rotateRobotLeft(positionWithDirection("W")).position.direction,
      "S"
    );
  });
});

describe("rotateRobotRight", () => {
  it("rotates the robot right 90 degrees", () => {
    assertEquals(
      rotateRobotRight(positionWithDirection("N")).position.direction,
      "E"
    );
    assertEquals(
      rotateRobotRight(positionWithDirection("E")).position.direction,
      "S"
    );
    assertEquals(
      rotateRobotRight(positionWithDirection("S")).position.direction,
      "W"
    );
    assertEquals(
      rotateRobotRight(positionWithDirection("W")).position.direction,
      "N"
    );
  });
});

// ---- Helpers ---- //

function positionWithDirection(direction: Direction): Position {
  return { x: 0, y: 0, direction };
}
