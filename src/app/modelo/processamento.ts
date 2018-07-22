export class Processamento {
    public chave: string;
    public valor: any;
    constructor(parametros: Partial<Processamento> = null) {
      if (parametros) {
        Object.assign(this, parametros);
      }
    }
}
