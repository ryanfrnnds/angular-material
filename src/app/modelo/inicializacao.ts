
export class Inicializacao {
    public rotaInicio: string;
    public urlServidor: string;
    public nomeSistema: string;
    constructor(inicializacao: Partial<Inicializacao> = null) {
      if (inicializacao) {
        Object.assign(this, inicializacao);
      }
    }
}
