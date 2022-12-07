import {Injectable} from "@angular/core";
import {PuzzleComponent} from "../component/puzzle.component";
import {CellGraphics} from "../units/CellGraphics";
// import * as PIXI from 'pixi.js';
// import * as TWEEN from '@tweenjs/tween.js'
import { gsap } from "gsap";
import {repeat} from "rxjs/operators";
import {formatI18nPlaceholderName} from "@angular/compiler/src/render3/view/i18n/util";
// import { gsap } from "gsap";
// import { PixiPlugin } from "gsap/PixiPlugin";


@Injectable()
export class Logic {
  private cellArr: any [] = []
  private tempArr: any [] = []

  private app = this.puzzleComponent._app

  x: number = 114.5;
  y: number = 34;
  step: number = 106
  controlLocked: boolean = false

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
    // this.app.stage.removeChild( this.cellArr[0] );

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

  async moveUp() {
    // if (!this.controlLocked){
    //   this.controlLocked = true
      this.tempArr = []
    for (let y = 0; y < this.cellArr.length; y++) {
      this.tempArr.push(this.cellArr[y])
    }
    console.log("new ", this.tempArr)
    let squareSideLength = Math.sqrt(this.cellArr.length);
    for (let i = 0; i < squareSideLength; i++) {
      let position = 0 + i
      let arrCountPosition = 0 + i
      let moveCount: number = 0;
      let tempCell = null
      let cellPosition = 0
      let arrCount: number[] = []

      for (let n = 0; n < squareSideLength; n++, arrCountPosition += squareSideLength) {
        arrCount.push(arrCountPosition)
      }

      for (let j = 0; j < squareSideLength; j++, position += squareSideLength) {
        if (tempCell != null && this.cellArr[position] != null) {
          if (tempCell.getValue() == this.cellArr[position].getValue()) {
            moveCount++
            this.cellArr[position].setMoveY(moveCount)
            this.tempArr[position].setValue(this.cellArr[position].getValue() * 2)
            tempCell.setDestroyThis(true)
            this.tempArr[position] = null
            this.tempArr[arrCount[j - moveCount]] = this.cellArr[position]
            tempCell = null
            cellPosition = 0
            continue
          }
        }
        if (this.cellArr[position] != null) {
          this.cellArr[position].setMoveY(moveCount)
          if (moveCount != 0) {
            this.tempArr[position] = null;
            this.tempArr[arrCount[j - moveCount]] = this.cellArr[position]
          }
        }
        if (this.cellArr[position] == null) {
          moveCount++
        } else {
          tempCell = this.cellArr[position]
          cellPosition = position
        }
      }
    }
    await this.animate(this.cellArr)
  // }
  }

  resetCell(arr: any[]) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != null)
      arr[i].resetMoveStep()
    }
    for (let i = 0; i < this.cellArr.length; i++) {
      if (this.cellArr[i] != null) {
        console.log("temp: ", i, " - ", this.cellArr[i].getMoveY());
      }
    }
    // this.controlLocked = false

  }

  async arrayUpdate(array: any[]) {
    for (let j = 0; j < array.length; j++) {
      if (this.cellArr[j] != null && this.cellArr[j].getDestroyThis()) {
        console.log(j," * ", this.cellArr[j].getDestroyThis() )
        console.log(j," * ", this.cellArr[j].y )
        this.app.stage.removeChild( this.cellArr[j] );
        this.cellArr[j].destroy();
        this.cellArr[j] = null;
      }
    }
    this.cellArr = this.tempArr
    this.resetCell(this.cellArr)
  }

  animate(array: any[]) {
    let notNullElements = 0
    let count = 0

    for (let i = 0; i < array.length; i++) {
      if (array[i] != null) {
        notNullElements++
      }
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i] != null) {
        let cell: CellGraphics = array[i]
        gsap.to(cell, {
        x: cell.x, y:cell.y - (this.step * cell.getMoveY()), duration: 0.51, repeat: 0, yoyo: false,
        }).then(result => {count++
          if (count == notNullElements) {
            this.arrayUpdate(this.tempArr)
          }
        });
      }
    }

  }

  async moveDown() {
    // if (!this.controlLocked){
    //   this.controlLocked = true

      this.tempArr = []
    for (let y = 0; y < this.cellArr.length; y++) {
      this.tempArr.push(this.cellArr[y])
    }
    console.log("new ", this.tempArr)
    let squareSideLength = Math.sqrt(this.cellArr.length);
    for (let i = 0; i < squareSideLength; i++) {
      let position = 0 + i
      let arrCountPosition = 0 + i
      let moveCount: number = 0;
      let tempCell = null
      let cellPosition = 0
      let arrCount: number[] = []

      for (let n = 0; n < squareSideLength; n++, arrCountPosition += squareSideLength) {
        // arrCount.push(arrCountPosition)
        arrCount.unshift(arrCountPosition)

      }
      console.log(arrCount)

      for (let j = 0; j < squareSideLength; j++) {
        position = arrCount[j]

        if (tempCell != null && this.cellArr[position] != null) {
          if (tempCell.getValue() == this.cellArr[position].getValue()) {
            moveCount++
            this.cellArr[position].setMoveY(moveCount)
            this.tempArr[position].setValue(this.cellArr[position].getValue() * 2)
            tempCell.setDestroyThis(true)
            this.tempArr[position] = null
            this.tempArr[arrCount[j - moveCount]] = this.cellArr[position]
            tempCell = null
            // cellPosition = 0
            continue
          }
        }

        if (this.cellArr[position] != null) {
          this.cellArr[position].setMoveY(moveCount)
          console.log("jj", j)
          console.log("position", position)
          tempCell = this.cellArr[position]

          if (moveCount != 0) {
            this.tempArr[position] = null;
            this.tempArr[arrCount[j - moveCount]] = this.cellArr[position]
          }
        }
        if (this.cellArr[position] == null) {
          moveCount++
        } else {
          // console.log("jj", j)
          // console.log("position", position)
          // tempCell = this.cellArr[position]
          // cellPosition = position
        }
      }
    // }
    }

    // await this.animate(this.cellArr)
    let notNullElements = 0
    let count = 0

    for (let i = 0; i < this.cellArr.length; i++) {
      if (this.cellArr[i] != null) {
        notNullElements++
      }
    }
    for (let i = 0; i < this.cellArr.length; i++) {
      if (this.cellArr[i] != null) {
        let cell: CellGraphics = this.cellArr[i]
        gsap.to(cell, {
          x: cell.x, y:cell.y + (this.step * cell.getMoveY()), duration: 0.51, repeat: 0, yoyo: false,
        }).then(result => {count++
          if (count == notNullElements) {
            this.arrayUpdate(this.tempArr)
          }
        });
      }
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

// async arrayUpdate(array: any[]) {
//   // this.cellArr = array
//   // this.cellArr = []
//   for (let j = 0; j < array.length; j++) {
//     if (this.cellArr[j] != null && this.cellArr[j].getDestroyThis()) {
//       console.log(j," * ", this.cellArr[j].getDestroyThis() )
//       // console.log(this.cellArr[j].getDestroyThis())
//       // this.cellArr[array[j]].destroy();
//       // this.app.stage.removeChild(this.cellArr[j])
//       // this.cellArr[j].removeChild()
//       // this.removeCell(this.cellArr[j])
//       // let cell: CellGraphics = this.cellArr[j]
//       // this.app.stage.removeChild(cell)
//       this.app.stage.removeChild( this.cellArr[j] );
//       // cell.destroy();
//       this.cellArr[j].destroy();
//       this.cellArr[j] = null;
//       // let element = this.cellArr[j];
//       // element.parent.removeChild(element);
//       // this.app.stage.removeChild( this.cellArr[j] );
//
//     }
//     // this.cellArr[j] = []
//     // this.cellArr[j] = null
//     this.cellArr[j] = array[j]
//   }
//   console.log(this.cellArr)
//   // this.cellArr = array
//
//   this.resetCell(this.cellArr)
//
// }


// async moveUp() {
//   this.tempArr = []
//   for (let y = 0; y < this.cellArr.length; y++) {
//     this.tempArr.push(this.cellArr[y])
//   }
//   console.log("new ", this.tempArr)
//   let squareSideLength = Math.sqrt(this.cellArr.length);
//   for (let i = 0; i < squareSideLength; i++) {
//     // let iterationComplete: boolean = true
//     let position = 0 + i
//     let arrCountPosition = 0 + i
//     // while (iterationComplete) {
//     let move: boolean = false;
//     let moveCount: number = 0;
//     let tempCell = null
//     let cellPosition = 0
//     let arrCount: number[] = []
//     let arrCountNotNull: number[] = []
//
//     for (let n = 0; n < squareSideLength; n++, arrCountPosition += squareSideLength) {
//       // if (this.cellArr[arrCountPosition] != null) {
//       //   arrCountNotNull.push(arrCountPosition);
//       // }
//       arrCount.push(arrCountPosition)
//     }
//
//     for (let j = 0; j < squareSideLength; j++, position += squareSideLength) {
//       if (tempCell != null && this.cellArr[position] != null) {
//         if (tempCell.getValue() == this.cellArr[position].getValue()) {
//           moveCount++
//           this.cellArr[position].setMoveY(moveCount)
//           // this.cellArr[position].setValue(this.cellArr[position].getValue() * 2)
//           this.tempArr[position].setValue(this.cellArr[position].getValue() * 2)
//           // console.log(cellPosition)
//           // this.cellArr[cellPosition].setDestroyThis(true)
//           // this.cellArr[arrCount[j - moveCount]].setDestroyThis(true)
//           tempCell.setDestroyThis(true)
//           this.tempArr[position] = null
//           // tempArr[position].destroy()
//           // let cell: CellGraphics = new CellGraphics(200,200)
//           // cell.setDestroyThis(true)
//           // cell.removeChild()
//           // this.tempArr[cellPosition] = this.cellArr[position]
//           this.tempArr[arrCount[j - moveCount]] = this.cellArr[position]
//
//
//           tempCell = null
//           cellPosition = 0
//           // console.log(moveCount)
//           continue
//         }
//       }
//       if (this.cellArr[position] != null) {
//         this.cellArr[position].setMoveY(moveCount)
//         // this.cellArr[position].setDestroyThis(true)
//         if (moveCount != 0) {
//           this.tempArr[position] = null;
//           // tempArr[position].destroy()
//           // this.tempArr[arrCount[j - moveCount]] = this.cellArr[position]
//           this.tempArr[arrCount[j - moveCount]] = this.cellArr[position]
//         }
//       }
//
//       if (this.cellArr[position] == null) {
//         moveCount++
//       } else {
//         tempCell = this.cellArr[position]
//         cellPosition = position
//       }
//     }
//     // await this.arrayUpdate(this.tempArr)
//     // await this.resetCell(this.cellArr)
//   }
//
//   console.log("1111111111 - ", this.tempArr)
//
//   await this.animate(this.cellArr)
//
// }
//
// resetCell(arr: any[]) {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] != null)
//       arr[i].resetMoveStep()
//   }
//
//   console.log("cellArr: ", this.cellArr)
//   console.log("--------------")
//   console.log("temp: ", this.tempArr)
//   for (let i = 0; i < this.cellArr.length; i++) {
//     if (this.cellArr[i] != null) {
//       console.log("temp: ", i, " - ", this.cellArr[i].getMoveY());
//     }
//   }
//
// }
//
// async arrayUpdate(array: any[]) {
//   // console.log(this.cellArr)
//
//   // this.cellArr = array
//   // this.cellArr = []
//   for (let j = 0; j < array.length; j++) {
//     if (this.cellArr[j] != null && this.cellArr[j].getDestroyThis()) {
//       console.log(j," * ", this.cellArr[j].getDestroyThis() )
//       console.log(j," * ", this.cellArr[j].y )
//       this.app.stage.removeChild( this.cellArr[j] );
//       this.cellArr[j].destroy();
//       this.cellArr[j] = null;
//     }
//     // this.cellArr[j] = []
//     // this.cellArr[j] = null
//     // this.cellArr[j] = array[j]
//     // console.log(this.cellArr[j] )
//
//   }
//   // this.cellArr = []
//
//   // for (let y = 0; y < this.tempArr.length; y++) {
//   //   this.cellArr.push(this.tempArr[y])
//   // }
//   // console.log(this.cellArr)
//
//   // this.cellArr = array
//   this.cellArr = this.tempArr
//   this.resetCell(this.cellArr)
//
// }
//
//
// animate(array: any[]) {
//   let notNullElements = 0
//   let count = 0
//
//   for (let i = 0; i < array.length; i++) {
//     if (array[i] != null) {
//       notNullElements++
//     }
//   }
//   for (let i = 0; i < array.length; i++) {
//     if (array[i] != null) {
//       let cell: CellGraphics = array[i]
//       gsap.to(cell, {
//         // x: 200, y: 0, duration: 0.51, repeat: 0, yoyo: false,
//         //   x: cell.x, y:cell.y - (this.step * cell.getMoveY()), duration: 0.51, repeat: 0, yoyo: false,
//         // });
//         x: cell.x, y:cell.y - (this.step * cell.getMoveY()), duration: 0.51, repeat: 0, yoyo: false,
//         // }).then(result => console.log(result));
//         // }).then(result => {this.arrayUpdate(this.tempArr)});
//       }).then(result => {count++
//         // console.log("222")
//         if (count == notNullElements) {
//           // console.log("111")
//           this.arrayUpdate(this.tempArr)
//         }
//       });
//     }
//   }
//
// }
