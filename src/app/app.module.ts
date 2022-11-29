import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './view/app.component';
import {MainFrameComponent} from './main-frame/main-frame.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatNativeDateModule} from "@angular/material/core";
import {MaterialModule} from "../material/material.module";
import {PuzzleComponent} from './puzzle/component/puzzle.component';
import {Logic} from "./puzzle/logic/Logic";
import {Cells} from "./puzzle/units/Cells";


@NgModule({
  declarations: [
    AppComponent,
    MainFrameComponent,
    PuzzleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    Logic,
    Cells,

    // {provide: Screen, useClass: Logic, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
