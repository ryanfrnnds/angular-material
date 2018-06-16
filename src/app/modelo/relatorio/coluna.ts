export class Coluna {
  private  chave: string;
  private  descricao: string;
  private  formato: 'TXT';
  private  valorPadrao: '-';
  constructor(init: Partial<Coluna> = null) {
      Object.assign(this, init);
  }
}
