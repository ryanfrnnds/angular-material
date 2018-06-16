import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MDB } from '../../../util/mdb';



@Injectable()
export class AcessoAutenticado implements CanActivate {

    constructor(private rota: Router) {}
    public canActivate() {
        if(MDB.possuiLoguin()) {
            return true;
        }
        this.rota.navigateByUrl('/autenticar');
        return false;
    }
}
