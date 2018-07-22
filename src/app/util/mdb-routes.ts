import { Routes } from "@angular/router";
import { MDBAutenticacaoComponent } from "../modulos/seguranca/autenticacao/mdb-autenticacao.component";
import { AcessoNegadoComponent } from "../modulos/seguranca/autenticacao/acesso-negado/acesso-negado.component";

export class MdbRoutes {
    static forRoot(): Routes {
        return [
            { path: 'autenticar', component: MDBAutenticacaoComponent },
            { path: 'acessoNegado', component: AcessoNegadoComponent }
        ];
    }
}