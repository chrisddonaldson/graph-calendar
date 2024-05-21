import { DateTime } from "luxon";
import { macroConfig } from ".";

export const CALENDAR_DATUM = macroConfig.days.transformToType(
  DateTime.fromISO("2000-01-01T00:00:00+0000").setZone("utc")
);

export const TODAY = macroConfig.days.transformToType(
  DateTime.now().setZone("utc")
);
