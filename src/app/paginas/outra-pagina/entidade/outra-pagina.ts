import { EntidadeAuditada } from "mdias-componentes";
export class OutraPagina extends EntidadeAuditada {
    public nome: string;
    public descricao: string;
    public flagAtivo: string;
    public get ativo(): boolean {
        return this.flagAtivo ? this.flagAtivo === 'S':false;
    }
    public set ativo(flag: boolean) {
        this.flagAtivo = flag ? 'S':'N';
    }
    constructor(parametros: Partial<OutraPagina> = null) {
        super(parametros);
        if (parametros) {
            if(parametros.flagAtivo === 'T' || !parametros.flagAtivo) {
                parametros.flagAtivo = null;
            } 
            Object.assign(this, parametros);
        }
    }
}