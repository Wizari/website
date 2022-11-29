import {Injectable} from "@angular/core";
import {Cell} from "./Cell";
import {PuzzleComponent} from "../component/puzzle.component";


@Injectable()
export class Cells {


  constructor() {


  }

  init() {
    console.log('init class Cells')
    // let test: Cell = new Cell(this.puzzleComponent);
    // test.value = 10
    // console.log(test)
  }

}

