import { DateTime, Interval } from "luxon";
import { MacroCalendarLevel } from "../types";
import { CALENDAR_DATUM, TODAY } from "../constants";
import macroConfig from "./configs/macro";
import calculateSiblings from "./calculate-sibling-nodes";
import calculateChildren from "./calculate-child-nodes";
import calculateParents from "./calculate-parent-nodes";

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
    depth: number = 0,
    xIndex: number = 0
  ) {
    this.id = level.getIdFromDate(date);
    this.date = level.transformToType(date);
    this.level = level;
    this.x = this.getXPositionInMinuets();
    this.w = this.getDateWidthInMinuets();
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

  private getXPositionInMinuets() {
    const interval =
      CALENDAR_DATUM < this.date
        ? Interval.fromDateTimes(CALENDAR_DATUM, this.date)
        : Interval.fromDateTimes(this.date, CALENDAR_DATUM);
    const lengthInMins =
      CALENDAR_DATUM < this.date
        ? interval.toDuration("minutes").minutes
        : -interval.toDuration("minutes").minutes;

    return lengthInMins;
  }

  private getDateWidthInMinuets() {
    return this.level.convertToMinutes(this.date);
  }

  public isToday() {
    const trans = this.level.transformToType(TODAY).toISO();
    const current = this.date.toISO();
    return trans === current;
  }

  public calculateDirectSiblings() {
    const output = calculateSiblings(this, 1);
    const left = output[0];
    const right = output[2];
    return { left, right };
  }

  public calculateSiblings(maxResults: number) {
    return calculateSiblings(this, maxResults);
  }

  public calculateChildren() {
    return calculateChildren(this);
  }

  public calculateParents() {
    return calculateParents(this);
  }
}
