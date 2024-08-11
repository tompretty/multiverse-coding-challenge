export interface WorldState {
  size: Size;
  robots: RobotState[];
}

export interface Size {
  width: number;
  height: number;
}

export interface RobotState {
  position: { x: number; y: number; direction: Direction };
  moves: Move[];
}

export type Direction = "N" | "E" | "S" | "W";

export type Move = "F" | "L" | "R";
