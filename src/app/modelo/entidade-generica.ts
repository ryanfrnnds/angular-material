export class EntidadeGenerica {
    public id: any;
    
    constructor(parametros: Partial<EntidadeGenerica> = null) {
      if (parametros) {
        Object.assign(this, parametros);
      }
    }
}
