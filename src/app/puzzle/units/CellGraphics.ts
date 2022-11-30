import * as PIXI from 'pixi.js';


export class CellGraphics extends PIXI.Graphics {

  value: number | null = 2;
  positionX: number | null = null;
  positionY: number | null = null;
  private xMy: number = 114.5
  private yMy: number = 34
  private widthMy: number = 92.8
  private heightMy: number = 93.3

  constructor(x: number, y: number) {
    super();

    this.beginFill(0xeee4da);
    // this.drawRect(this.xMy, this.yMy, this.widthMy, this.heightMy);
    this.drawRect(0, 0, this.widthMy, this.heightMy);
    this.endFill();

    this.position.x = x;
    this.position.y = y;
  }

}
