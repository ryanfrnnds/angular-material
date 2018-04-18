export class Usuario {
    public codigo: string;
    public nome: string;
    public email: string;
    public codEmpresaPadrao: string;
    public userId: string;
    public token: string;
    public tipoUsuario: string;
    public autenticado: boolean;
    public parametros: any;
    constructor(init: Partial<Usuario> = null) {
      Object.assign(this, init);
    }
}