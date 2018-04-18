import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloComponent } from './titulo.component';
import { MatIconModule, 
         MatButtonModule, 
         MatCardModule,
         MatInputModule,
          } from '@angular/material';

import { GridModule } from '../../grid/grid.module';

describe('TituloComponent', () => {
  let component: TituloComponent;
  let fixture: ComponentFixture<TituloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TituloComponent ],
      imports: [
        MatIconModule, 
        MatButtonModule, 
        MatCardModule,
        MatInputModule,
        GridModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
