import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MatToolbarModule, 
        MatIconModule, 
        MatButtonModule, 
        MatCardModule, 
        MatFormFieldModule,
        MatInputModule, 
        MatSelectModule, 
        MatTableModule, 
        MatPaginatorModule,  
        MatSortModule,
        MatDialogModule,
        MatMenuModule,} from '@angular/material';
import {
  NavbarModule,
  ContainerModule,
  GridModule,
  ButtonModule,
  FooterModule,
  MdiasAppModule,
  TabelaModule,
  BotaoConfirmacaoModule,
  MensagensModule,
  BotaoMenuModule,
  BotaoMenuItemModule,
  WizardModule,
  BotaoIconeModule, } from './modulos/';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[
        NavbarModule,
        ContainerModule,
        GridModule,
        ButtonModule,
        ContainerModule,
        MatToolbarModule, 
        MatIconModule, 
        MatButtonModule, 
        MatCardModule, 
        MatFormFieldModule,
        MatInputModule, 
        MatSelectModule, 
        MatTableModule, 
        MatPaginatorModule,  
        MatSortModule,
        MatDialogModule,
        FooterModule,
        MdiasAppModule,
        TabelaModule,
        BotaoConfirmacaoModule,
        MensagensModule,
        MatMenuModule,
        BotaoMenuModule,
        BotaoMenuItemModule,
        WizardModule,
        BotaoIconeModule
      ]
    }).compileComponents();
  }));

  it('Criar o app.componentes', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it("Titulo SHOWCASE", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.logo a').textContent).toEqual('SHOWCASE');
  }));

  it("Checando footer", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('footer p').textContent).toContain('©2018 M Dias Branco');
  }));

});
