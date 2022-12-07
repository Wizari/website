import {Injectable} from "@angular/core";
import {PuzzleComponent} from "../component/puzzle.component";
import {CellGraphics} from "../units/CellGraphics";
// import * as PIXI from 'pixi.js';
// import * as TWEEN from '@tweenjs/tween.js'
import { gsap } from "gsap";
// import { gsap } from "gsap";

// import { PixiPlugin } from "gsap/PixiPlugin";


@Injectable()
export class Logic {
  private cellArr: any [] = []
  private app = this.puzzleComponent._app

  x: number = 114.5;
  y: number = 34;
  step: number = 106

  constructor(private puzzleComponent: PuzzleComponent) {

  }

  init() {
    console.log('11')
  }

  createStartElements() {
    // let x = this.x
    // let y = this.y
    // let step = this.step

    // this.crCell(,)
    this.cellArr = [
      this.crCell(1,1), null, this.crCell(3,1),this.crCell(4,1),
      null, this.crCell(2,2), this.crCell(3,2),null,
      null, null, this.crCell(3,3),null,
      null, null, this.crCell(3,4),this.crCell(4,4),
    ]
    for (let i = 0; i < this.cellArr.length; i++) {
      if (this.cellArr[i] != null) {
        this.puzzleComponent._app.stage.addChild(this.cellArr[i])
        // console.log(this.cellArr[i].getValue())
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

  crCell(x: number, y: number): CellGraphics {
   return new CellGraphics(this.x + this.step * (x-1),this.y + this.step * (y-1))
  }

  removeCell(index: number) {
    let element = this.cellArr[index];
    element.parent.removeChild(element);
  }

  move() {

  }

  moveCell() {

  }


  moveUp() {
    // let tempArr = this.cellArr
    let tempArr: any [] = []
    for (let y = 0; y < this.cellArr.length; y++) {
      tempArr.push(this.cellArr[y])
    }


    let squareSideLength = Math.sqrt(this.cellArr.length);

    for (let i = 0; i < squareSideLength; i++) {
      let iterationComplete: boolean = true
      let position = 0 + i
      let arrCountPosition = 0 + i
      // while (iterationComplete) {
      let move: boolean = false;
      let moveCount: number = 0;
      let tempCell = null
      let arrCount: number[] = []


      for (let n = 0; n < squareSideLength; n++, arrCountPosition += squareSideLength) {
        arrCount.push(arrCountPosition)
        // console.log(arrCount[n])
      }


      for (let j = 0; j < squareSideLength; j++, position += squareSideLength) {

        if (tempCell != null && this.cellArr[position] != null) {
          if (tempCell.getValue() == this.cellArr[position].getValue()) {
            moveCount++
            this.cellArr[position].setMoveY(moveCount)
            this.cellArr[position].setValue(this.cellArr[position].getValue()*2)

            tempArr[position] = null
            tempArr[arrCount[j-moveCount]] = this.cellArr[position]
            tempCell = null
            console.log(moveCount)
            continue
          }
        }
        if (this.cellArr[position] != null) {
          this.cellArr[position].setMoveY(moveCount)
          tempArr[position] = null
          tempArr[arrCount[j-moveCount]] = this.cellArr[position]
        }

        if (this.cellArr[position] == null) {
          moveCount++
        } else {
          tempCell = this.cellArr[position]
        }


        // if (this.cellArr[position] != null) {
        //   // var test = this.cellArr[position] as CellGraphics
        //   let x: number = this.cellArr[position].getMoveY()
        //   // console.log(this.cellArr[position].getMoveY as CellGraphics)
        //   // console.log(this.cellArr[position].getMoveY as number)
        //   // console.log(x)
        // }
        // console.log(this.cellArr[position].getMoveY + "-");


      }


      iterationComplete = false
      // }
    }

    console.log("cellArr: ", this.cellArr)
    console.log("--------------")
    console.log("temp: ",tempArr)

    // gsap.to(this.cellArr[0], {
    //   x: 200, y: 0, duration: 0.51, repeat: 0, yoyo: false,
    // });


  }

  // moveUp() {
  //   let tempArr = this.cellArr
  //
  //
  //   let squareSideLength = Math.sqrt(this.cellArr.length);
  //
  //   for (let i = 0; i < squareSideLength; i++) {
  //     let iterationComplete: boolean = true
  //     let position = 0 + i
  //     // while (iterationComplete) {
  //     let move: boolean = false;
  //     let tempCell = null
  //
  //
  //     for (let j = 0; j < squareSideLength; j++, position += squareSideLength) {
  //
  //       if (move && this.cellArr[position] != null) {
  //         this.cellArr[position].setMoveY((this.cellArr[position].getMoveY()) + 1)
  //       }
  //       if (tempCell != null && this.cellArr[position] != null) {
  //         if (tempCell.getValue() == this.cellArr[position].getValue()) {
  //           this.cellArr[position].setMoveY((this.cellArr[position].getMoveY()) + 1)
  //           tempCell = null
  //         }
  //       }
  //
  //       move = false;
  //       tempCell = this.cellArr[position]
  //
  //       if (this.cellArr[position] == null) {
  //         move = true
  //         // tempCell = null
  //
  //       } else {
  //         // tempCell = this.cellArr[position]
  //       }
  //
  //
  //       if (this.cellArr[position] != null) {
  //         // var test = this.cellArr[position] as CellGraphics
  //         let x: number = this.cellArr[position].getMoveY()
  //         // console.log(this.cellArr[position].getMoveY as CellGraphics)
  //         // console.log(this.cellArr[position].getMoveY as number)
  //         // console.log(x)
  //       }
  //       // console.log(this.cellArr[position].getMoveY + "-");
  //
  //
  //     }
  //
  //
  //     iterationComplete = false
  //     // }
  //   }
  //   gsap.to(this.cellArr[0], {
  //     x: 200, y: 0, duration: 0.51, repeat: 0, yoyo: false,
  //   });
  // }


  // gsap.to(this.cellArr[0], {
  //   x: 200, y: 0, duration: 0.51, repeat: 0, yoyo: false,
  // });


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

