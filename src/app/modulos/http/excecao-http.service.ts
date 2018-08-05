import { Injectable } from '@angular/core';
import {  SubscriptionLike as ISubscription, timer } from 'rxjs';
import { MDB } from '../../util/mdb';
import { TipoResposta } from './tipo-resposta';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionOnload } from '../session-storage/session-storage-onload';
import { SessionSSO } from '../session-storage/session-storage-sso';
import { MDBHttp } from './mdb-http';


@Injectable({providedIn: 'root'})
export class ExcecaoHttpService {

 public constructor
    (
      private sessionSSO:SessionSSO
    ) {}

 public mensagem(titulo:string, mensagem: string): void {
   MDB.servicos().mensagem.limparMensagem();
   MDB.servicos().mensagem.addErro(titulo, mensagem, 5000)
  }

  /*
    Falha na autenticacao
    Em qualquer ocorrencia de status 401,  deve-se autenticar
  **/

  public autenticacao(httpError: HttpErrorResponse) {
    /*
    if(!window.location.href.split("#")[0].startsWith('/autenticar')) {
      const ssoExpirado = new SessionSSO();
			ssoExpirado.rotaAngular = window.location.href;
      localStorage.setItem(SessionSSO.key(), JSON.stringify(ssoExpirado));
    }
    */
    this.mensagem('Erro de autenticação', 'Realizando nova autenticação de usuário');
    MDB.angular().router.navigateByUrl('/autenticar');
  }

  /*
    Permissao Negada
    Quando o status for 403 - sem permissao de acesso
    exibe a mensagem e fica na mesma tela
  **/
  public permissaoNegada(httpError: HttpErrorResponse) {
    this.mensagem('Erro de Permissão', 'Usuário nao tem permissão para acessar esta funcionalidade.');
  }

  /*
    Quando o status de erro for 0, deve-se ir para a tela de sessao expirada.
  **/
  public sessaoExpirada(httpError: HttpErrorResponse) : void {
    this.sessionSSO.guardarNaSessao();
    this.mensagem('Sessão expirada', 'Realizando novo login para reautenticar usuário.');
    MDB.angular().router.navigateByUrl('/sessaoExpirada');
  }

  private excecoesEsperadas(httpError): boolean {
    let flag = false;
    if (httpError.status === TipoResposta.AUTENTICACAO.status
        ||
      httpError.status === TipoResposta.PERMISSAO_NEGADA_ACS.status
        ||
      httpError.status === TipoResposta.SESSAO_SSO_EXPIRADA.status) {
        flag = true
      }
      return flag;
  }

  public decidirFluxo(httpError: HttpErrorResponse, opcoes: MDBHttp, ): HttpErrorResponse {
      if(!this.excecoesEsperadas(httpError) ){
        if(opcoes.mensagem && opcoes.mensagem.falha) {
          this.mensagem(opcoes.mensagem.titulo, opcoes.mensagem.falha);
        } else {
          if(httpError.error.mensagem && typeof httpError.error.mensagem === 'string') {
            this.mensagem('', httpError.error.mensagem);
          } else {
            this.mensagem('Error não esperado', 'Favor entrar em contato com a FSW');
          }
        }
        return;
      }
      if(httpError.status === TipoResposta.AUTENTICACAO.status) {
        this.autenticacao(httpError);
      }
      if(httpError.status === TipoResposta.PERMISSAO_NEGADA_ACS.status) {
        this.permissaoNegada(httpError);
      }
      if(httpError.status === TipoResposta.SESSAO_SSO_EXPIRADA.status) {
        this.sessaoExpirada(httpError);
      }
      return httpError;
  }

}
