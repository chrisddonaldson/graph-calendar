import { MacroCalendarLevel } from "../../../types";

export const weeks: MacroCalendarLevel = {
  name: "weeks",
  durationKey: "weeks",
  factor: 1,
  transformToType: (date) => {
    let offset = date.weekday - 1;

    let res = date.minus({ days: offset });

    if (res.weekday !== 1) {
      throw new Error("Week can't start without a monday!");
    }
    res = res.set({
      millisecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
    });

    return res;
  },

  convertToMinutes: () => 7 * 24 * 60,
  levelAverageMinutes: 7 * 24 * 60,
  getIdFromDate: (date) => date.toFormat("yyyy-WW"),
  child: "days",
  parent: "months",
};
