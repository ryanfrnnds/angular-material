export class Autenticacao {

  public status: string;
  public token: string;

  constructor(init: Partial<Autenticacao> = null) {
    Object.assign(this, init);
  }
}
