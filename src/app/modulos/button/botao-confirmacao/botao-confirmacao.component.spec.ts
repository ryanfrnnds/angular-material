import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoConfirmacaoComponent, DialogoConfirmacao } from './botao-confirmacao.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { ButtonModule } from '../button/button.module';

describe('BotaoConfirmacaoComponent', () => {
  let component: BotaoConfirmacaoComponent;
  let fixture: ComponentFixture<BotaoConfirmacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotaoConfirmacaoComponent ],
      imports :[
        MatDialogModule, 
        MatButtonModule,
        ButtonModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotaoConfirmacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Criação', () => {
    expect(component).toBeTruthy();
  });
});
