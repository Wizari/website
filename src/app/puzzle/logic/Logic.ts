import {Injectable} from "@angular/core";
import {CellsManager} from "../units/CellsManager";
import {PuzzleComponent} from "../component/puzzle.component";


@Injectable()
export class Logic {
  constructor() {
  // constructor(private puzzleComponent: PuzzleComponent) {
  }

  init() {
  // var cell: CellsManager = new CellsManager()
    console.log('11')
    // this.cell.init()
    // const cells: CellsManager = new CellsManager(this.puzzleComponent)


  }

  createStartElements() {

  }

  moveUp() {
    console.log('moveUp')
  }
  moveDown() {
    console.log('moveDown')

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


