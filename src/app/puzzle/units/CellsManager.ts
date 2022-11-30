import {Injectable} from "@angular/core";
// import {Cell} from "./Cell";
import {PuzzleComponent} from "../component/puzzle.component";
import {CellGraphics} from "./CellGraphics";


@Injectable()
export class CellsManager {



  constructor() {


  }

  init() {
    console.log('init class CellsManager')
    var cell: CellGraphics = new CellGraphics(140, 140)
    // await this._app.stage.addChild(new CellGraphics(0, 0))

    // CellsManager.
    // let test: Cell = new Cell(this.puzzleComponent);
    // test.value = 10
    // console.log(test)
  }

}

