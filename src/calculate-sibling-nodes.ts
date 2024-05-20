import { DateNode } from "./DateNode";

export default function calculateSiblingNodes(baseNode: DateNode, length = 1) {
  const res = [];
  const level = baseNode.getLevel;

  for (let i = -length; i <= length; i++) {
    const date = baseNode.getDate.plus({
      [level?.durationKey ?? ""]: (level?.factor ?? 0) * i,
    });
    const node = new DateNode(date, level);

    res.push(node);
  }

  return res;
}
