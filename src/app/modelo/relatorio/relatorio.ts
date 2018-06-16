import { Coluna } from './coluna';
import { Celula } from './celula';

export class Relatorio {
  public nomeSistema: string;
  public tipo: string;
  public relatorioVelocity = 'relatorio/relatorio.pdf.vm';
  public descricaoRelatorio: string;
  public colunas: Array<Coluna> = new Array<Coluna>();
  public valores: Array<Array<Celula>> = new Array<Array<Celula>>();
  constructor(init: Partial<Relatorio> = null) {
      Object.assign(this, init);
    }
}
