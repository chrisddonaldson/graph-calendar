import { MicroCalendarLevel } from "../../../types";

const config: MicroCalendarLevel = {
  name: "half-days",
  durationKey: "hours",
  factor: 12,
  transformToType: (date) =>
    date.set({
      millisecond: 0,
      second: 0,
      minute: 0,
    }),
  convertToMinutes: () => 12 * 60,
  levelAverageMinutes: 12 * 60,
  getIdFromDate: (date) => `hd-${date.toFormat("yyyy-MM-dd-HH-mm")}`,
};

export default config;
