import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerComponent } from './container.component';
import { MatIconModule, 
         MatButtonModule, 
         MatCardModule,
         MatInputModule,
          } from '@angular/material';

import { GridModule } from '../grid/grid.module';
import { TituloComponent } from './titulo/titulo.component';

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerComponent ],
      imports: [
        MatIconModule, 
        MatButtonModule, 
        MatCardModule,
        MatInputModule,
        GridModule,
        TituloComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Criação', () => {
    expect(component).toBeTruthy();
  });
});
