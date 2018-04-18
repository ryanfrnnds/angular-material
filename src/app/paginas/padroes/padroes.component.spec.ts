import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadroesComponent } from './padroes.component';

describe('PadroesComponent', () => {
  let component: PadroesComponent;
  let fixture: ComponentFixture<PadroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadroesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
