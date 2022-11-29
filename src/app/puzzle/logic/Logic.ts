import {Injectable} from "@angular/core";
import {Cells} from "../units/Cells";
import {PuzzleComponent} from "../component/puzzle.component";


@Injectable()
export class Logic {
  constructor(private cell: Cells) {
  // constructor(private puzzleComponent: PuzzleComponent) {
  }

  init() {
    console.log('11')
    this.cell.init()
    // const cells: Cells = new Cells(this.puzzleComponent)


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


