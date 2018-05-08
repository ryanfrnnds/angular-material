
import { FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { UrlSegment, Router, ActivatedRoute } from '@angular/router';
import { MdbServico } from '../servicos/mdb-servico';
import { MensagensService } from '../mensagens/mensagens.service';
import { I18n } from '../../i18n';
import { ObjetoUtilitario } from '../../util/objeto-utilitario';

export class MDBComponente {
  private traducao: any;

  public onPesquisar = new EventEmitter<any>();
  public onAdicionarEmLista = new EventEmitter<any>();
  public onSalvar = new EventEmitter<any>();
  public onEdicaoLista = new EventEmitter<any>();
  public indiceItemEdicao: number;
  public ehCarregando: boolean = false;

  constructor(
    public rota: Router
  , public rotaAtiva: ActivatedRoute
  , public mdbServico: MdbServico
  , public servicoMensagem: MensagensService
  , public formBuilder: FormBuilder
  ) {
    this.traducao = I18n.Instance().traducao;
  }

  public traduzir(chave: string , parametros: any = null): string {
    if (chave) {
      let texto: string = ObjetoUtilitario.Instance().buscarValor(this.traducao,chave);
      if (parametros) {
        for (const key in parametros) {
          if (parametros.hasOwnProperty(key)) {
            const item = parametros[key];
            texto = texto.replace(new RegExp('{{' + key + '}}', 'g'), item);
          }
        }
      }
      return texto;
    }
    return '';
  }

  public resetar( formulario ) {
    for (const key in  formulario.controls) {
      if (formulario.controls.hasOwnProperty(key)) {
        const control: any = formulario.controls[key];
        if (control.controls) {
          this.resetar(control);
        } else {
          control.setValue(undefined);
          control.markAsUntouched();
        }
      }
    }
  }

  public marcarComoTocado( formulario ) {
    for (const key in  formulario.controls) {
      if (formulario.controls.hasOwnProperty(key)) {
        const control: any = formulario.controls[key];
        if (control.controls) {
          this.marcarComoTocado(control);
        } else {
          control.markAsTouched();
        }
      }
    }
  }

  public marcarComoNaoTocado( formulario ) {
    for (const key in  formulario.controls) {
      if (formulario.controls.hasOwnProperty(key)) {
        const control: any = formulario.controls[key];
        if (control.controls) {
          this.marcarComoNaoTocado(control);
        } else {
          control.markAsUntouched();
        }
      }
    }
  }

  public navegarPara(path) {
    this.rotaAtiva.url.subscribe(urlSegment => {
      const pathDeSaida = this.formarUrl(urlSegment);
      const idConfig: number = this.rota.config.findIndex(rota => rota.path === pathDeSaida);
      this.rota.navigate([path], {queryParams : {idConfigRota: idConfig}});
    });
  }

  private formarUrl(lista: UrlSegment[]): string {
    let url = '';
    lista.forEach((urlSegment, indice) => {
      if (lista.length > 1 && indice < (lista.length - 1) ) {
        url += urlSegment.path + '/';
      } else {
        url += urlSegment.path;
      }
    });
    return url;
  }

  public adicionarEmLista<T>(item: T, formulario: AbstractControl = null) {
    if (formulario == null || formulario === undefined || formulario.valid) {
      this.onAdicionarEmLista.emit({item: item});
      this.onAdicionarEmLista = new EventEmitter();
    } else {
      this.marcarComoTocado(formulario);
    }
  }

  public salvar(itemASalvar: any, formulario: AbstractControl = null) {
    if (formulario == null || formulario === undefined || formulario.valid) {
      this.onSalvar.emit(itemASalvar);
      this.onSalvar = new EventEmitter();
    } else {
      this.marcarComoTocado(formulario);
    }
    }

  public error(control: AbstractControl, error: string = 'required', msgError: string = 'mdbComponentes.erro.obrigatoriedade') {
    return control.hasError(error) ? this.traduzir(msgError) : '';
  }

  public edicaoEmLista( lista, indice) {
    this.indiceItemEdicao = indice;
    this.onEdicaoLista.emit({item: lista[indice] });
    this.onEdicaoLista = new EventEmitter();
  }

  public cancelarEdicaoEmLista (formulario: AbstractControl = null) {
    this.indiceItemEdicao = undefined ;
    if (formulario) {
      this.resetar(formulario);
    }
  }

  public limparControle (controle: AbstractControl) {
    controle.reset();
  }

  public pesquisar(formulario: AbstractControl = null) {
    if (formulario == null || formulario === undefined || formulario.valid) {
      this.ehCarregando = true;
      this.onPesquisar.emit({});
      this.onPesquisar = new EventEmitter<any>();
    } else {
      this.marcarComoTocado(formulario);
    }
  }

  public seEditandoLista(): boolean {
    return this.indiceItemEdicao != null || this.indiceItemEdicao !== undefined;
  }
}
