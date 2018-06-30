import { MdbMensagemServico } from '../modulos/mensagens/mensagens.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MdbHttpServico } from '../modulos/http/mdb-http.servico';
import { Usuario } from '../modelo/usuario';
import { MenuItem } from '../modelo/menu-item';
import { FormBuilder } from '@angular/forms';
import { I18n } from '../i18n';
import { TipoResposta } from '../modulos/http/tipo-resposta';

import { Observable ,  SubscriptionLike as ISubscription } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

export class MDB {
  private static singleton: MDB = null;
  private _contexto: Contexto;
  private _angular: Angular;
  private _util: Util;
  private _servicos: Servicos;

  public static mostrarConteudo: boolean = true;

  public static inciado: Observable<boolean> = null;

	private constructor() {}

    public static incializar(
      dependencias:
      {
        angular:
          {
            router: Router,
            activatedRoute: ActivatedRoute,
            formBuilder: FormBuilder,
            location: Location
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

      if (MDB.singleton == null) {
        MDB.singleton = new MDB();
        MDB.singleton._contexto = new Contexto();
        MDB.singleton._util = new Util( I18n.Instance(dependencias.contexto.confI18n).traducao, dependencias.angular.router);
      }
      if(dependencias){
        const referenciaLingua: string = dependencias.contexto.confI18n ? dependencias.contexto.confI18n : 'pt-BR';
        MDB.inciado = httpClient.get<any>('assets/i18n/' + referenciaLingua + '.json').pipe(
          map( (traducaoAplicacao) => {
            if (traducaoAplicacao) {
              Object.assign(MDB.singleton._util.traducao, traducaoAplicacao);
            }
            return true;
          })
        );
        MDB.singleton._angular = {
          router: dependencias.angular.router,
          activatedRoute: dependencias.angular.activatedRoute,
          formBuilder: dependencias.angular.formBuilder,
          location: dependencias.angular.location
        };

        MDB.singleton._servicos = {
          http: dependencias.servicos.http,
          mensagem: dependencias.servicos.mensagem
        };
        MDB.singleton._contexto.nomeSistema = dependencias.contexto.nomeSistema;
        MDB.singleton._contexto.urlServidor = dependencias.contexto.urlServidor;
        MDB.singleton._contexto.rotaInicio = dependencias.contexto.rotaInicio;
      }
      MDB.util().irParaInicio();
      MDB.inciado.subscribe();
      return MDB.singleton;
  }

  static autenticar(delay: number = null) {
    if(MDB.singleton && MDB.singleton._contexto)  {
      const possuiLocalStorage = localStorage.getItem(MDB.singleton._contexto.nomeSistema) ? true : false;
      if(possuiLocalStorage) {
        localStorage.removeItem(MDB.singleton._contexto.nomeSistema);
      }
      if(delay) {
        MDB.mostrarConteudo = false;
        const subscription: ISubscription = timer(delay,delay).subscribe(() => {
          MDB.singleton._angular.router.navigateByUrl('autenticar');
          MDB.mostrarConteudo = true;
          subscription.unsubscribe();
        });
      } else {
        MDB.singleton._angular.router.navigateByUrl('autenticar');
      }
    } else {
      MDB.singleton._angular.router.navigateByUrl('autenticar');
    }
  }

  static contexto(): Contexto {
    if(MDB.singleton) {
      return MDB.singleton._contexto;
    }
    return null;
  }

  public static servicos(): Servicos {
    if(MDB.singleton) {
      return MDB.singleton._servicos;
    } else {
      return null;
    }
  }

  public static angular(): Angular {
    if(MDB.singleton) {
      return MDB.singleton._angular;
    } else {
      return null;
    }
  }

  public static util(): Util {
    if(MDB.singleton) {
      return MDB.singleton._util;
    } else {
      return null;
    }
  }
}


export class MDBLocalStorage {
    public usuario: Usuario = new Usuario();
    public menu: MenuItem[] = [];
    public tipoResposta: TipoResposta = TipoResposta.OK;

    constructor(parametros: Partial<MDBLocalStorage> = null) {
      if (parametros) {
        Object.assign(MDB, parametros);
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
  location: Location;
}

export class Contexto {
  nomeSistema: string;
  urlServidor: string;
  rotaInicio: string;

  set browser(storage: MDBLocalStorage){
    localStorage.setItem(this.nomeSistema,JSON.stringify(storage));
  }

  get browser(): MDBLocalStorage{
    return JSON.parse(localStorage.getItem(this.nomeSistema));
  }

  constructor(){};

  possuiLoguin(): boolean {
    const contexto = JSON.parse(localStorage.getItem(this.nomeSistema))
    const token = MDB.util().buscarValor(contexto, 'usuario.token');
    if(token){
      return true;
    }
  }

  public voltar(delay: number = null) {
    if(delay) {
      MDB.mostrarConteudo = false;
      const subscription: ISubscription = timer(delay,delay).subscribe(() => {
        MDB.angular().location.back();
        MDB.mostrarConteudo = true;
        subscription.unsubscribe();
      });
    } else {
      MDB.angular().location.back();
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
    this.rota.navigateByUrl(MDB.contexto().rotaInicio);
  }
}
