import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdiasTabelaComponent } from './mdias-tabela.component';

describe('MdiasTabelaComponent', () => {
  let component: MdiasTabelaComponent;
  let fixture: ComponentFixture<MdiasTabelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdiasTabelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdiasTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
