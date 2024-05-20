import { DateNode } from "../date-node/DateNode";

// Takes an array of date nodes, calculates their children and collapses the results into one map incase there is any overlap
export default function calculateLowerTree(siblings: DateNode[]) {
  let parentHeight = 0;
  let children: DateNode[] = [];

  siblings.map((node) => {
    children = [...children, ...node.calculateChildNodes()];
  });

  // Map nodes to delete duplicates
  const childMap = new Map<string, DateNode>();

  children.forEach((item) => {
    childMap.set(item.getId, item);
  });

  const childRes: DateNode[] = [];

  Object.keys(childMap).map((key) =>
    childRes.push(childMap.get(key) as DateNode)
  );

  return { parentHeight, children };
}
