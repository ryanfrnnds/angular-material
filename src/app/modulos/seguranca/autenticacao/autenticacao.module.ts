import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutenticacaoComponent } from './autenticacao.component';
import { HttpClientModule } from '@angular/common/http';
import { MdbServico } from '../../servicos/mdb-servico';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [AutenticacaoComponent],
  exports: [AutenticacaoComponent],
  providers: [MdbServico]
})
export class AutenticaoModule { }
