export class Inicializacao {
    public rotaInicio: string;
    public urlServidor: string;
    constructor(inicializacao: Partial<Inicializacao>) {
      if (inicializacao) {
        Object.assign(this, inicializacao);
      }
    }
}
