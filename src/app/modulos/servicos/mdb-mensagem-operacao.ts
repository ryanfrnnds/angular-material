export class MensagemOperacao {
    public titulo: string;
    public sucesso: string;
    public falha: string;
  
    constructor(parametros: Partial<MensagemOperacao> = null) {
      if (parametros) {
        Object.assign(this, parametros);
      }
    }
  }
  