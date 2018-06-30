import { HttpClient, HttpParams, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Pageable } from './../../modelo/pageable';
import { MDB} from '../../util/mdb';
import { MDBHttp } from './mdb-http';
import { MdbMensagemHttp } from './mdb-mensagem-http';

@Injectable()
export class MdbHttpServico {

	constructor(private http: HttpClient) {}

	public get<T>(opcoes:MDBHttp): Observable<T> {
		return this.http.get<T>(opcoes.url,opcoes.options)
		.pipe(
		  map(res => res), 
		  catchError((httpError) => {
				return opcoes.catch(httpError);
		  })
		);
	}

	public post<T>(opcoes:MDBHttp, objeto: any): Observable<T>{
		const toAdd = objeto;
		return this.http.post<T>(opcoes.url,toAdd,opcoes.options)
		.pipe(
		  map(res => res), 
		  catchError((httpError) => {
				return opcoes.catch(httpError);
		  })
		);
	}

	public put<T>(opcoes:MDBHttp, objeto: any, id: number): Observable<T> {
		return this.http.put<T>(opcoes.url + '/'+ id, JSON.stringify(objeto),opcoes.options)
		.pipe(
		  map(res => res), 
		  catchError((httpError) => {
				return opcoes.catch(httpError);
		  })
		);
	}

	public delete<T>(opcoes:MDBHttp, id: number): Observable<T> {
		return this.http.put<T>(opcoes.url + '/'+id,opcoes.options)
		.pipe(
		  map(res => res), 
		  catchError((httpError) => {
				return opcoes.catch(httpError);
		  })
		);
	}

	public getRecursoAssets<T>(caminho): Observable<T> {
		return this.http.get<T>('assets/' + caminho );
	}

	public salvar(rest: string, ehEdicao: boolean, entidade: any, mensagem: MdbMensagemHttp = new MdbMensagemHttp()): Observable<any> {
		const msg = this.prepararMensagem(mensagem);
		const opcoes:MDBHttp = new MDBHttp((rest + '/salvar'));

		return this.post(opcoes, entidade)
		.pipe(
			map((resposta) => {
				MDB.servicos().mensagem.addSucesso(msg.titulo,msg.sucesso);
				return resposta;
			}), 
		  catchError((httpError) => {
				return opcoes.catch(httpError);
		  })
		);
	}

	public salvarLista(rest: string, ehEdicao: boolean, lista: Array<any>, mensagem: MdbMensagemHttp = new MdbMensagemHttp()): Observable<any> {
		const msg = this.prepararMensagem(mensagem);
		const opcoes:MDBHttp = new MDBHttp((rest + '/salvar'));

		return this.post(opcoes, lista)
		.pipe(
			map((resposta) => {
				MDB.servicos().mensagem.addSucesso(msg.titulo, msg.sucesso);
				return resposta;
			}), 
		  catchError((httpError) => {
				return opcoes.catch(httpError);
		  })
		);
	}

	public deletar(rest: string, id:any, mensagem: MdbMensagemHttp = new MdbMensagemHttp()): Observable<any> {
		const msg = this.prepararMensagem(mensagem);
		const opcoes:MDBHttp = new MDBHttp((rest + '/deletar'));

		return this.delete(opcoes, id)
		.pipe(
			map((resposta) => {
				MDB.servicos().mensagem.addSucesso(msg.titulo, msg.sucesso);
				return resposta;
			}), 
		  catchError((httpError) => {
				return opcoes.catch(httpError);
		  })
		);
	}

	public deletarPorObjeto(rest: string, entidade: any, mensagem: MdbMensagemHttp = new MdbMensagemHttp()): Observable<any> {
		const opcoes:MDBHttp = new MDBHttp((rest + '/deletar'));

		return this.post(opcoes, entidade)
		.pipe(
			map((resposta) => {
				MDB.servicos().mensagem.addSucesso(opcoes.mensagem.titulo,opcoes.mensagem.sucesso);
				return resposta;
			}), 
		  catchError((httpError) => {
				return opcoes.catch(httpError);
		  })
		);
	}

	public consultarPorId<T>(rest: string, id:any, mensagem: MdbMensagemHttp = new MdbMensagemHttp()): Observable<T> {
		const msg = this.prepararMensagem(mensagem);
		const opcoes:MDBHttp = new MDBHttp((rest + '/consultar/'+id));
		return this.get<T>(opcoes)
		.pipe(
			map((resposta) => {
				return resposta;
			}), 
		  catchError((httpError) => {
				return opcoes.catch(httpError);
		  })
		);
	}

	public consultarPorObjeto<T>(rest: string, entidade:T): Observable<T> {
		const opcoes:MDBHttp = new MDBHttp((rest + '/consultar'));
		return this.post<T>(opcoes, entidade)
		.pipe(
			map((resposta) => {
				return resposta;
			}), 
		  catchError((httpError) => {
				return opcoes.catch(httpError);
		  })
		);
	}

	public consultarPaginado<T>(rest: string, entidade:any, parametros: HttpParams): Observable<Pageable<T>> {
		const opcoes:MDBHttp = new MDBHttp((rest + '/filtro'));
		const jsonEntidade = JSON.stringify(entidade);

		return this.http.post<Pageable<T>>(opcoes.url, jsonEntidade,{params:parametros})
		.pipe(
			map((resposta) => {
				return resposta;
			}), 
		  catchError((httpError) => {
				return opcoes.catch(httpError);
		  })
		);
	}

	public consultarTodos<T>(rest: string): Observable<Array<T>> {
		const opcoes:MDBHttp = new MDBHttp((rest + '/consultar-todos'));
		return this.get<Array<T>>(opcoes)
		.pipe(
			map((resposta) => {
				return resposta;
			}), 
		  catchError((httpError) => {
				return opcoes.catch(httpError);
		  })
		);
	}

	private prepararMensagem(mensagem: MdbMensagemHttp , ehEdicao: boolean = false) {
		const traducao = MDB.util().traducao.mdbComponentes;
		mensagem.sucesso = mensagem.sucesso ? mensagem.sucesso : traducao.operacao.sucesso.salvar;
		if (ehEdicao) {
				mensagem.sucesso =  traducao.operacao.sucesso.editar;
		}
		return mensagem;
	}
}
