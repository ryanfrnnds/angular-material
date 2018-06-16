import { MdbMensageria } from '../modulos/mensagens/mensagens.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { MdbHttpServico } from '../modulos/http/mdb-http.servico';
import { Usuario } from '../modelo/usuario';
import { MenuItem } from '../modelo/menu-item';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { I18n } from '../i18n';
import { TipoResposta } from '../modulos/http/tipo-resposta';

import { Observable } from 'rxjs/Observable';

export class MDB {
	private static singleton: MDB = null;
	public rotaInicio: string;
  public urlServidor: string;
  public nomeSistema: string;

  private mensageria: MdbMensageria;
  private mdbHttp: MdbHttpServico;
  private router: Router;

  public rota: Router
  public rotaAtiva: ActivatedRoute
  public formBuilder: FormBuilder

  public traducao: any;

  private inciado: Observable<boolean>;

	private constructor() {}

    public static incializar(
      dependencias:
      {
        angular:
          {
            rota: Router, 
            rotaAtiva: ActivatedRoute, 
            formBuilder: FormBuilder,
             http: HttpClient
          }
        ,servicos:
          {
            mensageria: MdbMensageria, 
            mdbHttp: MdbHttpServico
          }
        ,contexto:
          {
            rotaInicio: string, 
            urlServidor: string, 
            nomeSistema: string,
            confI18n?: string
          }
      }): MDB {
      
      if (this.singleton == null) {
        this.singleton = new MDB();
      }
      if(dependencias){
        this.singleton.traducao = I18n.Instance(dependencias.contexto.confI18n);
        const referenciaLingua: string = dependencias.contexto.confI18n ? dependencias.contexto.confI18n : 'pt-BR';
        this.singleton.inciado = dependencias.angular.http.get<any>('assets/i18n/' + referenciaLingua + '.json').map( (traducao) => {
          if (traducao) {
            Object.assign(this.singleton.traducao, traducao);
          }
          return true;
        });
        this.singleton.rota = dependencias.angular.rota;
        this.singleton.rotaAtiva = dependencias.angular.rotaAtiva;
        this.singleton.formBuilder = dependencias.angular.formBuilder;
        this.singleton.mensageria = dependencias.servicos.mensageria;
        this.singleton.mdbHttp = dependencias.servicos.mdbHttp;
        this.singleton.nomeSistema = dependencias.contexto.nomeSistema;
        this.singleton.urlServidor = dependencias.contexto.urlServidor;
        this.singleton.rotaInicio = dependencias.contexto.rotaInicio;
      }
      if(!MDB.possuiLoguin()) {
        this.singleton.rota.navigateByUrl(this.singleton.rotaInicio);
      }
      return this.singleton;
	}

  public static get usuario(): Usuario {
    const contexto = JSON.parse(localStorage.getItem(this.singleton.nomeSistema))
    if(contexto) {
		  return contexto.usuario;
    } else {
      return null;
    }
  }

  public static iniciado(): Observable<boolean> {
    return MDB.singleton.inciado.map(iniciado => {
      return iniciado
    });
  }

  public static get nomeSistema(): string {
    if(this.singleton) {
		  return this.singleton.nomeSistema;
    } else {
      return '';
    }
  }

  public static get mensageria(): MdbMensageria {
    if(this.singleton) {
		  return this.singleton.mensageria;
    } else {
      return null;
    }
  }

  public static get rota(): Router {
    if(this.singleton) {
		  return this.singleton.router;
    } else {
      return null;
    }
  }

  public static get rotaAtiva(): ActivatedRoute {
    if(this.singleton) {
		  return this.singleton.rotaAtiva;
    } else {
      return null;
    }
  }

  public static get formBuilder():FormBuilder {
    if(this.singleton) {
		  return this.singleton.formBuilder;
    } else {
      return null;
    }
  }

  public static get servico(): MdbHttpServico {
    if(this.singleton) {
		  return this.singleton.mdbHttp;
    } else {
      return null;
    }
  }

  public static get menu(): MenuItem[] {
    const contexto = JSON.parse(localStorage.getItem(this.singleton.nomeSistema))
    if(contexto) {
		  return contexto.menu;
    } else {
      return null;
    }
	}

	public static irParaInicio(rota: Router): void {
		rota.navigateByUrl(MDB.singleton.rotaInicio);
	}

	public static contexto(contexto :MDBLocalStorage): void {
		if(this.singleton) {
			localStorage.setItem(this.singleton.nomeSistema,JSON.stringify(contexto));
		}
  }

	static possuiLoguin(): boolean {
    if(this.singleton) {
      const contexto = JSON.parse(localStorage.getItem(this.singleton.nomeSistema))
      const token = MDB.buscarValor(contexto, 'usuario.token');
      if(token){
        return true;
      }
    }
		return false;
	}

	static get urlServidor(): string {
		if( this.singleton) {
			return this.singleton.urlServidor;
		}
		return '';
	}

	static decidirRota(tipoResposta: TipoResposta) {
    if(this.singleton) {
      if(tipoResposta.id === TipoResposta.SEM_MENU_ACS.id){
        this.singleton.rota.navigateByUrl(this.singleton.rotaInicio);
      }
  
      if(tipoResposta.id === TipoResposta.NAO_AUTORIZADO.id){
        this.singleton.mensageria.limparMensagem();
        this.singleton.mensageria.addInformacao(tipoResposta.titulo,tipoResposta.mensagem);
        this.singleton.rota.navigateByUrl('/autenticar');
      }
    }
  }
  
  static buscarValor(item: any, atributo: any, retornoDefault = null) {
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

  static get traducao(): any {
    if(this.singleton){
      return this.singleton.traducao;
    }
    return null;
  }
  
  static traduzir(chave: string , parametros: any = null): string {
    if (chave) {
      let texto: string = MDB.buscarValor(this.singleton.traducao,chave);
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
