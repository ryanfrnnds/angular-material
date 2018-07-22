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
import { timer, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MdiasAppService } from '../modulos/mdias-app/mdias-app.service';

export class MDB {
  private static singleton: MDB = null;
  private _contexto: Contexto;
  private _angular: Angular;
  private _util: Util;
  private _servicos: Servicos;

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
            mdiasApp: MdiasAppService,
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
          mensagem: dependencias.servicos.mensagem,
          mdiasApp: dependencias.servicos.mdiasApp
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
      if(delay) {
        const subscription: ISubscription = timer(delay).subscribe(() => {
          MDB.singleton._angular.router.navigateByUrl('autenticar');
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

  static limparLocalStorage(): void {
    const possuiLocalStorage = localStorage.getItem(MDB.contexto().nomeSistema) ? true : false;
    if(possuiLocalStorage) {
      localStorage.removeItem(MDB.contexto().nomeSistema);
    }
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
  mdiasApp: MdiasAppService;
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

  public voltar(delay: number = null): Observable<boolean> {
    if(delay) {
      return timer(delay)
      .pipe(
        map(() => {
          MDB.angular().location.back();
          return true;
        })
      );
    } else {
      MDB.angular().location.back();
      return of(true);
    }
  }

  public deslogar() {
    const url: string = window.location.href.split("#")[0].split("//")[1];
    MDB.limparLocalStorage();
    console.log(window.location.href.split("#")[0]);
    console.log(window.location.href.split("#")[0].split("//")[1]);
    console.log(url);
    if(url.includes('wlsistemas')) {clearImmediate
      let irPara:string = "";
      if(url.startsWith('dev')) {
        irPara = 'https://oamdev.mdb.com.br/oam/server/logout?end_url='+window.location.href.split("#")[0];
      } else if (url.startsWith('hom')){
        irPara = 'https://oamhom.mdb.com.br/oam/server/logout?end_url='+window.location.href.split("#")[0];
      } else {
        irPara = 'https://oam.mdb.com.br/oam/server/logout?end_url='+window.location.href.split("#")[0];
      }
      console.log(irPara);
      window.location.href = irPara;
    } else {
      MDB.autenticar();
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
