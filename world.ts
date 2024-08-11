export interface WorldInput {
  size: Size;
  robots: RobotInput[];
}

export interface Size {
  width: number;
  height: number;
}

export interface RobotInput {
  position: Position;
  moves: Move[];
}

export interface WorldOutput {
  robots: RobotOutput[];
}

export interface RobotOutput {
  position: Position;
  isLost: boolean;
}

export interface Position {
  x: number;
  y: number;
  direction: Direction;
}

export type Direction = "N" | "E" | "S" | "W";

export type Move = "F" | "L" | "R";
