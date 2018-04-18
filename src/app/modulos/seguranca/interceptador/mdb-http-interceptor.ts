import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { MdbServico } from '../..';


@Injectable()
export class MdbHttpInterceptor implements HttpInterceptor {

constructor(public mdbServico: MdbServico) { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  let authReq: HttpRequest<any>;
  let cabecalho: HttpHeaders = new HttpHeaders().append('Content-Type', 'application/json; charset=utf-8');

  if (this.mdbServico.usuarioLogado && this.mdbServico.usuarioLogado.token) {
    cabecalho = cabecalho.append('X-MDB_TOKEN', this.mdbServico.usuarioLogado.token);
}

  authReq = req.clone({headers: cabecalho});

  return next.handle(authReq).catch((error, caught) => {
  return Observable.throw(error);
  }) as any;
  }
}
