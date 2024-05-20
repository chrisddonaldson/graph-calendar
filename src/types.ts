import { DateTime } from "luxon";
import { DateNode } from "./DateNode";

export type DurationKeys =
  | "years"
  | "months"
  | "weeks"
  | "days"
  | "hours"
  | "minutes"
  | "seconds"
  | "milliseconds";

export type MacroLevelType =
  | "days"
  | "weeks"
  | "months"
  | "quarters"
  | "years"
  | "decades";

export type MicroLevelType =
  | "minutes"
  | "five-minutes"
  | "fifteen-minutes"
  | "quarter-half-days"
  | "half-days"
  | "hours";

export type CalendarLevel = {
  name: MacroLevelType | MicroLevelType;
  durationKey: DurationKeys;
  convertToDays: (date: DateTime) => number;
  factor: number;
  transformToType: (date: DateTime) => DateTime;
  isTick: boolean;
  convertToMinutes: (date: DateTime) => number;
  levelAverageMinutes: number;
  getIdFromDate: (date: DateTime) => string;
  parent?: string;
  child?: string;
};

export type TileProps = {
  dateNode: DateNode;
  isSmall: boolean;
};
