import { DateTime } from "luxon";
import { macroConfig } from ".";

export const DEPTH = 2;
export const CARD_WIDTH = 320;
export const CALENDAR_FRICTION = 0.85;
export const CALENDAR_FPS = 60;
export const PARENT_HEIGHT = 48;

export const CALENDAR_DATUM = macroConfig.days.transformToType(
  DateTime.fromISO("2000-01-01T00:00:00+0000").setZone("utc")
);

export const TODAY = macroConfig.days.transformToType(
  DateTime.now().setZone("utc")
);
