import calculateChildNodes from "./calculate-child-nodes";
import calculateParentNodes from "./calculate-parent-nodes";
import { DateNode } from "./DateNode";
import { MacroCalendarLevel } from "./types";

export default function calculateTree(
  siblings: DateNode[],
  referenceLevel: MacroCalendarLevel
) {
  let parentHeight = 0;
  let children: DateNode[] = [];
  let parents: DateNode[] = [];
  siblings.map((node) => {
    children = [...children, ...calculateChildNodes(node)];
    const parentsRes = calculateParentNodes(node, referenceLevel);
    parents = [...parents, ...parentsRes];
    parentHeight = Math.max(parentHeight, parentsRes.length);
  });

  // Map nodes to delete duplicates
  const parentMap = new Map<string, DateNode>();
  const childMap = new Map<string, DateNode>();

  parents.forEach((item) => {
    parentMap.set(item.getId, item);
  });

  children.forEach((item) => {
    childMap.set(item.getId, item);
  });

  const parentRes: DateNode[] = [];
  const childRes: DateNode[] = [];

  Object.keys(parentMap).map((key) =>
    parentRes.push(parentMap.get(key) as DateNode)
  );

  Object.keys(childMap).map((key) =>
    childRes.push(childMap.get(key) as DateNode)
  );

  return { parentHeight, parents, children };
}
