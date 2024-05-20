import { CalendarLevel } from "../types";

const config: CalendarLevel = {
  name: "five-minutes",
  durationKey: "minutes",
  convertToDays: () => (1 / 24 / 60) * 5,
  factor: 5,
  transformToType: (date) =>
    date.set({
      millisecond: 0,
      second: 0,
    }),
  isTick: true,
  convertToMinutes: () => 5,
  levelAverageMinutes: 5,
  getIdFromDate: (date) => `fm-${date.toFormat("yyyy-MM-dd-HH-mm")}`,
};

export default config;
