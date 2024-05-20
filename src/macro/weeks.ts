import { CalendarLevel } from "../types";

export const weeks: CalendarLevel = {
  name: "weeks",
  durationKey: "weeks",
  convertToDays: () => 7,
  factor: 1,
  transformToType: (date) => {
    const newD = date.set({
      millisecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
    });

    const newW = newD.weekday - 1;

    const res = date.minus({ days: newW });

    if (res.weekday !== 1) {
      throw new Error("Week can't start without a monday!");
    }
    return res;
  },
  isTick: false,
  convertToMinutes: () => 7 * 24 * 60,
  levelAverageMinutes: 7 * 24 * 60,
  getIdFromDate: (date) => date.toFormat("yyyy-WW"),
  child: "days",
  parent: "months",
};
