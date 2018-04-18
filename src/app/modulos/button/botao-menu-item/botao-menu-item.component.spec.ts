import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoMenuItemComponent } from './botao-menu-item.component';
import { MatButtonModule,  MatIconModule, MatMenuModule, MatDialogModule } from '@angular/material';

describe('BotaoMenuItemComponent', () => {
  let component: BotaoMenuItemComponent;
  let fixture: ComponentFixture<BotaoMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotaoMenuItemComponent ],
      imports: [
        MatButtonModule,  
        MatIconModule, 
        MatMenuModule,
        MatDialogModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotaoMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Criação', () => {
    expect(component).toBeTruthy();
  });
});
