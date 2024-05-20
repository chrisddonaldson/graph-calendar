import { DateTime } from "luxon";
import { CARD_WIDTH, TODAY } from "../constants";
import {
  GraphCalendarRenderCallbackFunction,
  MacroCalendarLevel,
} from "../types";
import calculateSiblingNodes from "../date-node/calculate-sibling-nodes";
import { DateNode } from "../date-node/DateNode";
import calculateUpperTree from "./calculate-upper-tree";
import calculateLowerTree from "./calculate-lower-tree";

// Holds all data for the graph-calendar
// Should be driven by an index value?
// Should hold sibling, parents and child array
export class GraphCalendar {
  private baseNode: DateNode;
  private cachedVirtualBase?: DateNode;
  private cachedSiblings: DateNode[] = [];
  private cachedParents: DateNode[] = [];
  private cachedChildren: DateNode[] = [];
  private cachedParentHeight: number = 0;

  constructor(
    private calendarWidth: number,
    private moveCallBack: GraphCalendarRenderCallbackFunction,
    baseNode = DateNode.getStartNode()
  ) {
    this.baseNode = baseNode;
    this.requestUpdate();
  }

  public getBaseNode() {
    return this.baseNode;
  }

  public getVirtualSiblings() {
    const mins =
      (-this.xMemo / CARD_WIDTH) * this.baseNode.getLevel.levelAverageMinutes; //currently in pixels, need it in mins

    const currentDate = TODAY.plus({ minutes: mins });
    const newVirtualBase = new DateNode(currentDate, this.baseNode.getLevel);
    if (newVirtualBase.getId === this.cachedVirtualBase?.getId) {
      return {
        siblings: this.cachedSiblings,
        parents: this.cachedParents,
        children: this.cachedChildren,
        parentHeight: this.cachedParentHeight,
      };
    }
    this.cachedVirtualBase = newVirtualBase;
    this.cachedSiblings = calculateSiblingNodes(
      newVirtualBase,
      +(this.calendarWidth / CARD_WIDTH).toFixed(0) + 1
    );
    const { parentHeight, parents } = calculateUpperTree(
      this.cachedSiblings,
      newVirtualBase.getLevel
    );

    const { children } = calculateLowerTree(this.cachedSiblings);
    this.cachedParentHeight = parentHeight;
    this.cachedChildren = children;
    this.cachedParents = parents;
    return {
      siblings: this.cachedSiblings,
      parents: this.cachedParents,
      children: this.cachedChildren,
      parentHeight: this.cachedParentHeight,
    };
  }

  public setBaseNodeFromDateAndLevel(
    date: DateTime,
    level: MacroCalendarLevel
  ) {
    const flatDate = level.transformToType(date);
    const newBaseNode = new DateNode(flatDate, level);
    this.baseNode = newBaseNode;
    this.requestUpdate();
  }

  public setBaseNodeFromNode(dateNode: DateNode) {
    this.baseNode = dateNode;
    this.xMemo = 0;
    this.requestUpdate();
  }

  public setBaseNodeFromNodeWithJump(dateNode: DateNode) {
    this.baseNode = dateNode;
    this.jumpToNode(dateNode);
  }

  private requestUpdate() {
    const { siblings, parents, children, parentHeight } =
      this.getVirtualSiblings();

    this.moveCallBack({
      calendarX: this.x + this.xMemo,
      parentHeight: parentHeight,
      siblingNodes: siblings,
      parentNodes: parents,
      childNodes: children,
      baseNode: this.baseNode,
    });
  }
}
