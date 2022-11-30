import {Injectable} from "@angular/core";
import {CellsManager} from "../units/CellsManager";
import {PuzzleComponent} from "../component/puzzle.component";
import {CellGraphics} from "../units/CellGraphics";


@Injectable()
export class Logic {
  private cellArr: CellGraphics[] = []


  // constructor() {
  constructor(private puzzleComponent: PuzzleComponent) {
  }

  init() {
    console.log('11')
  }

  createStartElements() {
  // private x: number = 114.5
  // private y: number = 34
    this.cellArr = [new CellGraphics(114.5, 34),new CellGraphics(200, 200)]
    this.puzzleComponent._app.stage.addChild(this.cellArr[0])
    this.puzzleComponent._app.stage.addChild(this.cellArr[1])
    // this.removeCell(1)


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
    console.log('moveUp')
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


