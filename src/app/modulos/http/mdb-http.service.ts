import { HttpErrorResponse } from '@angular/common/http';
import { ExcecaoHttpService } from './excecao-http.service';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {tap } from 'rxjs/operators';

import { Pageable } from '../../modelo/pageable';
import { MDB} from '../../util/mdb';
import { MDBHttp } from './mdb-http';
import { MdbMensagemHttp } from './mdb-mensagem-http';

@Injectable({providedIn: 'root'})
export class MdbHttpService {

  constructor(private http: HttpClient,
              private excecaoHttpService: ExcecaoHttpService) {}

	private error(opcoes:MDBHttp, error: HttpErrorResponse) {
		this.mostrarLoading(false);
    	this.excecaoHttpService.decidirFluxo(error, opcoes);
	}

	private sucesso(opcoes:MDBHttp) {
		this.mostrarLoading(false);
	}

	private sucessoGenericos(opcoes:MDBHttp) {
		this.mostrarLoading(false);
		if(opcoes.mostrarMensagem) {
			MDB.servicos().mensagem.addSucesso(opcoes.mensagem.titulo,opcoes.mensagem.sucesso);
		}
	}

	private mostrarLoading(flag: boolean) {
		if(MDB.servicos().loading.porRequisicao) {
			MDB.servicos().loading.mostrar = flag;
		} else {
			MDB.servicos().loading.mostrar = false;
		}
	}

	public get<T>(opcoes:MDBHttp): Observable<T> {
		this.mostrarLoading(true);
		return this.http.get<T>(opcoes.url,opcoes.options)
		.pipe(
			tap(
        sucesso => {
					this.sucesso(opcoes);
        },
        error => {
					this.error(opcoes,error);
        }
      )
		);
	}

	public post<T>(opcoes:MDBHttp, objeto: any): Observable<T>{
		const toAdd = objeto;
		this.mostrarLoading(true);
		return this.http.post<T>(opcoes.url,toAdd,opcoes.options)
		.pipe(
			tap(
        sucesso => {
					this.sucesso(opcoes);
        },
        error => {
					this.error(opcoes,error);
        }
      )
		);
	}

	public put<T>(opcoes:MDBHttp, objeto: any, id: number): Observable<T> {
		this.mostrarLoading(true);
		return this.http.put<T>(opcoes.url + '/'+ id, JSON.stringify(objeto),opcoes.options)
		.pipe(
			tap(
        sucesso => {
					this.sucesso(opcoes);
        },
        error => {
					this.error(opcoes,error);
        }
      )
		);
	}

	public delete<T>(opcoes:MDBHttp, id: number): Observable<T> {
		this.mostrarLoading(true);
		return this.http.delete<T>(opcoes.url + '/'+id,opcoes.options)
		.pipe(
			tap(
        sucesso => {
					this.sucesso(opcoes);
        },
        error => {
					this.error(opcoes,error);
        }
      )
		);
	}

	public getRecursoAssets<T>(caminho): Observable<T> {
		return this.http.get<T>('assets/' + caminho );
	}

	public salvar(rest: string, entidade: any, mdbHttp: MDBHttp = new MDBHttp('')): Observable<any> {
		const opcoes:MDBHttp = new MDBHttp((rest + '/salvar'));
		opcoes.mensagem.sucesso = this.mensagemSucesso(mdbHttp.mensagem, EnumMetodo.SALVAR);

		return this.post(opcoes, entidade)
		.pipe(
			tap(
				() => {
					this.sucessoGenericos(opcoes);
				},
       	error => {
					this.error(opcoes,error);
				}
			)
		);
	}

	public salvarLista(rest: string, lista: Array<any>, mensagem: MdbMensagemHttp = new MdbMensagemHttp()): Observable<any> {
		const opcoes:MDBHttp = new MDBHttp((rest + '/salvar/lista'));
		opcoes.mensagem.sucesso = this.mensagemSucesso(opcoes.mensagem, EnumMetodo.SALVAR);
		return this.post(opcoes, lista)
		.pipe(
			tap(
				() => {
					this.sucessoGenericos(opcoes);
				},
				error => {
         this.error(opcoes,error);
				 }
			)
		);
	}

	public deletar(rest: string, id:any, mensagem: MdbMensagemHttp = new MdbMensagemHttp()): Observable<any> {
		const opcoes:MDBHttp = new MDBHttp((rest + '/deletar'));
		opcoes.mensagem.sucesso = this.mensagemSucesso(opcoes.mensagem, EnumMetodo.DELETAR);

		return this.delete(opcoes, id)
		.pipe(
			tap(
				() => {
					this.sucessoGenericos(opcoes);
				},
				error => {
					this.error(opcoes,error);
				}
			)
		);
	}

	public deletarPorObjeto(rest: string, entidade: any, mensagem: MdbMensagemHttp = new MdbMensagemHttp()): Observable<any> {
		const opcoes:MDBHttp = new MDBHttp((rest + '/deletar'));
		opcoes.mensagem.sucesso = this.mensagemSucesso(opcoes.mensagem, EnumMetodo.DELETAR);

		return this.post(opcoes, entidade)
		.pipe(
			tap(
				() => {
					this.sucessoGenericos(opcoes);
				}, error => {
        this.error(opcoes,error);
				}
			)
		);
	}

	public consultarPorId<T>(rest: string, id:any): Observable<T> {
		const opcoes:MDBHttp = new MDBHttp((rest + '/consultar/'+id));
		return this.get<T>(opcoes)
		.pipe(
			tap
			(
				() => {},
				error => {
        	this.error(opcoes,error);
				}
			)
		);
	}

	public consultarPorObjeto<T>(rest: string, entidade:T): Observable<T> {
		const opcoes:MDBHttp = new MDBHttp((rest + '/consultar'));
		return this.post<T>(opcoes, entidade)
		.pipe(
			tap(
				() => {},
				error => {
        	this.error(opcoes,error);
				}
			)
		);
	}

	public consultarPaginado<T>(rest: string, entidade:any, parametros: HttpParams): Observable<Pageable<T>> {
    const opcoes:MDBHttp = new MDBHttp((rest + '/consultar/paginado'));
    opcoes.params = parametros;

    const jsonEntidade = JSON.stringify(entidade);

		return this.post<Pageable<T>>(opcoes, jsonEntidade)
		.pipe(
			tap(
				(resposta) => {
					return resposta;
				},
				error => {
        	this.error(opcoes,error);
				}
			)
	);
		}

	public consultarTodos<T>(rest: string): Observable<Array<T>> {
		const opcoes:MDBHttp = new MDBHttp((rest + '/consultar/todos'));
		return this.get<Array<T>>(opcoes)
		.pipe(
			tap(
				() => {},
				error => {
        	this.error(opcoes,error);
				}
			)
		);
	}

	private mensagemSucesso(mensagem: MdbMensagemHttp , enumMetodo: number): string {
		if(mensagem.sucesso) {
			return mensagem.sucesso;
		}
		const traducao = MDB.util().traducao.mdbComponentes;
    if (enumMetodo === EnumMetodo.SALVAR) {
      return traducao.operacao.sucesso.salvar;
    }
    if (enumMetodo === EnumMetodo.EDITAR) {
      return traducao.operacao.sucesso.editar;
    }
    if (enumMetodo === EnumMetodo.DELETAR) {
      return traducao.operacao.sucesso.deletar;
    }
	}
}

export class EnumMetodo {
	static SALVAR:number = 1
	static EDITAR:number = 2
	static DELETAR:number = 3
}
