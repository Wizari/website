import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PuzzleComponent} from "./puzzle/component/puzzle.component";
import {MainPageComponent} from "./main-page/main-page.component";

const routes: Routes = [
  {path: 'puzzle', component: PuzzleComponent},
  {path: '', component: MainPageComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},

  // {path: '**', component: PageNotFoundComponent}


  // MainPage
  // {path: '', redirectTo: 'dictionaries', pathMatch: 'full'},
  // {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
