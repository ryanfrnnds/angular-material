export class ACSPermissoes {
    static excluir: ACSPermissoes = new ACSPermissoes('EXCLUIR',[0,3,5]);
    static incluir: ACSPermissoes = new ACSPermissoes('INCLUIR',[0,2,3,6]);
    static alterar: ACSPermissoes = new ACSPermissoes('ALTERAR',[0,1,2,4]);
    static consultar: ACSPermissoes = new ACSPermissoes('CONSULTAR',[0,1,2,3,4,5,6,7]);
    static livre: ACSPermissoes = new ACSPermissoes('LIVRE',[0]);

    public descricao: string;
    public niveis: Array<number>;

    constructor(nome: string , niveis: Array<number>){
        this.descricao = nome;
        this.niveis = niveis;
    }
}