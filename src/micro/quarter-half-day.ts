import { CalendarLevel } from "../types";

const config: CalendarLevel = {
  name: "quarter-half-days",
  durationKey: "hours",
  convertToDays: () => 1 / 8,
  factor: 3,
  transformToType: (date) =>
    date.set({
      millisecond: 0,
      second: 0,
      minute: 0,
    }),
  isTick: true,
  convertToMinutes: () => 3 * 60,
  levelAverageMinutes: 3 * 60,
  getIdFromDate: (date) => `qhd-${date.toFormat("yyyy-MM-dd-HH-mm")}`,
};

export default config;
