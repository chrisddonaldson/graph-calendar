import { CalendarLevel } from "../types";

const config: CalendarLevel = {
  name: "minutes",
  durationKey: "minutes",
  convertToDays: () => 1 / 24 / 60,
  factor: 1,
  transformToType: (date) =>
    date.set({
      millisecond: 0,
      second: 0,
    }),
  isTick: true,
  convertToMinutes: () => 5,
  levelAverageMinutes: 5,
  getIdFromDate: (date) => `m-${date.toFormat("yyyy-MM-dd-HH-mm")}`,
};

export default config;
