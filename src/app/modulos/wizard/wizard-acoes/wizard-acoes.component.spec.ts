import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardAcoesComponent } from './wizard-acoes.component';

describe('WizardAcoesComponent', () => {
  let component: WizardAcoesComponent;
  let fixture: ComponentFixture<WizardAcoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardAcoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardAcoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
