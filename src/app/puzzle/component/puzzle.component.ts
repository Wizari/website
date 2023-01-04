import * as PIXI from 'pixi.js';
import {Component, ElementRef, HostListener, Injectable, Input, NgZone, OnInit} from '@angular/core';
import {Logic} from "../logic/Logic";

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})

// @Injectable()
export class PuzzleComponent implements OnInit {
  public _app!: PIXI.Application
  private logic!: Logic;


  // @Input()
  // public devicePixelRatio = window.devicePixelRatio || 1;


  get app(): PIXI.Application<PIXI.ICanvas> {
    return this._app;
  }

  set app(value: PIXI.Application<PIXI.ICanvas>) {
    this._app = value;
  }

  constructor(
    private ngZone: NgZone,
    private elementRef: ElementRef
  ) {
  }

  async init() {
    PIXI.utils.clearTextureCache()
    this.ngZone.runOutsideAngular(() => {
      this._app = new PIXI.Application({
        view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        backgroundColor: 0xfaf8ef,
        width: 640,
        height: 480
      })
    });
    this.elementRef.nativeElement.appendChild(this.app.view);
    this.logic = new Logic(this);
    await this.newField()
    this.logic.createStartElements()
  }

  ngOnInit(): void {
    this.init();
  }

  destroy() {
    this._app.destroy();
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
    field.x = this._app.screen.width / 2;
    field.y = this._app.screen.height / 2;
    field.scale.set(0.5, 0.5)
    this._app.stage.addChild(field);
  }

}
