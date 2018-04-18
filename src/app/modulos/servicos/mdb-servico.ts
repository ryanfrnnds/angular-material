import 'rxjs/add/operator/map';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Aplicacao } from '../';
import { Usuario } from '../../modelo';

@Injectable()
export class MdbServico {

    public	usuarioLogado: Usuario;

    constructor(private http: HttpClient) {}

    public get<T>(rest): Observable<T> {
        return this.http.get<T>(this.formarUrl(rest));
    }

    public post<T>(rest, objeto: T = null): Observable<T> {
        const toAdd = JSON.stringify(objeto);
        return this.http.post<T>(this.formarUrl(rest), toAdd);
    }

    public put<T>(rest, id: number, itemToUpdate: any): Observable<T> {
        return this.http
            .put<T>(this.formarUrl(rest) + id, JSON.stringify(itemToUpdate));
    }

    public delete<T>(rest, id: number): Observable<T> {
        return this.http.delete<T>(this.formarUrl(rest) + id);
    }

    public getRecursoAssets<T>(caminho): Observable<T> {
      return this.http.get<T>('/assets/' + caminho );
    }

    public salvarOuAtualizar<T>(rest, entidade: T) {
        const url = rest + '/salvar';
        this.post(url, entidade);
    }

    public deletar<T>(rest, id, entidade: T) {
        const url = rest + '/deletar';
        this.delete(url, id);
    }

    public deletarPorObjeto<T>(rest, entidade: T) {
      const url = rest + '/deletar';
        this.post(url, entidade);
    }

    public consultarPorId(rest, id) {
        const url = rest + '/consultar/';
        this.get(rest + id);
    }

    public consultarPorObjeto<T>(rest, entidade: T) {
        const url = rest + '/consultar';
        this.post(rest, entidade);
    }

    public consultarTodos<T>(rest) {
        const url = rest + '/consultar-todos';
        this.get(url);
    }

    public filtrar<T>(rest, entidade: T, params?: HttpParams) {
        const url = this.formarUrl(rest);
        const jsonEntidade = JSON.stringify(entidade);
        return this.http.post<T>(url, jsonEntidade, {params: params});
    }

    private formarUrl(rest) {
        return Aplicacao.Instance().inicializacao.urlServidor + '/' + rest;
    }

    public usuario(): Observable<Usuario> {
        return this.get('seguranca/usuario');
    }

    public deslogar() {
        if (this.jaLogou()) {
            return this.get('seguranca/logout');
        }
    }

    private jaLogou(): boolean {
        return Boolean (this.usuarioLogado && this.usuarioLogado.token) ;
      }
}

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        return next.handle(req);
    }
}
