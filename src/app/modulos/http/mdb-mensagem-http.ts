export class MdbMensagemHttp {
    public titulo: string = '';
    public sucesso: string = '';
    public falha: string = '';

    constructor(parametros: Partial<MdbMensagemHttp> = null) {
      if (parametros) {
        Object.assign(this, parametros);
      }
    }
  }
