import { RobotOutput, WorldOutput } from "./world.ts";

export function printSummary(worldOutput: WorldOutput) {
  worldOutput.robots.forEach((r) => printRobotSummary(r));
}

// ---- Helpers ---- //

function printRobotSummary(robot: RobotOutput) {
  let summary = `(${robot.position.x}, ${robot.position.y}, ${robot.position.direction})`;

  if (robot.isLost) {
    summary += " LOST";
  }

  console.log(summary);
}
