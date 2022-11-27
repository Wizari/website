// import {Component, OnInit} from '@angular/core';
// // import { Application, Sprite } from 'pixi.js'
import * as PIXI from 'pixi.js';
import { OnInit, Component, ElementRef, Input, HostListener, NgZone, OnDestroy } from '@angular/core';
// import { Application, ApplicationOptions } from 'pixi.js';
// import { Application } from 'pixi.js';

@Component({
  selector: 'app-puzzle',
  template: '',
  // template: '<div (keyup.arrowup)="Move(\'UP\')"></div>',
  // templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})


export class PuzzleComponent implements OnInit {
  public app!: PIXI.Application
  private x: number  = 114.5
  private y: number  = 34
  private width: number  = 92.8
  private height: number  = 93.3

  @Input()
  public devicePixelRatio = window.devicePixelRatio || 1;

  constructor(private elementRef: ElementRef, private ngZone: NgZone) {}

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

    const texture = await PIXI.Assets.load('assets/images/field.png');

    // create a new Sprite from the awaited loaded Texture
    const field = PIXI.Sprite.from(texture);

    // center the sprite's anchor point
    field.anchor.set(0.5);

    // move the sprite to the center of the screen
    field.x = this.app.screen.width / 2;
    field.y = this.app.screen.height / 2;
    field.scale.set(0.5, 0.5)
    this.app.stage.addChild(field);


    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xeee4da);
    graphics.drawRect(this.x, this.y, this.width, this.height);
    graphics.endFill();
    this.app.stage.addChild(graphics)
    // this.resize();
  }

  ngOnInit(): void {
    this.init();
  }

  @HostListener('window:resize')
  public resize() {
    const width = this.elementRef.nativeElement.offsetWidth;
    const height = this.elementRef.nativeElement.offsetHeight;
    const viewportScale = 1 / this.devicePixelRatio;
    this.app.renderer.resize(width * this.devicePixelRatio, height * this.devicePixelRatio);
    // this.app.view.style.transform = `scale(${viewportScale})`;
    // this.app.view.style.transformOrigin = `top left`;
  }

  destroy() {
    this.app.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  @HostListener('window:keydown.arrowup', [])
  onArrowUp() {
    console.log('arrowup')
  }

  @HostListener('window:keydown.arrowdown', [])
  onArrowDown() {
    console.log('arrowdown')
  }

  @HostListener('window:keydown.arrowleft', [])
  onArrowLeft() {
    console.log('arrowleft')
  }

  @HostListener('window:keydown.arrowright', [])
  onArrowRight() {
    console.log('arrowright')
  }


}

