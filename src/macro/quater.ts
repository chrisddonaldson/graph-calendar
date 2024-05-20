import { MacroCalendarLevel } from "../types";

export const quarters: MacroCalendarLevel = {
  name: "quarters",
  durationKey: "months",
  factor: 3,
  convertToDays: (date) => {
    let res = 0;
    for (let index = 0; index < 3; index++) {
      const element = date.plus({ months: index });
      res = res + (element.daysInMonth ?? 31);
    }
    return res;
  },
  transformToType: (date) => {
    let q = 0;
    const zeroIndexMonth = date.month - 1;

    if (zeroIndexMonth < 3) {
      q = 0;
    } else if (zeroIndexMonth < 6) {
      q = 1;
    } else if (zeroIndexMonth < 9) {
      q = 2;
    } else {
      q = 3;
    }
    return date.set({
      millisecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
      day: 1,
      month: q * 3 + 1,
    });
  },

  convertToMinutes: (date) => {
    const zeroIndexMonth = date.month - 1;
    let x1 = 0;
    let x2 = 0;
    if (zeroIndexMonth < 3) {
      x1 = 0;
      x2 = 3;
    } else if (zeroIndexMonth < 6) {
      x1 = 3;
      x2 = 6;
    } else if (zeroIndexMonth < 9) {
      x1 = 6;
      x2 = 9;
    } else {
      x1 = 9;
      x2 = 12;
    }

    let numberOfDays = 0;

    for (let i = x1; i < x2; i++) {
      numberOfDays = numberOfDays + (date.daysInMonth ?? 1);
      date = date.plus({ month: 1 });
    }
    return numberOfDays * 24 * 60;
  },
  levelAverageMinutes: 91 * 24 * 60,
  getIdFromDate: (date) => date.toFormat("yyyy-qq"),
  child: "months",
  parent: "years",
};
