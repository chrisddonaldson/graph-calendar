import macroConfig from "./macro";
import { DateTime } from "luxon";

export const DEPTH = 2;
export const CARD_WIDTH = 320;
export const CALENDAR_FRICTION = 0.85;
export const CALENDAR_FPS = 60;
export const PARENT_HEIGHT = 48;

export const TODAY = macroConfig.days.transformToType(
  DateTime.now().setZone("utc")
);
