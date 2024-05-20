import { CalendarLevel, MicroLevelType } from "../types";
import { default as fifteenMinutes } from "./fifteen-minute";
import { default as fiveMinutes } from "./five-minute";
import { default as halfDays } from "./half-day";
import { default as hours } from "./hour";
import { default as minutes } from "./minute";
import { default as quarterHalfDays } from "./quarter-half-day";

export const microConfig: { [key in MicroLevelType]: CalendarLevel } = {
  "half-days": halfDays,
  "quarter-half-days": quarterHalfDays,
  hours: hours,
  "fifteen-minutes": fifteenMinutes,
  "five-minutes": fiveMinutes,
  minutes: minutes,
};

export default microConfig;
