import { DateTime } from "luxon";
import {
  CALENDAR_FPS,
  CALENDAR_FRICTION,
  CARD_WIDTH,
  TODAY,
} from "./constants";
import {
  GraphCalendarRenderCallbackFunction,
  MacroCalendarLevel,
} from "./types";
import calculateSiblingNodes from "./calculate-sibling-nodes";
import Hammer from "hammerjs";
import { DateNode } from "./DateNode";
import calculateTree from "./calculate-tree";

export class GraphCalendar {
  private baseNode: DateNode;
  private mc: HammerManager | undefined = undefined;
  private x = 0;
  private xVelocity = 0;
  private xMemo = 0;
  private cachedVirtualBase?: DateNode;
  private cachedSiblings: DateNode[] = [];
  private cachedParents: DateNode[] = [];
  private cachedChildren: DateNode[] = [];
  private cachedParentHeight: number = 0;

  private tick = DateTime.now();

  constructor(
    private calendarWidth: number,
    private moveCallBack: GraphCalendarRenderCallbackFunction,
    baseNode = DateNode.getStartNode()
  ) {
    this.baseNode = baseNode;

    setInterval(() => {
      if (Math.abs(this.xVelocity) > 0.01) {
        this.xMemo = this.xMemo + this.xVelocity;
        this.xVelocity = this.xVelocity * CALENDAR_FRICTION;
        this.requestUpdate();
      }
    }, 1000 / CALENDAR_FPS);

    setInterval(() => {
      this.tick = DateTime.now();
    }, 1000);

    this.requestUpdate();
    this.jumpToNode(baseNode);
  }
  public getTick() {
    return this.tick;
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
    const { parentHeight, parents, children } = calculateTree(
      this.cachedSiblings,
      newVirtualBase.getLevel
    );
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

  public resetBaseNodeToOrigin() {
    this.baseNode = DateNode.getStartNode();
    this.jumpToNode(DateNode.getStartNode());
  }

  public getCalendarPosition() {
    return this.x + this.xMemo;
  }

  public jumpToNode(dateNode: DateNode) {
    const lengthOfMin = CARD_WIDTH / this.baseNode.getLevel.levelAverageMinutes;
    this.xMemo = dateNode.getDims.x * lengthOfMin - CARD_WIDTH / 2;
    this.requestUpdate();
  }

  public registerHammerInteractions() {
    const calendarElement = document.getElementById("calendar-window");
    if (calendarElement) {
      calendarElement.addEventListener(
        "mousewheel",
        (e: any) => {
          e.preventDefault();
          this.xVelocity = e.deltaY + e.deltaX;
        },
        false
      );

      this.mc = new Hammer(calendarElement);
      this.mc.add(
        new Hammer.Pan({
          direction: Hammer.DIRECTION_HORIZONTAL,
          threshold: 10,
        })
      );
      this.mc.add(new Hammer.Pinch({}));
      this.mc.on("pan", (e) => {
        this.x = e.deltaX;
        const pow = Math.abs(Math.pow(e.velocityX, 3));
        this.xVelocity = e.velocityX < 0 ? -pow : pow;
        this.requestUpdate();
      });

      this.mc.on("panend", (e) => {
        this.xMemo = this.xMemo + this.x;
        this.x = 0;
        this.requestUpdate();
      });
    }
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
