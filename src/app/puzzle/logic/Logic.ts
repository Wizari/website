import {Injectable} from "@angular/core";
import {PuzzleComponent} from "../component/puzzle.component";
import {CellGraphics} from "../units/CellGraphics";
import {gsap} from "gsap";
import {Side} from "../units/Side";


@Injectable()
export class Logic {
  private cellArr: any [] = []
  private tempArr: any [] = []
  private cellArrLength: number = 4*4
  private app = this.puzzleComponent._app
  x: number = 114.5;
  y: number = 34;
  step: number = 106
  animationDuration: number = 0.3
  controlLocked: boolean = false

  constructor(private puzzleComponent: PuzzleComponent) {

  }

  init() {
  }

  createStartElements() {
    for (let i = 0; i < this.cellArrLength; i++) {
      this.cellArr.push(null)
    }
    this.createRandomCell()
    this.createRandomCell()
  }

  createRandomCell() {
    let nullArr: any [] = []
    let squareSideLength = Math.sqrt(this.cellArr.length);
    for (let i = 0; i < this.cellArr.length; i++) {
      if (this.cellArr[i] == null) {
        nullArr.push(i)
      }
    }
    if (nullArr.length != 0) {
      let random = Math.floor(Math.random() * (nullArr.length));
      let positionX: number = 1;
      let positionY: number = 1;

      if (squareSideLength > nullArr[random]) {
        this.cellArr[nullArr[random]] = this.crCell(nullArr[random] + 1, 1);
        this.puzzleComponent._app.stage.addChild(this.cellArr[nullArr[random]]);
      }


      if (squareSideLength <= nullArr[random]) {
        let arrPosition = nullArr[random] + 1
        while (true) {
          if (arrPosition > squareSideLength) {
            arrPosition -= squareSideLength;
            positionY++
          } else {
            positionX = arrPosition
            break;
          }
        }
        this.cellArr[nullArr[random]] = this.crCell(positionX, positionY);
        this.puzzleComponent._app.stage.addChild(this.cellArr[nullArr[random]]);
      }
    } else {
      console.log("****LOSE****")
    }


  }

  crCell(x: number, y: number): CellGraphics {
    return new CellGraphics(this.x + this.step * (x - 1), this.y + this.step * (y - 1))
  }

  removeCell(index: number) {
    let element = this.cellArr[index];
    element.parent.removeChild(element);
  }

  async moveUp() {
    if (!this.controlLocked) {
      this.moveCalculate(Side.UP);
      this.animate(Side.UP)
    }

  }

  async moveDown() {
    if (!this.controlLocked) {
      this.moveCalculate(Side.DOWN)
      this.animate(Side.DOWN)
    }
  }

  async moveLeft() {
    if (!this.controlLocked) {
      this.moveCalculate(Side.LEFT)
      this.animate(Side.LEFT)
    }
  }

  async moveRight() {
    if (!this.controlLocked) {
      this.moveCalculate(Side.RIGHT)
      this.animate(Side.RIGHT)
    }
  }

  moveCalculate(side: Side) {
    this.controlLocked = true
    this.tempArr = []
    for (let y = 0; y < this.cellArr.length; y++) {
      this.tempArr.push(this.cellArr[y])
    }
    let squareSideLength = Math.sqrt(this.cellArr.length);
    for (let i = 0; i < squareSideLength; i++) {
      let moveCount: number = 0;
      let tempCell = null
      let arrCount = this.calculateMove(side, i)

      for (let j = 0; j < squareSideLength; j++) {
        let position = arrCount[j]
        if (tempCell != null && this.cellArr[position] != null) {
          if (tempCell.getValue() == this.cellArr[position].getValue()) {
            moveCount++
            this.cellArr[position].setMoveY(moveCount)
            this.tempArr[position].setValue(this.cellArr[position].getValue() * 2)
            tempCell.setDestroyThis(true)
            this.tempArr[position] = null
            this.tempArr[arrCount[j - moveCount]] = this.cellArr[position]
            tempCell = null
            continue
          }
        }
        if (this.cellArr[position] != null) {
          this.cellArr[position].setMoveY(moveCount)
          tempCell = this.cellArr[position]
          if (moveCount != 0) {
            this.tempArr[position] = null;
            this.tempArr[arrCount[j - moveCount]] = this.cellArr[position]
          }
        }
        if (this.cellArr[position] == null) {
          moveCount++
        }
      }
    }
  }

  calculateMove(side: Side, iteration: number): any[] {
    let squareSideLength = Math.sqrt(this.cellArr.length);
    let arrCount: number[] = []
    let arrCountPosition = 0 + iteration

    switch (side) {
      case Side.UP: {
        for (let n = 0; n < squareSideLength; n++, arrCountPosition += squareSideLength) {
          arrCount.push(arrCountPosition)
        }
        return arrCount
      }
      case Side.DOWN: {
        for (let n = 0; n < squareSideLength; n++, arrCountPosition += squareSideLength) {
          arrCount.unshift(arrCountPosition)
        }
        return arrCount

      }
      case Side.LEFT: {
        for (let n = 0; n < squareSideLength; n++) {
          arrCount.push(n + (squareSideLength * iteration))
        }
        return arrCount
      }
      case Side.RIGHT: {
        for (let n = 0; n < squareSideLength; n++) {
          arrCount.unshift(n + (squareSideLength * iteration))
        }
        return arrCount
      }
      default: {
        //statements;
        return arrCount
      }
    }

  }

  resetCell(arr: any[]) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != null)
        arr[i].resetMoveStep()
    }
    for (let i = 0; i < this.cellArr.length; i++) {
      if (this.cellArr[i] != null) {
      }
    }
    this.createRandomCell()
    this.controlLocked = false


  }

  async arrayUpdate(array: any[]) {
    for (let j = 0; j < array.length; j++) {
      if (this.cellArr[j] != null && this.cellArr[j].getDestroyThis()) {
        this.app.stage.removeChild(this.cellArr[j]);
        this.cellArr[j].destroy();
        this.cellArr[j] = null;
      }
    }
    this.cellArr = this.tempArr
  }

  animate(side: Side) {
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
        switch (side) {
          case Side.UP: {
            gsap.to(cell, {
              x: cell.x,
              y: cell.y - (this.step * cell.getMoveY()),
              duration: this.animationDuration,
              repeat: 0,
              yoyo: false,
            }).then(result => {
              count++
              if (count == notNullElements) {
                this.arrayUpdate(this.tempArr).then(r => this.resetCell(this.cellArr)
                )
              }
            });
            break;
          }
          case Side.DOWN: {
            gsap.to(cell, {
              x: cell.x,
              y: cell.y + (this.step * cell.getMoveY()),
              duration: this.animationDuration,
              repeat: 0,
              yoyo: false,
            }).then(result => {
              count++
              if (count == notNullElements) {
                this.arrayUpdate(this.tempArr).then(r => this.resetCell(this.cellArr))
              }
            });
            break;

          }
          case Side.LEFT: {
            gsap.to(cell, {
              x: cell.x - (this.step * cell.getMoveY()),
              y: cell.y,
              duration: this.animationDuration,
              repeat: 0,
              yoyo: false,
            }).then(result => {
              count++
              if (count == notNullElements) {
                this.arrayUpdate(this.tempArr).then(r => this.resetCell(this.cellArr)
                )
              }
            });
            break;
          }
          case Side.RIGHT: {
            gsap.to(cell, {
              x: cell.x + (this.step * cell.getMoveY()),
              y: cell.y,
              duration: this.animationDuration,
              repeat: 0,
              yoyo: false,
            }).then(result => {
              count++
              if (count == notNullElements) {
                this.arrayUpdate(this.tempArr).then(r => this.resetCell(this.cellArr)
                )
              }
            });
            break;
          }
          default: {
            //statements;
            break;
          }
        }
      }
    }
  }

  lose() {

  }
}
