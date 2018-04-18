import { HttpClient } from '@angular/common/http';
import { Inicializacao } from '../../modelo/inicializacao';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material';


export class Aplicacao {
    private static singleton: Aplicacao = null;
    public inicializacao: Inicializacao;

    private constructor() {}

    public static incializar(inicializacao: Inicializacao): Aplicacao {
        if (this.singleton == null) {
            this.singleton = new Aplicacao();
        }
        this.singleton.inicializacao = inicializacao;
        return this.singleton;
    }

    public static Instance(): Aplicacao {
        if (this.singleton == null) {
            this.singleton = new Aplicacao();
        }
        return this.singleton;
    }
/*
    public static provedoresDoCalendario(): any {
        return [
            {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
            {provide: DateAdapter, useClass: NativeDateAdapter, deps: [MAT_DATE_LOCALE]},
            {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}
          ];
    }
    */
}
