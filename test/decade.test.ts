console.log("run test");

import { DateTime } from "luxon";
import { macroConfig } from "../src/date-node/configs";
import { DateNode } from "../src";

const timestamp1 = "2024-05-21T15:16:13+0000";
test("decade siblings should be correct", () => {
  const date = DateTime.fromISO(timestamp1);
  const node = new DateNode(date, macroConfig.decades);

  const siblings = node.calculateDirectSiblings();
  expect(siblings.left.getDate.year).toBe(2010);
  expect(siblings.right.getDate.year).toBe(2030);
});
