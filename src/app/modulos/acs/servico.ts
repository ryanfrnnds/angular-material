import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import 'rxjs/add/operator/map';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MdbMensageria } from '../mensagens/mensagens.service';

import { I18n } from '../../i18n/i18n';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { MDB, MDBLocalStorage } from '../../util/mdb';
import { MDBHttp } from '../http/mdb-http';
import { ACSPermissoes } from './permissoes';
import { ACSAcessoGrupo } from './acesso-grupo';

@Injectable()
export class MdbAcsServico implements CanActivate {

  constructor( private mensageria: MdbMensageria, private rota: Router) {}

    public ehPermitidoExclusao(funcao: string): Observable<boolean> {
        return MDB.servico.post(new MDBHttp('acesso/consultar/funcoes',ACSPermissoes.livre), [funcao]).map((acessosGrupo:Array<ACSAcessoGrupo>) => {
            for (const acessoGrupo of acessosGrupo) {
                const permissoes = ACSPermissoes.excluir.niveis.filter( nivel => nivel === acessoGrupo.nivel);
                if(permissoes) {
                    return true;
                }
            }
            return false;
        }).catch(httpError => {
            return ErrorObservable.create(httpError);
        });
    }

    public ehPermitidoAlteracao(funcao: string): Observable<boolean> {
        return MDB.servico.post(new MDBHttp('acesso/consultar/funcoes',ACSPermissoes.livre), [funcao]).map((acessosGrupo:Array<ACSAcessoGrupo>) => {
            for (const acessoGrupo of acessosGrupo) {
                const permissoes = ACSPermissoes.alterar.niveis.filter( nivel => nivel === acessoGrupo.nivel);
                if(permissoes) {
                    return true;
                }
            }
            return false;
        }).catch(httpError => {
            return ErrorObservable.create(httpError);
        });
    }

    public ehPermitidoInclusao(funcao: string): Observable<boolean> {
        return MDB.servico.post(new MDBHttp('acesso/consultar/funcoes',ACSPermissoes.livre), [funcao]).map((acessosGrupo:Array<ACSAcessoGrupo>) => {
            for (const acessoGrupo of acessosGrupo) {
                const permissoes = ACSPermissoes.incluir.niveis.filter( nivel => nivel === acessoGrupo.nivel);
                if(permissoes) {
                    return true;
                }
            }
            return false;
        }).catch(httpError => {
            return ErrorObservable.create(httpError);
        });
    }

    public ehPermitidoConsultar(funcao: string): Observable<boolean> {
        return MDB.servico.post(new MDBHttp('acesso/consultar/funcoes',ACSPermissoes.livre), [funcao]).map((acessosGrupo:Array<ACSAcessoGrupo>) => {
            for (const acessoGrupo of acessosGrupo) {
                const permissoes = ACSPermissoes.consultar.niveis.filter( nivel => nivel === acessoGrupo.nivel);
                if(permissoes) {
                    return true;
                }
            }
            return false;
        }).catch(httpError => {
            return ErrorObservable.create(httpError);
        });
    }


    public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const traducao = I18n.Instance().traducao.mdbComponentes;
        const funcoes = MDB.buscarValor(route, 'data.funcoes');
        if(funcoes && funcoes.length && funcoes.length > 0) {
            return MDB.servico.post<Array<ACSAcessoGrupo>>(new MDBHttp('acesso/consultar/funcoes',ACSPermissoes.livre), [route.data.funcoes]).map( lista => {
                const possuiFuncao: boolean = lista && lista.length > 0;
                if(!possuiFuncao) {
                    this.mensageria.limparMensagem();
                    this.mensageria.addErro('', traducao.permissao.semAcesso);
                    return false;
                }
                return true;
            });
        } else {
            this.mensageria.limparMensagem();
            this.mensageria.addErro('', traducao.permissao.semFuncaoConfigurada);
            return Observable.of(false);
        }
    }
}

