import { DateTime } from "luxon";
import { MacroCalendarLevel } from "../../../types";

export const decades: MacroCalendarLevel = {
  name: "decades",
  durationKey: "years",
  convertToDays: (date) => {
    let res = 0;
    for (let index = 0; index < 10; index++) {
      const element = date.plus({ years: index });
      res = res + element.daysInYear;
    }
    return res;
  },
  factor: 10,
  transformToType: (date: DateTime) => {
    const y = Math.ceil(date.year / 10) * 10 - 10;
    return date.set({
      millisecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
      month: 1,
      day: 1,
      year: y,
    });
  },

  convertToMinutes: () => 10 * 365 * 24 * 60,
  levelAverageMinutes: 10 * 365 * 24 * 60,
  getIdFromDate: (date) => date.toFormat("yyyy"),
  child: "years",
};
