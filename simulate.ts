import {
  Direction,
  Move,
  Position,
  RobotInput,
  RobotOutput,
  Size,
  WorldInput,
  WorldOutput,
} from "./world.ts";

export function simulateWorld(world: WorldInput): WorldOutput {
  const robots = world.robots.map((r) => simulateRobot(r, world.size));

  return { robots };
}

// ---- Helpers ---- //

export function simulateRobot(robot: RobotInput, worldSize: Size): RobotOutput {
  let output: RobotOutput = { position: robot.position, isLost: false };
  for (const move of robot.moves) {
    output = simulateRobotMove(output.position, move, worldSize);

    if (output.isLost) {
      break;
    }
  }

  return output;
}

export function simulateRobotMove(
  position: Position,
  move: Move,
  worldSize: Size
): RobotOutput {
  if (move === "F") {
    return moveRobotForward(position, worldSize);
  } else if (move === "L") {
    return rotateRobotLeft(position);
  } else if (move === "R") {
    return rotateRobotRight(position);
  }

  return { position, isLost: false };
}

export function moveRobotForward(
  position: Position,
  worldSize: Size
): RobotOutput {
  const updatedPosition = { ...position };
  let isLost = false;

  if (position.direction === "N") {
    if (position.y < worldSize.height) {
      updatedPosition.y += 1;
    } else {
      isLost = true;
    }
  } else if (position.direction === "E") {
    if (position.x < worldSize.width) {
      updatedPosition.x += 1;
    } else {
      isLost = true;
    }
  } else if (position.direction === "S") {
    if (position.y > 0) {
      updatedPosition.y -= 1;
    } else {
      isLost = true;
    }
  } else if (position.direction === "W") {
    if (position.x > 0) {
      updatedPosition.x -= 1;
    } else {
      isLost = true;
    }
  }

  return { position: updatedPosition, isLost };
}

export function rotateRobotLeft(position: Position): RobotOutput {
  const rotatedDirection = ROTATE_LEFT_LOOKUP[position.direction];

  return {
    position: { ...position, direction: rotatedDirection },
    isLost: false,
  };
}

export function rotateRobotRight(position: Position): RobotOutput {
  const rotatedDirection = ROTATE_RIGHT_LOOKUP[position.direction];

  return {
    position: { ...position, direction: rotatedDirection },
    isLost: false,
  };
}

// ---- Constants ---- //

const ROTATE_LEFT_LOOKUP: Record<Direction, Direction> = {
  N: "W",
  E: "N",
  S: "E",
  W: "S",
};

const ROTATE_RIGHT_LOOKUP: Record<Direction, Direction> = {
  N: "E",
  E: "S",
  S: "W",
  W: "N",
};
