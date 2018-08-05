import { MDB } from "../../util/mdb";

export class SessionSSO {
  public guardarRotaAoRecarregar: boolean = true;
  get key(): string {
    if(!MDB.contexto()) {
      return ;
    }
    return MDB.contexto().nomeSistema + 'Sso';
  }
  
  
  get(): {rotaAngular: string , usuario: string } {
    return JSON.parse(sessionStorage.getItem((this.key)));
  }

  possuiReferenciaGuardada(): boolean {
    if(this.get() && this.get().rotaAngular) {
      return true;
    }
    return false;
  }

  limpar(): void {
    sessionStorage.removeItem(this.key);
  }

  irParaRotaNaSessao(): void {
    if(!this.ehPermitidoGuardarReferencia()) {
      return ;
    }

    MDB.angular().router.navigateByUrl(this.get().rotaAngular);
    this.limpar();
  }

  private ehPermitidoGuardarReferencia(): boolean {
    const aRotaAGuardarEhAutenticar: boolean = window.location.href.split("#")[1].startsWith('/autenticar');
    const aRotaAGuardarEhSessaoExpirada: boolean = window.location.href.split("#")[1].startsWith('/sessaoExpirada');
    const aRotaAGuardarEhAcessonegado: boolean = window.location.href.split("#")[1].startsWith('/acessoNegado');
    const ehPermitido: boolean = 
      !aRotaAGuardarEhAutenticar && !aRotaAGuardarEhSessaoExpirada 
      &&  
      !aRotaAGuardarEhAcessonegado

    return ehPermitido;
  }

  guardarNaSessao(): void {
    this.limpar();

    if(!this.ehPermitidoGuardarReferencia()) {
      return
    }

    const objeto: any = {
      rotaAngular: window.location.href.split('#')[1],
      usuario : MDB.contexto().localStorage.usuario.codigo
    };
    sessionStorage.setItem(this.key,JSON.stringify(objeto));
  }
  
    constructor() {}
  }
