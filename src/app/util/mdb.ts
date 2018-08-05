import { MdbMensagemServico } from '../modulos/mensagens/mensagens.service';
import { Router, ActivatedRoute } from '@angular/router';

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
import { LoadingService } from './loading.service';
import { DependenciasService } from './dependencias.service';
import { AppInfo } from '../modelo/app-info';
import { MdbHttpService } from '../../../publico/modulos/http';

export class MDB {
  private static singleton: MDB = null;
  private _contexto: Contexto;
  private _angular: Angular;
  private _util: Util;
  private _servicos: Servicos;

  public static inciado: Observable<boolean> = null;

	private constructor() {}  

    public static incializar(dependencias: DependenciasService): MDB {

      if (MDB.singleton == null) {
        MDB.singleton = new MDB();
        MDB.singleton._contexto = new Contexto();
        MDB.singleton._util = new Util( I18n.Instance(dependencias.confI18n).traducao, dependencias.router);
      }
      if(dependencias){
        MDB.singleton.construirInternacionalizacao(dependencias);
        MDB.singleton.construirDependenciasAngular(dependencias);
        MDB.singleton.construirDependenciasServicos(dependencias);
       
        MDB.singleton._contexto.nomeSistema = dependencias.nomeSistema;
        MDB.singleton._contexto.urlServidor = dependencias.urlServidor;
        MDB.singleton._contexto.rotaInicio = dependencias.rotaInicio;
        dependencias.httpClient.get(dependencias.urlServidor+'/app/info').subscribe((resposta:AppInfo)=>{
          MDB.singleton._contexto.versao = resposta.version;
        });
      }
      MDB.util().irParaInicio();
      MDB.inciado.subscribe();
      return MDB.singleton;
  }

  private construirInternacionalizacao(dependencias:DependenciasService) {
    MDB.inciado = dependencias.httpClient.get<any>('assets/i18n/' + dependencias.confI18n + '.json').pipe(
      map( (traducaoAplicacao) => {
        if (traducaoAplicacao) {
          Object.assign(MDB.singleton._util.traducao, traducaoAplicacao);
        }
        return true;
      })
    );
  }

  private construirDependenciasAngular(dependencias:DependenciasService  ) {
    MDB.singleton._angular = {
      router: dependencias.router,
      activatedRoute: dependencias.activatedRoute,
      formBuilder: dependencias.formBuilder,
      location: dependencias.location
    };
  }

  private construirDependenciasServicos(dependencias:DependenciasService  ) {
    MDB.singleton._servicos = {
      http: dependencias.mdbHttpServico,
      mensagem: dependencias.mensageria,
      loading: dependencias.loadingService
    };
  }

  static autenticar() {
    MDB.singleton._angular.router.navigateByUrl('autenticar');
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
  http: MdbHttpService;
  loading: LoadingService;
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
  versao: string;

  set localStorage(storage: MDBLocalStorage){
    localStorage.setItem(this.nomeSistema,JSON.stringify(storage));
  }

  get localStorage(): MDBLocalStorage{
    return JSON.parse(localStorage.getItem(this.nomeSistema));
  }

  constructor(){};

  possuiLogin(): boolean {
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
    if(url.includes('wlsistemas')) {clearImmediate
      let irPara:string = "";
      if(url.startsWith('dev')) {
        irPara = 'https://oamdev.mdb.com.br/oam/server/logout?end_url='+window.location.href.split("#")[0];
      } else if (url.startsWith('hom')){
        irPara = 'https://oamhom.mdb.com.br/oam/server/logout?end_url='+window.location.href.split("#")[0];
      } else {
        irPara = 'https://oam.mdb.com.br/oam/server/logout?end_url='+window.location.href.split("#")[0];
      }
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
