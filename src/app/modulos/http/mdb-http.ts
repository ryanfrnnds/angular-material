import { MensagemOperacao } from "../servicos/mdb-mensagem-operacao";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { ACSPermissoes } from "../acs/mdb-acs";
import { MDB } from "../../util/mdb";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { TipoResposta } from "./tipo-resposta";

export class MDBHttp {
    public mostraError: boolean = true;
    public mensagem: MensagemOperacao = new MensagemOperacao();
    public headers: HttpHeaders = new HttpHeaders();
    public params: HttpParams;
    public reportProgress: boolean;
    public withCredentials: boolean;
    public responseType: any = 'json';
    public observe?:any = 'body';

    constructor
    (
        private rest: string, 
        public nivelAcs: ACSPermissoes
        , parametros: Partial<MDBHttp> = null) {
        if (parametros) {
          Object.assign(this, parametros);
        }
        this.rest = rest;
      }

    public get options() {
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
            return MDB.urlServidor + '/' + this.rest;
        } 
        return MDB.urlServidor;
    }

    public set url(url: string) {
        if(this.rest){
            this.rest = MDB.urlServidor + '/' + url;
        } 
        this.rest = MDB.urlServidor;
    }

    public catch(httpError: any) {
        if(this.mostraError){
            return ErrorObservable.create(this.error(httpError, this.mensagem));
        } else {
            return ErrorObservable.create(httpError);
        }
    }

    public addHeader(nome: string , value: string | string[]) {
        if(value) {
            this.headers = this.headers ? this.headers : new HttpHeaders();
            this.headers = this.headers.append(nome,value);
        }
    }

    public error(httpError, mensagem: MensagemOperacao = new MensagemOperacao()): any {
        if(MDB) {
            let tituloError = mensagem.titulo ? mensagem.titulo : '';
            let mensagemError = mensagem.falha ? mensagem.falha : MDB.buscarValor(httpError, 'error.mensagem');
            mensagemError = mensagemError ? mensagemError : 'Servidor offline';
    
           if(httpError.status === TipoResposta.NAO_AUTORIZADO.status) {
                MDB.decidirRota(TipoResposta.NAO_AUTORIZADO);
           } else {
                MDB.mensageria.limparMensagem();
                MDB.mensageria.addErro(tituloError,mensagemError);
           }
            return httpError;
        }
    }
}
