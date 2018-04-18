import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MensagensService {
  private subject = new Subject<any>();
  private severidade:string;
  constructor() { }

  private enviarMensagem(mensagem: string) {
    this.subject.next();
  	this.subject.next({ text: mensagem });
    Observable.interval(5500).take(1).subscribe(() => this.limparMensagem());
  }

  public addSucesso(mensagem: string) {
    this.severidade = "SUCESSO";
    this.enviarMensagem(mensagem);
  }

  public addInformacao(mensagem: string) {
    this.severidade = "INFO";
    this.enviarMensagem(mensagem);
  }
  
  public addErro(mensagem: string) {
    this.severidade = "ERRO";
    this.enviarMensagem(mensagem);
  }
  
  limparMensagem() {
    this.subject.next();
  }

  getMensagem(): Observable<any> {
  	return this.subject.asObservable();
  }

  getSeveridade() {
    return this.severidade;
  }
}
