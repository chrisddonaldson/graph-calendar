console.log("run test");

import { DateTime } from "luxon";
import { macroConfig } from "../src/date-node/configs";

const timestamp1 = "2024-05-21T15:16:13+0000";
test("week should convert properly", () => {
  const date = DateTime.fromISO(timestamp1);
  const convertedDate = macroConfig.weeks.transformToType(date);
  expect(convertedDate.hour).toBe(0);
  expect(convertedDate.minute).toBe(0);
  expect(convertedDate.millisecond).toBe(0);
  expect(convertedDate.second).toBe(0);
});
