import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDisplayerComponent } from './game-displayer.component';

describe('GameDisplayerComponent', () => {
  let component: GameDisplayerComponent;
  let fixture: ComponentFixture<GameDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDisplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
