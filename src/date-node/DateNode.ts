import { DateTime, Interval } from "luxon";
import { MacroCalendarLevel } from "../types";
import { CARD_WIDTH, TODAY } from "../constants";
import macroConfig from "./configs/macro";
import calculateSiblingNodes from "./calculate-sibling-nodes";
import calculateChildNodes from "./calculate-child-nodes";
import calculateParentNodes from "./calculate-parent-nodes";

// An enhanced date object
// Holds all convenience methods for the journal
export class DateNode {
  public static getStartNode() {
    return new DateNode(TODAY, macroConfig.days);
  }

  private date: DateTime;
  private level: MacroCalendarLevel;
  private depth; //
  private xIndex; //
  private id;
  private x: number; // Position on the calendar
  private w: number; // Width on calendar

  constructor(
    date: DateTime,
    level: MacroCalendarLevel,
    referenceLevel?: MacroCalendarLevel,
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

  public setDepth(depth: number) {
    this.depth = depth;
  }

  private getXPositionInPixels(referenceLevel: MacroCalendarLevel) {
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

  private getDateWidthInPixels(referenceLevel: MacroCalendarLevel) {
    const numberOfMins = this.level.convertToMinutes(this.date);
    const sizeOfMin = CARD_WIDTH / referenceLevel.levelAverageMinutes;
    return +(numberOfMins * sizeOfMin).toFixed();
  }

  public isToday() {
    const trans = this.level.transformToType(TODAY).toISO();
    const current = this.date.toISO();
    return trans === current;
  }

  public getDirectSiblings() {
    const output = calculateSiblingNodes(this, 1);
    const left = output[0];
    const right = output[2];
    return { left, right };
  }

  public calculateChildNodes() {
    return calculateChildNodes(this);
  }

  public calculateParentNodes(referenceLevel: MacroCalendarLevel) {
    return calculateParentNodes(this, referenceLevel);
  }
}
