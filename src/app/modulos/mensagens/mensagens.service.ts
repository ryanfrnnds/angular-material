import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';
import { Mensagem } from '../../modelo';

@Injectable()
export class MensagensService {

  private mensagens:Mensagem[];
  private index:number;

  constructor() { 
    this.mensagens = [];
    this.index = 0;
  }

  private adicionarMensagem(mensagem: Mensagem, tempo:number) {
    tempo = tempo ? tempo : 5000;
    this.index++;
    mensagem.index = this.index;
    this.mensagens.push(mensagem);
    this.delay(tempo).then(() => {
      this.removerMensagem(mensagem.index);
    })
  }

  public addSucesso(titulo:string, mensagem: string, tempo?:number) {
    this.adicionarMensagem(new Mensagem({"severidade": "SUCESSO", "descricao": mensagem, titulo: titulo}), tempo);
  }

  public addInformacao(titulo:string, mensagem: string, tempo?:number) {
    this.adicionarMensagem(new Mensagem({"severidade": "INFO", "descricao": mensagem, titulo: titulo}), tempo);
  }
  
  public addErro(titulo:string, mensagem: string, tempo?:number) {
    this.adicionarMensagem(new Mensagem({"severidade": "ERRO", "descricao": mensagem, titulo: titulo}), tempo);
  }
  
  limparMensagem() {
    this.mensagens = [];
  }

  getMensagem(): string {
  	return "TESTE";
  }

  getMensagens() :Mensagem[] {
    return this.mensagens;
  }

  public removerMensagem(index:number) {
    this.mensagens = this.mensagens.filter(msg => msg.index !== index);
  }

  delay(milisegundos: number) {
      return new Promise( resolve => setTimeout(resolve, milisegundos) );
  }
}
