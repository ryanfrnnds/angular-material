import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdiasAutocompleteComponent } from './mdias-autocomplete.component';
import { MatAutocompleteModule, MatInputModule, MatPaginatorIntl } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdiasProvedorPaginacao } from './provedores/mdias-provedor-paginacao';

@NgModule({
  imports: [
    CommonModule
    , FormsModule 
    , ReactiveFormsModule
    , MatInputModule
    , MatAutocompleteModule  
  ]
  , declarations: [MdiasAutocompleteComponent]
  , exports: [MdiasAutocompleteComponent]
  , providers: [{ provide: MatPaginatorIntl, useClass: MdiasProvedorPaginacao}]
})
export class MdiasAutocompleteModule { }
