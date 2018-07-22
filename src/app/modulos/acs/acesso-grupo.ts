export class ACSAcessoGrupo {
    acoes:Array<string>;
    codigoEmpresa:string;
    codigoFuncao:string;
    codigoUsuario:string;
    descricaoFuncao:string;
    nivel:number;
    tipoUrl:string;
    url:string;
    visivel:string;
    
    constructor(parametros: Partial<ACSAcessoGrupo> = null) {
        if (parametros) {
            Object.assign(this, parametros);
        }
    }
}