import { Routes } from "@angular/router";
import { MDBAutenticacaoComponent } from "../modulos/seguranca/autenticacao/mdb-autenticacao.component";

export class MdbRoutes {
    static forRoot(): Routes {
        return [
            { path: 'autenticar', component: MDBAutenticacaoComponent }
        ];
    }
}