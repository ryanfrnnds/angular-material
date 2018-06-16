export class TipoResposta {
    static OK = new TipoResposta({id:0,status:200, titulo:'', mensagem:''});
    static NAO_AUTORIZADO = new TipoResposta({id:1,status:401, titulo:'Usuário não identificado', mensagem:'Reautenticado...'});
    static SEM_MENU_ACS = new TipoResposta({id:2,status:404, titulo:'ACS', mensagem:'Sem menu cadastrado no ACS'});
  
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
