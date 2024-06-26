import { DateNode } from "./DateNode";
import macroConfig from "./configs/macro";

// Takes and array of siblings, calculates their parents and pushes them to a map to remove duplicates
export default function calculateParentNode(root: DateNode): DateNode[] {
  if (!root.getLevel.parent) {
    console.warn(`No parent node label for ${root.getLevel.name}`);
    return [];
  }
  const parentLevel = macroConfig[root.getLevel.parent];

  if (!parentLevel) {
    return [];
  }

  const res: DateNode[] = [];

  const startNode = new DateNode(root.getDate, parentLevel);
  let depth = 0;
  const recursion = (node: DateNode) => {
    res.push(node);
    depth = depth - 1;

    if (!node.getLevel.parent) {
      return;
    }

    const parentLevelInterior = macroConfig[node.getLevel.parent];
    recursion(new DateNode(root.getDate, parentLevelInterior, depth));
  };

  recursion(startNode);

  return res;
}
