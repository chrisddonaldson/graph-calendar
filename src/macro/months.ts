import { MacroCalendarLevel } from "../types";

export const months: MacroCalendarLevel = {
  name: "months",
  durationKey: "months",
  convertToDays: (date) => date.daysInMonth ?? 31,
  factor: 1,
  transformToType: (date) =>
    date.set({
      millisecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
      day: 1,
    }),

  convertToMinutes: (date) => (date.daysInMonth ?? 1) * 24 * 60,
  levelAverageMinutes: 28 * 24 * 60,
  getIdFromDate: (date) => date.toFormat("yyyy-MM"),
  child: "weeks",
  parent: "quarters",
};
