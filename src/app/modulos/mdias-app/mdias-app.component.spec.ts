import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdiasAppComponent } from './mdias-app.component';

describe('PaginaComponent', () => {
  let component: MdiasAppComponent;
  let fixture: ComponentFixture<MdiasAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdiasAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdiasAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
