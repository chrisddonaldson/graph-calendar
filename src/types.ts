import { DateTime } from "luxon";
import { DateNode } from "./date-node/DateNode";

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

export type MacroCalendarLevel = {
  name: MacroLevelType;
  durationKey: DurationKeys;
  convertToDays: (date: DateTime) => number;
  factor: number;
  transformToType: (date: DateTime) => DateTime;
  convertToMinutes: (date: DateTime) => number;
  levelAverageMinutes: number;
  getIdFromDate: (date: DateTime) => string;
  parent?: MacroLevelType;
  child?: MacroLevelType;
};

export type MicroCalendarLevel = {
  name: MicroLevelType;
  durationKey: DurationKeys;
  convertToDays: (date: DateTime) => number;
  factor: number;
  transformToType: (date: DateTime) => DateTime;
  convertToMinutes: (date: DateTime) => number;
  levelAverageMinutes: number;
  getIdFromDate: (date: DateTime) => string;
  parent?: MicroLevelType;
  child?: MicroLevelType;
};

export type GraphCalendarRenderCallbackFunction = ({
  calendarX,
  parentHeight,
  siblingNodes,
  parentNodes,
  childNodes,
  baseNode,
}: {
  calendarX: number;
  parentHeight: number;
  siblingNodes: DateNode[];
  parentNodes: DateNode[];
  childNodes: DateNode[];
  baseNode: DateNode;
}) => void;
