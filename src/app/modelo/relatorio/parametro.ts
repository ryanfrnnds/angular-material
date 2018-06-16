export class Parametro {
  public chave: string;
  public descricao: string;
  public valor: any;

  constructor(init: Partial<Parametro> = null) {
    Object.assign(this, init);
  }
}
