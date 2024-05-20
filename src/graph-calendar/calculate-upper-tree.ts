import { DateNode } from "../date-node/DateNode";
import { MacroCalendarLevel } from "../types";

export default function calculateUpperTree(
  siblings: DateNode[],
  referenceLevel: MacroCalendarLevel
) {
  let parentHeight = 0;
  let parents: DateNode[] = [];

  siblings.map((node) => {
    const parentsRes = node.calculateParentNodes(referenceLevel);
    parents = [...parents, ...parentsRes];
    parentHeight = Math.max(parentHeight, parentsRes.length);
  });

  // Map nodes to delete duplicates
  const parentMap = new Map<string, DateNode>();

  parents.forEach((item) => {
    parentMap.set(item.getId, item);
  });

  const parentRes: DateNode[] = [];
  const childRes: DateNode[] = [];

  Object.keys(parentMap).map((key) =>
    parentRes.push(parentMap.get(key) as DateNode)
  );

  return { parentHeight, parents };
}
