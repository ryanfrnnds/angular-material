import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPadraoFormComponent } from './formulario-padrao-form.component';

describe('FormularioPadraoFormComponent', () => {
  let component: FormularioPadraoFormComponent;
  let fixture: ComponentFixture<FormularioPadraoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioPadraoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioPadraoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
