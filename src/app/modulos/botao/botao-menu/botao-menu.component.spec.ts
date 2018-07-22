import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoMenuComponent } from './botao-menu.component';
import { MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';

describe('BotaoMenuComponent', () => {
  let component: BotaoMenuComponent;
  let fixture: ComponentFixture<BotaoMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotaoMenuComponent ],
      imports: [MatMenuModule, MatIconModule, MatButtonModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotaoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
