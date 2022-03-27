import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameDisplayerComponent } from './game-displayer/game-displayer.component';

@NgModule({
  declarations: [
    AppComponent,
    GameDisplayerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
