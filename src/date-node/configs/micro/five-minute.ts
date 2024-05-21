import { MicroCalendarLevel } from "../../../types";

const config: MicroCalendarLevel = {
  name: "five-minutes",
  durationKey: "minutes",
  factor: 5,
  transformToType: (date) =>
    date.set({
      millisecond: 0,
      second: 0,
    }),
  convertToMinutes: () => 5,
  levelAverageMinutes: 5,
  getIdFromDate: (date) => `fm-${date.toFormat("yyyy-MM-dd-HH-mm")}`,
};

export default config;
