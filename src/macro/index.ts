import { MacroCalendarLevel, MacroLevelType } from "../types";
import { days } from "./days";
import { decades } from "./decades";
import { months } from "./months";
import { quarters } from "./quater";
import { weeks } from "./weeks";
import { years } from "./years";

const macroConfig: { [key in MacroLevelType]: MacroCalendarLevel } = {
  decades,
  years,
  quarters,
  months,
  weeks,
  days,
};

export default macroConfig;
