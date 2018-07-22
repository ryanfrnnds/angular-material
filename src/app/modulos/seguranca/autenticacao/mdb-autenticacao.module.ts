import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBAutenticacaoComponent } from './mdb-autenticacao.component';
import { HttpClientModule } from '@angular/common/http';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [MDBAutenticacaoComponent, AcessoNegadoComponent],
  exports: [MDBAutenticacaoComponent, AcessoNegadoComponent]
})
export class MDBAutenticaoModule { }
