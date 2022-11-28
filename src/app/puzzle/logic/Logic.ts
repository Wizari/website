import {Injectable} from "@angular/core";


// @Injectable()
@Injectable({providedIn: 'root'})
export class Logic {
  constructor() {
  }

  init() {
    console.log('11')

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


