import { MacroCalendarLevel } from "../../../types";

export const years: MacroCalendarLevel = {
  name: "years",
  durationKey: "years",
  factor: 1,
  convertToDays: (date) => date.daysInYear,
  transformToType: (date) =>
    date.set({
      millisecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
      month: 1,
      day: 1,
    }),

  convertToMinutes: (date) => date.daysInYear * 24 * 60,
  levelAverageMinutes: 365 * 24 * 60,
  getIdFromDate: (date) => date.toFormat("yyyy"),
  child: "quarters",
  parent: "decades",
};
