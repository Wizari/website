import {Injectable} from "@angular/core";
import {PuzzleComponent} from "../component/puzzle.component";
import {CellGraphics} from "../units/CellGraphics";
// import * as PIXI from 'pixi.js';
import * as PIXI from "pixi.js";
// import * as TWEEN from '@tweenjs/tween.js'
import { gsap } from "gsap";
// import { PixiPlugin } from "gsap/PixiPlugin";






@Injectable()
export class Logic {
  private cellArr: any [] = []
  private app = this.puzzleComponent._app

  constructor(private puzzleComponent: PuzzleComponent) {

  }

  init() {
    console.log('11')
  }

  createStartElements() {
    let x = 114.5;
    let y = 34;
    let step = 106
    // 220.5, 54

    this.cellArr = [
      null , null , null ,new CellGraphics(x+step*3, y),
      new CellGraphics(x, y+step) ,new CellGraphics(x+step, y+step), null, null,
      null ,new CellGraphics(x+step, y+step*2), null, null,
      null ,null, null, new CellGraphics(x+step*3, y+step*3)
    ]
    for (let i = 0; i < this.cellArr.length; i++) {
      if (this.cellArr[i] != null) {
        this.puzzleComponent._app.stage.addChild(this.cellArr[i])
      }
    }
    // var test = this.cellArr[1] as CellGraphics
    // test.setValue(6)


    // private x: number = 114.5
    // private y: number = 34
    // this.cellArr = [new CellGraphics(114.5, 34), new CellGraphics(200, 200)]
    // this.puzzleComponent._app.stage.addChild(this.cellArr[1])
    // this.puzzleComponent._app.stage.addChild(this.cellArr[2])
    // this.removeCell(1)
    // this.puzzleComponent._app.ticker.
    // this.puzzleComponent._app.stage.addChild(new CellGraphics(100, 200))
    // let test: CellsManager = new CellsManager()
  }

  removeCell(index: number) {
    var element = this.cellArr[index];
    element.parent.removeChild(element);
  }

  move() {

  }

  moveCell() {

  }

  moveUp() {
    gsap.to(this.cellArr[0], {
      x: 200, y:0, duration: 0.51, repeat: 0, yoyo: false,
    });

  }

  moveDown() {
    console.log('moveDown')
    for (let i = 0; i < this.cellArr.length; i++) {
      console.log(i)

    }

  }

  moveLeft() {
    console.log('moveLeft')

  }

  moveRight() {
    console.log('moveRight')

  }

  lose() {

  }
}


// moveUp() {
//   let element = this.cellArr[0];
//   this.app.ticker.add(function(delta) {
//
//     element.position.x += 10 * delta;
//
//   });
//   }


// moveUp() {
//   // init()
//   // animate()
//
//   // function init() {
//   var output = document.createElement('div')
//   output.style.cssText = 'position: absolute; left: 50px; top: 300px; font-size: 100px'
//   document.body.appendChild(output)
//
//   var tween = new TWEEN.Tween({x: 50, y: 0})
//     .to({x: 400}, 2000)
//     .easing(TWEEN.Easing.Elastic.InOut)
//     .onUpdate(function (object) {
//       output.innerHTML = 'x == ' + Math.round(object.x)
//       var transform = 'translateX(' + object.x + 'px)'
//       output.style.webkitTransform = transform
//       output.style.transform = transform
//     })
//     .start()
//
//
//   this.animate(110)
// }
//
// animate(time: number) {
//   // requestAnimationFrame(this.animate)
//   TWEEN.update(time)
// }

