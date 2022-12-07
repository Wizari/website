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

  private _moveX: number = 0
  private _moveY: number = 0

  constructor(x: number, y: number) {
    super();
    const style = new PIXI.TextStyle({
      // fontFamily: 'Arial',
      fontSize: 36,
      // fontStyle: 'italic',
      // fontWeight: 'bold',
      // fill: ['#ffffff', '#00ff99'], // gradient
      // stroke: '#4a1850',
      // strokeThickness: 5,
      // dropShadow: true,
      // dropShadowColor: '#000000',
      // dropShadowBlur: 4,
      // dropShadowAngle: Math.PI / 6,
      // dropShadowDistance: 6,
      // wordWrap: true,
      // wordWrapWidth: 440,
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

    this.position.x = x;
    this.position.y = y;
  }


  getValue(): number {
    return this._value;
  }

  setValue(value: number) {
    this._value = value;
    this.playText.text = value + ""
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
}
