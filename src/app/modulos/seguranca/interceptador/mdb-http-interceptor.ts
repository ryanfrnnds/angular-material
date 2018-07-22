import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable,  SubscriptionLike as ISubscription, timer } from 'rxjs';
import { MDB } from '../../../util/mdb';
import { tap } from 'rxjs/operators';
import { TipoResposta } from '../../http/tipo-resposta';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class MdbHttpInterceptor implements HttpInterceptor {
constructor(private cookieService: CookieService) { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq: HttpRequest<any>;
    let cabecalho = req.headers ? req.headers.append('Content-Type', 'application/json; charset=utf-8') : new HttpHeaders().append('Content-Type', 'application/json; charset=utf-8');
    if (MDB.contexto().possuiLoguin()) {
      cabecalho = cabecalho.set('X-MDB_TOKEN', MDB.contexto().browser.usuario.token);
    }
    authReq = req.clone({headers: cabecalho});
    return next.handle(authReq).pipe(
      tap(
        sucesso => {},
        error => {
          if(error && error.status === TipoResposta.PERMISSAO_NEGADA_ACS.status) {
            MDB.angular().router.navigateByUrl('/acessoNegado');
          }
        }
      )
    );
  }
}
