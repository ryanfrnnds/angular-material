import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdiasAutocompleteComponent } from './mdias-autocomplete.component';

describe('MdiasAutocompleteComponent', () => {
  let component: MdiasAutocompleteComponent;
  let fixture: ComponentFixture<MdiasAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdiasAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdiasAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
