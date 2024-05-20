import { CalendarLevel } from "../types";

const config: CalendarLevel = {
  name: "half-days",
  durationKey: "hours",
  convertToDays: () => 1 / 2,
  factor: 12,
  transformToType: (date) =>
    date.set({
      millisecond: 0,
      second: 0,
      minute: 0,
    }),
  isTick: true,
  convertToMinutes: () => 12 * 60,
  levelAverageMinutes: 12 * 60,
  getIdFromDate: (date) => `hd-${date.toFormat("yyyy-MM-dd-HH-mm")}`,
};

export default config;
