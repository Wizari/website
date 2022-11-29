import {Injectable, Input, Output} from "@angular/core";
import * as PIXI from "pixi.js";
import {Cells} from "./Cells";
import {PuzzleComponent} from "../component/puzzle.component";


export class Cell {
  value: number | null = null;
  positionX: number | null = null;
  positionY: number | null = null;
  private x: number = 114.5
  private y: number = 34
  private width: number = 92.8
  private height: number = 93.3
  // public graphics

  constructor() {
this.createCell()

  }

  async createCell() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xeee4da);
    graphics.drawRect(this.x, this.y, this.width, this.height);
    graphics.endFill();
    // await this.app.stage.addChild(graphics)
    // await this.puzzleComponent.app.stage.addChild(graphics)
  }

}
// import {Injectable} from "@angular/core";
//
// @Injectable()
// export declare class Cell {
//   // id: number;
//   value: number;
//   positionX: number;
//   positionY: number;
//
// }
