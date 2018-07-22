import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoNegadoComponent } from './acesso-negado.component';

describe('AcessoNegadoComponent', () => {
  let component: AcessoNegadoComponent;
  let fixture: ComponentFixture<AcessoNegadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcessoNegadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcessoNegadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
