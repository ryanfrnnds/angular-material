import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdiasAutocompleteComponent } from './mdias-autocomplete.component';
import { MatAutocompleteModule, MatInputModule, MatPaginatorIntl, MatIconModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdiasProvedorPaginacao } from './provedores/mdias-provedor-paginacao';

@NgModule({
  imports: [
    CommonModule
    , FormsModule 
    , ReactiveFormsModule
    , MatInputModule
    , MatAutocompleteModule  
    , MatIconModule
    , MatButtonModule
  ]
  , declarations: [MdiasAutocompleteComponent]
  , exports: [MdiasAutocompleteComponent]
  , providers: [{ provide: MatPaginatorIntl, useClass: MdiasProvedorPaginacao}]
})
export class MdiasAutocompleteModule { }
