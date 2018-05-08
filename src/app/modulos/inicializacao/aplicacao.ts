import { HttpClient } from '@angular/common/http';
import { Inicializacao } from '../../modelo/inicializacao';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material';
import { Usuario } from '../../modelo';


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
}
