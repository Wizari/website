import * as PIXI from 'pixi.js';
import {Component, ElementRef, HostListener, NgZone, OnInit} from '@angular/core';
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
  defaultTouch = {x: 0, y: 0, time: 0};

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

  @HostListener('touchstart', ['$event'])
  //@HostListener('touchmove', ['$event'])
  @HostListener('touchend', ['$event'])
  @HostListener('touchcancel', ['$event'])
  // @ts-ignore
  handleTouch(event) {
    let touch = event.touches[0] || event.changedTouches[0];

    // check the events
    if (event.type === 'touchstart') {
      this.defaultTouch.x = touch.pageX;
      this.defaultTouch.y = touch.pageY;
      this.defaultTouch.time = event.timeStamp;
    } else if (event.type === 'touchend') {
      let deltaX = touch.pageX - this.defaultTouch.x;
      let deltaY = touch.pageY - this.defaultTouch.y;
      let deltaTime = event.timeStamp - this.defaultTouch.time;

      // simulte a swipe -> less than 500 ms and more than 60 px
      if (deltaTime < 500) {
        // touch movement lasted less than 500 ms
        if (Math.abs(deltaX) > 60) {
          // delta x is at least 60 pixels
          if (deltaX > 0) {
            this.doSwipeRight(event);
          } else {
            this.doSwipeLeft(event);
          }
        }

        if (Math.abs(deltaY) > 60) {
          // delta y is at least 60 pixels
          if (deltaY > 0) {
            this.doSwipeDown(event);
          } else {
            this.doSwipeUp(event);
          }
        }
      }
    }
  }

  // @ts-ignore
  doSwipeLeft(event) {
    this.logic.moveLeft()
  }

  // @ts-ignore
  doSwipeRight(event) {
    this.logic.moveRight()
  }

  // @ts-ignore
  doSwipeUp(event) {
    this.logic.moveUp()
  }

  // @ts-ignore
  doSwipeDown(event) {
    this.logic.moveDown()
  }

}
