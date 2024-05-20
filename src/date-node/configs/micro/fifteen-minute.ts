import { MicroCalendarLevel } from "../../../types";

const config: MicroCalendarLevel = {
  name: "fifteen-minutes",
  durationKey: "minutes",
  convertToDays: () => (1 / 24 / 60) * 15,
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
