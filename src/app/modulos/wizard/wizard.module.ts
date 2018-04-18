import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from './wizard.component';
import { GridModule } from '../grid/grid.module';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { WizardItemComponent } from './wizard-item/wizard-item.component';
import { WizardAcoesComponent } from './wizard-acoes/wizard-acoes.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    GridModule,
    MatButtonModule
  ],
  declarations: [WizardComponent, WizardItemComponent, WizardAcoesComponent],
  exports: [WizardComponent, WizardItemComponent, WizardAcoesComponent]
})
export class WizardModule { }
