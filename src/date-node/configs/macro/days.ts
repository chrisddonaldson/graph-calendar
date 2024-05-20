import { DateTime } from "luxon";
import { MacroCalendarLevel } from "../../../types";

export const days: MacroCalendarLevel = {
  name: "days",
  durationKey: "days",
  factor: 1,
  transformToType: (date: DateTime) =>
    date.set({
      millisecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
    }),
  convertToDays: () => 1,

  convertToMinutes: () => 24 * 60,
  levelAverageMinutes: 24 * 60,
  getIdFromDate: (date) => date.toFormat("yyyy-MM-dd"),
  parent: "weeks",
};
