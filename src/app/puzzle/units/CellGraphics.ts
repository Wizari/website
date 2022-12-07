import * as PIXI from 'pixi.js';


export class CellGraphics extends PIXI.Graphics {

  private _value: number = 2;
  positionX: number | null = null;
  positionY: number | null = null;
  private xMy: number = 114.5
  private yMy: number = 34
  private widthMy: number = 92.8
  private heightMy: number = 93.3
  private playText!: PIXI.Text
  private _destroyThis: boolean = false

  private _moveX: number = 0
  private _moveY: number = 0

  constructor(x: number, y: number) {
    super();
    const style = new PIXI.TextStyle({
      fontSize: 36,
    });

    this.playText = new PIXI.Text('2', style);
    this.playText.x = 46
    this.playText.y = 46
    this.playText.anchor.set(0.5);
    this.beginFill(0xeee4da);
    // this.drawRect(this.xMy, this.yMy, this.widthMy, this.heightMy);
    this.drawRect(0, 0, this.widthMy, this.heightMy);
    this.endFill();
    this.addChild(this.playText)

    // this.position.x = x;
    // this.position.y = y;
    this.x = x;
    this.y = y;
  }

  resetMoveStep() {
    this._moveX = 0
    this._moveY = 0
    this.playText.text = this._value + ""

  }

  getValue(): number {
    return this._value;
  }

  setValue(value: number) {
    this._value = value;
    // this.playText.text = value + ""
  }


  getMoveX(): number {
    return this._moveX;
  }

  setMoveX(value: number) {
    this._moveX = value;
  }

  getMoveY(): number {
    return this._moveY;
  }

  setMoveY(value: number) {
    this._moveY = value;
  }

  getDestroyThis(): boolean {
    return this._destroyThis;
  }

  setDestroyThis(value: boolean) {
    this._destroyThis = value;
  }
}
