import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operator/timeout';
import { Usuario } from '../../../modelo';
import { MdbServico } from '../../servicos/mdb-servico';
import {Aplicacao} from '../../inicializacao/aplicacao'

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.scss']
})

export class AutenticacaoComponent implements OnInit, AfterViewInit {

  constructor(public mdbServico: MdbServico,
              public router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.jaLogou()) {
      this.router.navigateByUrl(Aplicacao.Instance().inicializacao.rotaInicio);
    } else {
      this.autenticar();
    }
  }

  private jaLogou(): boolean {
    return Boolean (this.mdbServico.usuarioLogado && this.mdbServico.usuarioLogado.token) ;
  }

  private autenticar() {
    this.mdbServico.post<any>('seguranca/login').subscribe((autenticacao) => {
      if ( autenticacao.token ) {
        this.mdbServico.usuarioLogado = new Usuario({token: autenticacao.token});

        this.mdbServico.usuario().subscribe( usuarioAutenticado => {
          this.mdbServico.usuarioLogado = usuarioAutenticado;
        });

        setTimeout(() => {
          this.router.navigateByUrl(Aplicacao.Instance().inicializacao.rotaInicio);
        }, 1500);
      }
    });
  }

}
