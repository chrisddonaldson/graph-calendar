import { DateTime, Interval } from "luxon";
import { CalendarLevel } from "./types";
import { CARD_WIDTH, TODAY } from "./constants";
import macroConfig from "./macro";
import calculateSiblingNodes from "./calculate-sibling-nodes";

export class DateNode {
  public static getStartNode() {
    return new DateNode(TODAY, macroConfig.days);
  }

  private date: DateTime;
  private level: CalendarLevel;
  private depth;
  private xIndex;
  private id;
  private parent?: DateNode;
  private x: number;
  private w: number;

  constructor(
    date: DateTime,
    level: CalendarLevel,
    referenceLevel?: CalendarLevel,
    depth: number = 0,
    xIndex: number = 0
  ) {
    const ref = referenceLevel ? referenceLevel : level;

    this.id = level.getIdFromDate(date);
    this.date = level.transformToType(date);
    this.level = level;
    this.x = this.getXPositionInPixels(ref);
    this.w = this.getDateWidthInPixels(ref);
    this.depth = depth;
    this.xIndex = xIndex;
  }

  private getXPositionInPixels(referenceLevel: CalendarLevel) {
    const interval =
      TODAY < this.date
        ? Interval.fromDateTimes(TODAY, this.date)
        : Interval.fromDateTimes(this.date, TODAY);
    const lengthInMins =
      TODAY < this.date
        ? interval.toDuration("minutes").minutes
        : -interval.toDuration("minutes").minutes;

    const sizeOfMin = CARD_WIDTH / referenceLevel.levelAverageMinutes;
    const normalised = lengthInMins * sizeOfMin;

    return +normalised.toFixed();
  }

  private getDateWidthInPixels(referenceLevel: CalendarLevel) {
    const numberOfMins = this.level.convertToMinutes(this.date);
    const sizeOfMin = CARD_WIDTH / referenceLevel.levelAverageMinutes;
    return +(numberOfMins * sizeOfMin).toFixed();
  }

  public get getId() {
    return this.id;
  }

  public get getDate() {
    return this.date;
  }

  public get getLevel() {
    return this.level;
  }

  public get getDims() {
    return { x: this.x, w: this.w };
  }

  public get getDepth() {
    return this.depth;
  }

  public get getXIndex() {
    return this.xIndex;
  }

  public setParent(parent?: DateNode) {
    this.parent = parent;
  }

  public setDepth(depth: number) {
    this.depth = depth;
  }

  public isToday() {
    const trans = this.level.transformToType(TODAY).toISO();
    const currnet = this.date.toISO();

    if (trans === currnet) {
      return true;
    }
    return false;
  }

  public getDirectSiblings() {
    const output = calculateSiblingNodes(this, 1);
    const left = output[0];
    const right = output[2];
    return { left, right };
  }
}
