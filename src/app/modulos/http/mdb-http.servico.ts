import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MdbMensagemServico } from '../mensagens/mensagens.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { MDB, MDBLocalStorage } from '../../util/mdb';
import { ACSPermissoes } from '../acs/permissoes';
import { MDBHttp } from './mdb-http';
import { MdbMensagemHttp } from './mdb-mensagem-http';

@Injectable()
export class MdbHttpServico {

    public get ACSNomeHeader(): string {
        return 'NIVEL-ACS'
    }

  constructor(private http: HttpClient
              , private servicoMensagem:MdbMensagemServico
              , private rota: Router
            ) {}


    public get<T>(opcoes:MDBHttp): Observable<T> {
        opcoes.addHeader(this.ACSNomeHeader,opcoes.nivelAcs.descricao);
        return this.http.get<T>(opcoes.url,opcoes.options).map(resposta => {
            return resposta;
        })
        .catch(httpError => {
            return opcoes.catch(httpError);
        });
    }

    public post<T>(opcoes:MDBHttp, objeto: any): Observable<T> {
        opcoes.addHeader(this.ACSNomeHeader,opcoes.nivelAcs.descricao);
        const toAdd = objeto;
        return this.http.post<T>(opcoes.url, toAdd, opcoes.options).map(resposta => {
            return resposta;
        })
        .catch(httpError => {
            return opcoes.catch(httpError);
        });
    }

    public put<T>(opcoes:MDBHttp, objeto: any, id: number): Observable<T> {
        opcoes.addHeader(this.ACSNomeHeader,opcoes.nivelAcs.descricao);
        return this.http
            .put<T>(opcoes.url + '/'+ id, JSON.stringify(objeto),opcoes.options).map(resposta => {
                return resposta;
            })
            .catch(httpError => {
                return opcoes.catch(httpError);
            });
    }

    public delete<T>(opcoes:MDBHttp, id: number): Observable<T> {
        opcoes.addHeader(this.ACSNomeHeader,opcoes.nivelAcs.descricao);
        return this.http.delete<T>(opcoes.url + '/'+id,opcoes.options).map(resposta => {
            return resposta;
        })
        .catch(httpError => {
            return opcoes.catch(httpError);
        });;
    }

    public getRecursoAssets<T>(caminho): Observable<T> {
      return this.http.get<T>('assets/' + caminho );
    }

    public salvar(ehEdicao: boolean, opcoes:MDBHttp, entidade: any ): Observable<any> {
        const traducao = MDB.util.traducao.mdbComponentes;
        const mensagem = this.prepararMensagem(opcoes.mensagem, ehEdicao);
        opcoes.url =  opcoes.url + '/salvar';
        opcoes.nivelAcs = ehEdicao ? ACSPermissoes.alterar : ACSPermissoes.incluir;
        return this.post(opcoes, entidade)
                    .map(resposta => {
                        this.servicoMensagem.addSucesso(mensagem.titulo,mensagem.sucesso);
                        return resposta;
                    })
                    .catch(httpError => {
                        return opcoes.catch(httpError);
                    });
    }

    public salvarLista<T>(ehEdicao: boolean, opcoes:MDBHttp, lista: Array<T>): Observable<any> {
        const traducao = MDB.util.traducao.mdbComponentes;
        const mensagem = this.prepararMensagem(opcoes.mensagem);
        opcoes.url =  opcoes.url + '/salvar-lista';
        opcoes.nivelAcs = ehEdicao ? ACSPermissoes.alterar : ACSPermissoes.incluir;
        return this.post(opcoes, lista)
                    .map(resposta => {
                        this.servicoMensagem.addSucesso(mensagem.titulo,mensagem.sucesso);
                        return resposta;
                    })
                    .catch(httpError => {
                        return opcoes.catch(httpError);
                    });
    }

    public deletar<T>(opcoes:MDBHttp, entidade: any, id:any): Observable<any> {
        opcoes.nivelAcs = ACSPermissoes.excluir;
        opcoes.url =  opcoes.url + '/deletar';
        return this.delete(opcoes, id).map(resposta => {
            this.servicoMensagem.addSucesso(opcoes.mensagem.titulo,opcoes.mensagem.sucesso);
            return resposta;
        })
        .catch(httpError => {
            return opcoes.catch(httpError);
        });
    }

    public deletarPorObjeto<T>(opcoes:MDBHttp, entidade: any): Observable<any> {
        opcoes.nivelAcs = ACSPermissoes.excluir;
        opcoes.url =  opcoes.url + '/deletar';
        return this.post(opcoes, entidade).map(resposta => {
            this.servicoMensagem.addSucesso(opcoes.mensagem.titulo,opcoes.mensagem.sucesso);
            return resposta;
        })
        .catch(httpError => {
            return opcoes.catch(httpError);
        });
    }

    public consultarPorId<T>(opcoes:MDBHttp, entidade: any, id:any): Observable<T> {
        opcoes.nivelAcs = ACSPermissoes.consultar;
        opcoes.url =  opcoes.url + '/consultar/'+id;
        return this.get(opcoes)
            .map(resposta => {
                return resposta;
            })
            .catch(httpError => {
                return opcoes.catch(httpError);
            });
    }

    public consultarPorObjeto<T>(opcoes:MDBHttp, entidade: any): Observable<T> {
        opcoes.nivelAcs = ACSPermissoes.consultar;
        opcoes.url =  opcoes.url + '/consultar';
        return this.post(opcoes, entidade).map(resposta => {
            return resposta;
        })
        .catch(httpError => {
            return opcoes.catch(httpError);
        });
    }

    public consultarPaginado<T>(opcoes:MDBHttp, entidade: T) {
        opcoes.nivelAcs = ACSPermissoes.consultar;
        opcoes.url =  opcoes.url + '/filtro';
        const jsonEntidade = JSON.stringify(entidade);
        return this.http.post<T>(opcoes.url, jsonEntidade, opcoes.options).map(resposta =>{
            return resposta;
        })
        .catch(httpError => {
            return opcoes.catch(httpError);
        });
    }

    public consultarTodos<T>(opcoes:MDBHttp): Observable<T> {
        opcoes.nivelAcs = ACSPermissoes.consultar;
        opcoes.url =  opcoes.url + '/consultar-todos';
        return this.get(opcoes).map(resposta =>{
            return resposta;
          })
          .catch(httpError => {
            return opcoes.catch(httpError);
        });;
    }

    private prepararMensagem(mensagem: MdbMensagemHttp , ehEdicao: boolean = false) {
        const traducao = MDB.util.traducao.mdbComponentes;
        mensagem.sucesso = mensagem.sucesso ? mensagem.sucesso : traducao.operacao.sucesso.salvar;
        if (ehEdicao) {
            mensagem.sucesso =  traducao.operacao.sucesso.editar;
        }
        return mensagem;
    }

    public gerarRelatorio() {

    }
}