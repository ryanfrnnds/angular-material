import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPadraoComponent } from './formulario-padrao.component';

describe('FormularioPadraoComponent', () => {
  let component: FormularioPadraoComponent;
  let fixture: ComponentFixture<FormularioPadraoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioPadraoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioPadraoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
