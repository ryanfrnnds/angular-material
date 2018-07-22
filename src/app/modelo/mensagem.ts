export class Mensagem {
  public index:number;
  public titulo: string;
  public descricao: string;
  public severidade: string;

  constructor(parametros: Partial<Mensagem> = null) {
    if (parametros) {
      Object.assign(this, parametros);
    }
  }
}
