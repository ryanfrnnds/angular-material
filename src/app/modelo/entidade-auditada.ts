export class EntidadeAuditada {
    public criadoPor: string;
    public dataCriacao: Date;
    public atualizadoPor: string;
    public dataAtualizacao: Date;

    constructor(parametros: Partial<EntidadeAuditada> = null) {
      if (parametros) {
        Object.assign(this, parametros);
      }
    }
}
