import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdiasAutocompleteComponent } from './mdias-autocomplete.component';
import { MatAutocompleteModule, MatInputModule, MatIconModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
})
export class MdiasAutocompleteModule { }
