import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoIconeComponent } from './botao-icone.component';
import { MatIconModule, MatButtonModule } from '@angular/material';

describe('BotaoIconeComponent', () => {
  let component: BotaoIconeComponent;
  let fixture: ComponentFixture<BotaoIconeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotaoIconeComponent ],
      imports: [MatIconModule, MatButtonModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotaoIconeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Criação', () => {
    expect(component).toBeTruthy();
  });
});
