import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardItemComponent } from './wizard-item.component';

describe('WizardItemComponent', () => {
  let component: WizardItemComponent;
  let fixture: ComponentFixture<WizardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
