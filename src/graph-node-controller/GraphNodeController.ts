import { CALENDAR_DATUM, MacroCalendarLevel } from "..";
import DateNode from "../date-node";
import calculateLowerTree from "./calculate-lower-tree";
import calculateUpperTree from "./calculate-upper-tree";

export class GraphNodeController {
  private siblings: DateNode[];
  private parents: DateNode[];
  private parentHeight: number;
  private children: DateNode[];
  private virtualBase: DateNode;

  constructor(
    private minuteOffsetFromDatum: number,
    private maxResults: number,
    private level: MacroCalendarLevel
  ) {
    const currentDate = CALENDAR_DATUM.plus({
      minutes: this.minuteOffsetFromDatum,
    });

    const newVirtualBase = new DateNode(currentDate, this.level);
    this.virtualBase = newVirtualBase;

    this.siblings = newVirtualBase.calculateSiblings(this.maxResults);

    const { parentHeight, parents } = calculateUpperTree(this.siblings);

    const { children } = calculateLowerTree(this.siblings);

    this.parentHeight = parentHeight;
    this.children = children;
    this.parents = parents;
  }

  public calculateNodes(
    minuteOffsetFromDatum: number,
    maxResults: number,
    level: MacroCalendarLevel
  ) {
    this.maxResults = maxResults;
    this.level = level;
    const currentDate = CALENDAR_DATUM.plus({
      minutes: minuteOffsetFromDatum,
    });

    const newVirtualBase = new DateNode(currentDate, this.level);

    if (newVirtualBase.getId === this.virtualBase?.getId) {
      return {
        siblings: this.siblings,
        parents: this.parents,
        children: this.children,
        parentHeight: this.parentHeight,
      };
    }

    this.virtualBase = newVirtualBase;

    this.siblings = newVirtualBase.calculateSiblings(this.maxResults);

    const { parentHeight, parents } = calculateUpperTree(this.siblings);

    const { children } = calculateLowerTree(this.siblings);

    this.parentHeight = parentHeight;

    this.children = children;

    this.parents = parents;

    return {
      siblings: this.siblings,
      parents: this.parents,
      children: this.children,
      parentHeight: this.parentHeight,
    };
  }
}
