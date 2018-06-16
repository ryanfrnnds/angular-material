import { EntidadeGenerica } from './entidade-generica';


export class EntidadeAuditada extends EntidadeGenerica {
    public criadoPor: string;
    public dataCriacao: Date;
    public atualizadoPor: string;
    public dataAtualizacao: Date;

    constructor(parametros: Partial<EntidadeAuditada> = null) {
      super(parametros);
      if (parametros) {
        Object.assign(this, parametros);
      }
    }
}
