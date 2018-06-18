import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBAutenticacaoComponent } from './mdb-autenticacao.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [MDBAutenticacaoComponent],
  exports: [MDBAutenticacaoComponent]
})
export class MDBAutenticaoModule { }
