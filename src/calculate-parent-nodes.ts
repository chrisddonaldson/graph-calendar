import { DateNode } from "./DateNode";
import macroConfig from "./macro";
import { CalendarLevel } from "./types";

export default function calculateParentNode(
  root: DateNode,
  referenceLevel: CalendarLevel
): DateNode[] {
  const parentLevel = macroConfig[root.getLevel.parent ?? ""] as CalendarLevel;

  if (!parentLevel) {
    return [];
  }

  const res: DateNode[] = [];

  const startNode = new DateNode(root.getDate, parentLevel, referenceLevel);
  let depth = 0;
  const recursion = (node: DateNode) => {
    res.push(node);
    depth = depth - 1;
    const parentLevelInterior = macroConfig[
      node.getLevel.parent ?? ""
    ] as CalendarLevel;
    if (parentLevelInterior) {
      recursion(
        new DateNode(root.getDate, parentLevelInterior, referenceLevel, depth)
      );
    } else {
      return;
    }
  };

  recursion(startNode);

  return res;
}
