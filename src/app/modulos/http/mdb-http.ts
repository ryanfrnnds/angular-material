import { HttpHeaders, HttpParams } from "@angular/common/http";
import { MDB } from "../../util/mdb";
import { throwError, Observable, of } from "rxjs";
import { TipoResposta } from "./tipo-resposta";
import { MdbMensagemHttp } from "./mdb-mensagem-http";
import { MdiasAppService } from "../mdias-app/mdias-app.service";

export class MDBHttp {
    public mostraError: boolean = true;
    public mensagem: MdbMensagemHttp = new MdbMensagemHttp();
    public headers: HttpHeaders = new HttpHeaders();
    public params: HttpParams;
    public reportProgress: boolean;
    public withCredentials: boolean;
    public responseType: any = 'json';
    public observe?:any = 'body';

    constructor
    (

			  private rest: string
			, parametros: Partial<MDBHttp> = null
		)
				{
			if (parametros) {
				Object.assign(this, parametros);
			}
			this.rest = rest;
		}

    public get options(): {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    } {
        return  {
            headers: this.headers,
            observe: this.observe,
            params: this.params,
            reportProgress: this.reportProgress,
            responseType: this.responseType,
            withCredentials: this.withCredentials
        }
    }

    public get url(): string {
        if(this.rest){
            return MDB.contexto().urlServidor + '/' + this.rest;
        }
        return MDB.contexto().urlServidor;
    }

    public set url(url: string) {
        if(this.rest){
            this.rest = MDB.contexto().urlServidor + '/' + url;
        }
        this.rest = MDB.contexto().urlServidor;
    }

    public catch(httpError: any): Observable<never> {
        if(this.mostraError){
            return throwError(this.error(httpError, this.mensagem));
        } else {
            return throwError(httpError);
        }
    }

    public addHeader(nome: string , value: string | string[]) {
        if(value) {
            this.headers = this.headers ? this.headers : new HttpHeaders();
            this.headers = this.headers.append(nome,value);
        }
    }

    public error(httpError, mensagem: MdbMensagemHttp = new MdbMensagemHttp()): any {
        if(MDB) {
            let tituloError = mensagem.titulo ? mensagem.titulo : '';
            let mensagemError = mensagem.falha ? mensagem.falha : MDB.util().buscarValor(httpError, 'error.mensagem');
            mensagemError = mensagemError ? mensagemError : MDB.util().buscarValor(httpError, 'error.message');
            mensagemError = mensagemError ? mensagemError : MDB.util().buscarValor(httpError, 'message');
            if(httpError.status === 0 && !mensagemError) {
                mensagemError = 'Servidor offline';
            }

            if(httpError.status === TipoResposta.AUTENTICACAO.status) {
              MDB.servicos().mensagem.limparMensagem();
              MDB.servicos().mensagem.addInformacao(MDB.util().traduzir('mdbComponentes.autenticacao.titulo'),MDB.util().traduzir('mdbComponentes.autenticacao.reautenticando'));
              MDB.autenticar(3000);
            }
            else {
              MDB.servicos().mensagem.limparMensagem();
              MDB.servicos().mensagem.addErro(tituloError,mensagemError);
            }
            return httpError;
        }
    }
}
