import { Interval } from "luxon";
import { DateNode } from "./DateNode";
import macroConfig from "./configs/macro";

// Given a node, calculate the children to a certain depth based on the configs.
export default function calculateChildNodes(start: DateNode) {
  const startDate = start.getDate;
  const level = start.getLevel;

  if (!start.getLevel.child) {
    return [];
  }
  const childLevel = macroConfig[start.getLevel.child];

  const endDate = startDate.plus({
    [level.durationKey]: level.factor,
  });

  const interval = Interval.fromDateTimes(startDate, endDate);

  const duration =
    interval.toDuration(childLevel.durationKey).toObject()[
      childLevel.durationKey
    ] ?? 1;

  const steps = duration / childLevel.factor;
  const res = [];

  for (let j = 0; j < steps; j++) {
    let nextStep = startDate.plus({
      [childLevel.durationKey]: j * childLevel.factor,
    });

    nextStep = childLevel.transformToType(nextStep);

    const nextNode = new DateNode(nextStep, childLevel);
    res.push(nextNode);
  }

  return res;
}
