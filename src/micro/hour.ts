import { CalendarLevel } from "../types";

const config: CalendarLevel = {
  name: "hours",
  durationKey: "hours",
  convertToDays: () => 1 / 24,
  factor: 1,
  transformToType: (date) =>
    date.set({
      millisecond: 0,
      second: 0,
      minute: 0,
    }),
  isTick: true,
  convertToMinutes: () => 60,
  levelAverageMinutes: 60,
  getIdFromDate: (date) => `h-${date.toFormat("yyyy-MM-dd-HH-mm")}`,
};

export default config;