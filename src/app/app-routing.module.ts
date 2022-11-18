import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PuzzleComponent} from "./puzzle/puzzle.component";

const routes: Routes = [
  {path: 'puzzle', component: PuzzleComponent},

  // {path: '', redirectTo: 'dictionaries', pathMatch: 'full'},
  // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
