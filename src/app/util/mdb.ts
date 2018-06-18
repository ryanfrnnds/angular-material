import { MdbMensagemServico } from '../modulos/mensagens/mensagens.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MdbHttpServico } from '../modulos/http/mdb-http.servico';
import { Usuario } from '../modelo/usuario';
import { MenuItem } from '../modelo/menu-item';
import { FormBuilder } from '@angular/forms';
import { I18n } from '../i18n';
import { TipoResposta } from '../modulos/http/tipo-resposta';

import { Observable } from 'rxjs/Observable';
import { MDBHttp } from '../modulos/http/mdb-http';
import { ACSPermissoes } from '../modulos/acs/permissoes';
import { HttpClient } from '@angular/common/http';

export class MDB {
  private static singleton: MDB = null;
  private _contexto: Contexto;
  private _angular: Angular;
  private _util: Util;
  private _servicos: Servicos;

  private inciado: Observable<boolean>;

	private constructor() {}

    public static incializar(
      dependencias:
      {
        angular:
          {
            router: Router, 
            activatedRoute: ActivatedRoute, 
            formBuilder: FormBuilder
          }
        ,servicos:
          {
            mensagem: MdbMensagemServico, 
            http: MdbHttpServico
          }
        ,contexto:
          {
            rotaInicio: string, 
            urlServidor: string, 
            nomeSistema: string,
            confI18n?: string
          }
      }, httpClient: HttpClient): MDB {
      
      if (this.singleton == null) {
        this.singleton = new MDB();
        this.singleton._contexto = new Contexto();
        this.singleton._util = new Util( I18n.Instance(dependencias.contexto.confI18n).traducao, dependencias.angular.router);
      }
      if(dependencias){
        const referenciaLingua: string = dependencias.contexto.confI18n ? dependencias.contexto.confI18n : 'pt-BR';
        this.singleton.inciado = httpClient.get<any>('assets/i18n/' + referenciaLingua + '.json').map( (traducaoAplicacao) => {
          if (traducaoAplicacao) {
            Object.assign(this.singleton._util.traducao, traducaoAplicacao);
          }
          return true;
        });
        this.singleton._angular = {
          router: dependencias.angular.router,
          activatedRoute: dependencias.angular.activatedRoute,
          formBuilder: dependencias.angular.formBuilder
        };

        this.singleton._servicos = {
          http: dependencias.servicos.http,
          mensagem: dependencias.servicos.mensagem
        };
        this.singleton._contexto.nomeSistema = dependencias.contexto.nomeSistema;
        this.singleton._contexto.urlServidor = dependencias.contexto.urlServidor;
        this.singleton._contexto.rotaInicio = dependencias.contexto.rotaInicio;
      }

      if(!this.singleton._contexto.possuiLoguin()) {
        this.singleton._angular.router.navigateByUrl(this.singleton._contexto.rotaInicio);
      }
      this.singleton.inciado.subscribe();
      return this.singleton;
	}

  static get contexto(): Contexto {
    if(this.singleton) {
      return MDB.singleton._contexto;
    }
    return null;
  }

  public static get servicos(): Servicos {
    if(this.singleton) {
      return this.singleton._servicos;
    } else {
      return null;
    }
  }

  public static get angular(): Angular {
    if(this.singleton) {
      return this.singleton._angular;
    } else {
      return null;
    }
  }

  public static get util(): Util {
    if(this.singleton) {
      return this.singleton._util;
    } else {
      return null;
    }
  }

  public static iniciado(): Observable<boolean> {
    return MDB.singleton.inciado.map(iniciado => {
      return iniciado
    });
  }
}


export class MDBLocalStorage {
    public usuario: Usuario = new Usuario();
    public menu: MenuItem[] = [];
    public tipoResposta: TipoResposta = TipoResposta.OK;

    constructor(parametros: Partial<MDBLocalStorage> = null) {
      if (parametros) {
        Object.assign(this, parametros);
      }
    }
}

export interface Servicos {
  mensagem: MdbMensagemServico;
  http: MdbHttpServico;
}

export interface Angular {
  router: Router;
  activatedRoute: ActivatedRoute;
  formBuilder: FormBuilder;
}

export class Contexto {
  nomeSistema: string;
  urlServidor: string;
  rotaInicio: string;
  // localStorage: MDBLocalStorage;
  set browser(storage: MDBLocalStorage){
    localStorage.setItem(this.nomeSistema,JSON.stringify(storage));
  }

  get browser(): MDBLocalStorage{
    return JSON.parse(localStorage.getItem(this.nomeSistema));
  }

  constructor(){};

  possuiLoguin(): boolean {
    const contexto = JSON.parse(localStorage.getItem(this.nomeSistema))
    const token = MDB.util.buscarValor(contexto, 'usuario.token');
    if(token){
      return true;
    }
	}
}

export class Util {

  constructor(public traducao, private rota: Router){};

  traduzir(chave: string , parametros: any = null): string {
    if (chave) {
      let texto: string = this.buscarValor(this.traducao,chave);
      if (parametros && texto) {
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

  buscarValor(item: any, atributo: any, retornoDefault = null) {
		if (item && atributo) {
			if (atributo.indexOf('.') === -1) {
				return item[atributo] ? item[atributo] : retornoDefault;
			} else {
				const fields: string[] = atributo.split('.');
				let value = item;
				for (let i = 0, len = fields.length; i < len; ++i) {
					if (value == null) {
						return retornoDefault;
					}
					value = value[fields[i]];
				}
				return value ? value : retornoDefault;
			}
		} else {
			return retornoDefault;
		}
  }

  irParaInicio(): void {
    this.rota.navigateByUrl(MDB.contexto.rotaInicio);
  }
  
  decidirRota(tipoResposta: TipoResposta) {
    if(tipoResposta.id === TipoResposta.SEM_MENU_ACS.id){
      MDB.angular.router.navigateByUrl(MDB.contexto.rotaInicio);
    }

    if(tipoResposta.id === TipoResposta.NAO_AUTORIZADO.id){
      MDB.servicos.mensagem.limparMensagem();
      MDB.servicos.mensagem.addInformacao(tipoResposta.titulo,tipoResposta.mensagem);
      MDB.angular.router.navigateByUrl('/autenticar');
    }
  }
}
