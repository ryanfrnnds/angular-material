export class TipoResposta {
    static OK = new TipoResposta({id:0,status:200, titulo:'', mensagem:''});
    static AUTENTICACAO = new TipoResposta({id:1,status:401, titulo:'', mensagem:''});
    static PERMISSAO_ACS = new TipoResposta({id:2,status:403, titulo:'', mensagem:''});

    public id;
    public status;
    public titulo;
    public mensagem;

    constructor(parametros: Partial<TipoResposta>) {
      if (parametros) {
        Object.assign(this, parametros);
      }
    }
}
