
import { Coluna } from './coluna';
export class Celula {

private chaveColuna: string;
private valor: string;

constructor(init: Partial<Celula> = null) {
  Object.assign(this, init);
}
}

