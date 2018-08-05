import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBAutenticacaoComponent } from './mdb-autenticacao.component';
import { HttpClientModule } from '@angular/common/http';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { SessaoExpiradaComponent } from './sessao-expirada/sessao-expirada.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [MDBAutenticacaoComponent, AcessoNegadoComponent, SessaoExpiradaComponent],
  exports: [MDBAutenticacaoComponent, AcessoNegadoComponent,SessaoExpiradaComponent]
})
export class MDBAutenticaoModule { }
