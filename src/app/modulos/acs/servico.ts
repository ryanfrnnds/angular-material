import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { I18n } from '../../i18n/i18n';
import { MDB } from '../../util/mdb';
import { MDBHttp } from '../http/mdb-http';
import { ACSAcessoGrupo } from './acesso-grupo';
import { ACSPermissoes } from './permissoes';



@Injectable()
export class MdbAcsServico implements CanActivate {

  constructor() {}

    public ehPermitidoExclusao(funcao: string): Observable<boolean> {
			return  MDB.servicos().http.post<any>(new MDBHttp('acesso/consultar/funcoes'), [funcao])
			.pipe(
				map((acessosGrupo) => {
							for (const acessoGrupo of acessosGrupo) {
									const permissoes = ACSPermissoes.excluir.niveis.filter( nivel => nivel === acessoGrupo.nivel);
									if(permissoes) {
											return true;
									}
							}
							return false;
						}), 
				catchError((httpError) => {
							return throwError(httpError);
				})
			);
    }

    public ehPermitidoAlteracao(funcao: string): Observable<boolean> {
			return  MDB.servicos().http.post<any>(new MDBHttp('acesso/consultar/funcoes'), [funcao])
			.pipe(
				map((acessosGrupo) => {
							for (const acessoGrupo of acessosGrupo) {
								const permissoes = ACSPermissoes.alterar.niveis.filter( nivel => nivel === acessoGrupo.nivel);
                if(permissoes) {
                    return true;
                }
							}
							return false;
						}), 
				catchError((httpError) => {
							return throwError(httpError);
				})
			);
    }

    public ehPermitidoInclusao(funcao: string): Observable<boolean> {
			return  MDB.servicos().http.post<any>(new MDBHttp('acesso/consultar/funcoes'), [funcao])
			.pipe(
				map((acessosGrupo) => {
							for (const acessoGrupo of acessosGrupo) {
								const permissoes = ACSPermissoes.incluir.niveis.filter( nivel => nivel === acessoGrupo.nivel);
                if(permissoes) {
                    return true;
                }
							}
							return false;
						}), 
				catchError((httpError) => {
							return throwError(httpError);
				})
			);
    }

    public ehPermitidoConsultar(funcao: string): Observable<boolean> {
			return  MDB.servicos().http.post<any>(new MDBHttp('acesso/consultar/funcoes'), [funcao])
			.pipe(
				map((acessosGrupo) => {
							for (const acessoGrupo of acessosGrupo) {
								const permissoes = ACSPermissoes.consultar.niveis.filter( nivel => nivel === acessoGrupo.nivel);
                if(permissoes) {
                    return true;
                }
							}
							return false;
						}), 
				catchError((httpError) => {
							return throwError(httpError);
				})
			);
    }

    public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const traducao = I18n.Instance().traducao.mdbComponentes;
        const funcoes = MDB.util().buscarValor(route, 'data.funcoes');
        if(funcoes && funcoes.length && funcoes.length > 0) {
						return MDB.servicos().http.post(new MDBHttp('acesso/consultar/funcoes'),funcoes).pipe(
							map((lista: Array<ACSAcessoGrupo>) => {
								const possuiFuncao: boolean = lista && lista.length > 0;
                if(!possuiFuncao) {
                    MDB.servicos().mensagem.limparMensagem();
                    MDB.servicos().mensagem.addErro('', traducao.permissao.semAcessoFuncao);
                    return false;
                }
                return true;
								}), 
							catchError((httpError) => {
										return throwError(httpError);
							})
						);
        } else {
            MDB.servicos().mensagem.limparMensagem();
            MDB.servicos().mensagem.addErro('', traducao.permissao.semFuncaoConfigurada);
            return of(false);
        }
    }
}

