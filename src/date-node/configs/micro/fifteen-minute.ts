import { MicroCalendarLevel } from "../../../types";

const config: MicroCalendarLevel = {
  name: "fifteen-minutes",
  durationKey: "minutes",
  factor: 15,
  transformToType: (date) =>
    date.set({
      millisecond: 0,
      second: 0,
    }),
  convertToMinutes: () => 15,
  levelAverageMinutes: 15,
  getIdFromDate: (date) => `ftm-${date.toFormat("yyyy-MM-dd-HH-mm")}`,
};

export default config;
