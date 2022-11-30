import * as PIXI from 'pixi.js';


export class CellGraphics extends PIXI.Graphics {

  value: number | null = 2;
  positionX: number | null = null;
  positionY: number | null = null;
  private xMy: number = 114.5
  private yMy: number = 34
  private widthMy: number = 92.8
  private heightMy: number = 93.3
  private playText!: PIXI.Text

  constructor(x: number, y: number) {
    super();
    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440,
    });

    this.playText = new PIXI.Text('22', style);

    this.beginFill(0xeee4da);
    // this.drawRect(this.xMy, this.yMy, this.widthMy, this.heightMy);
    this.drawRect(0, 0, this.widthMy, this.heightMy);
    this.endFill();
    this.addChild(this.playText)

    this.position.x = x;
    this.position.y = y;
  }

}
