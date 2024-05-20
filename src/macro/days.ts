import { DateTime } from "luxon";
import { CalendarLevel } from "../types";

export const days: CalendarLevel = {
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
  isTick: false,
  convertToMinutes: () => 24 * 60,
  levelAverageMinutes: 24 * 60,
  getIdFromDate: (date) => date.toFormat("yyyy-MM-dd"),
  parent: "weeks",
};
