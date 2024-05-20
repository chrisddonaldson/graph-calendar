import { MicroCalendarLevel } from "../types";

const config: MicroCalendarLevel = {
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
  convertToMinutes: () => 3 * 60,
  levelAverageMinutes: 3 * 60,
  getIdFromDate: (date) => `qhd-${date.toFormat("yyyy-MM-dd-HH-mm")}`,
};

export default config;
