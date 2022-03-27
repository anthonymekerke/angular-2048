import { Component, HostListener, OnInit } from '@angular/core';

import { Engine } from '../../engine';

@Component({
  selector: 'app-game-displayer',
  templateUrl: './game-displayer.component.html',
  styleUrls: ['./game-displayer.component.css']
})
export class GameDisplayerComponent implements OnInit {

  engine: Engine;
  keypressed: string = '';

  constructor() {
    this.engine = new Engine(4);
    this.engine.initialize();
  }

  ngOnInit(): void {}

  public counter(i: number){
    return new Array<number>(i);
  }

  public reset(){
    this.engine.initialize();
  }

  private slide(side: string){
    this.engine.slide(side);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if(event.key == "ArrowLeft") {this.slide('left');}
    if(event.key == "ArrowRight") {this.slide('right');}
    if(event.key == "ArrowDown") {this.slide('down');}
    if(event.key == "ArrowUp") {this.slide('up');}
  }
}
