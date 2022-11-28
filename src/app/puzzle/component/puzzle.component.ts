import * as PIXI from 'pixi.js';
import {Component, ElementRef, HostListener, Input, NgZone, OnInit} from '@angular/core';
import {Logic} from "../logic/Logic";


@Component({
  selector: 'app-puzzle',
  template: '',
  // template: '<div (keyup.arrowup)="Move(\'UP\')"></div>',
  // templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})


export class PuzzleComponent implements OnInit {
  public app!: PIXI.Application
  private x: number = 114.5
  private y: number = 34
  private width: number = 92.8
  private height: number = 93.3

  @Input()
  public devicePixelRatio = window.devicePixelRatio || 1;

  constructor(private logic: Logic,
              private elementRef: ElementRef,
              private ngZone: NgZone) {

  }

  async init() {
    this.ngZone.runOutsideAngular(() => {
      this.app = new PIXI.Application({
        view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        backgroundColor: 0xfaf8ef,
        width: 640,
        height: 480
      })
    });
    this.elementRef.nativeElement.appendChild(this.app!.view);

    await this.newField()


    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xeee4da);
    graphics.drawRect(this.x, this.y, this.width, this.height);
    graphics.endFill();
    await this.app.stage.addChild(graphics)

    this.logic.init()
  }

  ngOnInit(): void {
    this.init();
  }

  destroy() {
    this.app.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  @HostListener('window:keydown.arrowup', [])
  onArrowUp() {
    this.logic.moveUp()
  }

  @HostListener('window:keydown.arrowdown', [])
  onArrowDown() {
    this.logic.moveDown()
  }

  @HostListener('window:keydown.arrowleft', [])
  onArrowLeft() {
    this.logic.moveLeft()
  }

  @HostListener('window:keydown.arrowright', [])
  onArrowRight() {
    this.logic.moveRight()
  }

  async newField() {
    const texture = await PIXI.Assets.load('assets/images/field.png');
    const field = PIXI.Sprite.from(texture);
    field.anchor.set(0.5);
    field.x = this.app.screen.width / 2;
    field.y = this.app.screen.height / 2;
    field.scale.set(0.5, 0.5)
    this.app.stage.addChild(field);
  }


}
