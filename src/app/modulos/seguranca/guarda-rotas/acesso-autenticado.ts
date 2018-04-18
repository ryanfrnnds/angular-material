import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MdbServico } from '../..';



@Injectable()
export class AcessoAutenticado implements CanActivate {

    constructor(private mdbServico: MdbServico, private router: Router) {}

    public canActivate() {
        if (this.mdbServico.usuarioLogado && this.mdbServico.usuarioLogado.token) {
            return true;
        } else {
            this.router.navigateByUrl('autenticar');
        }
    }
}
