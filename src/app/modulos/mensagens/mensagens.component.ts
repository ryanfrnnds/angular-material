import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MensagensService } from './mensagens.service';

@Component({
  selector: 'mdias-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.scss'],
})
export class MensagensComponent implements OnInit, OnDestroy {
  
  	severidade:string = "";
  	cor:string;
	message: any;
	subscription: Subscription;
	
	constructor(private mensagensService: MensagensService) {
		this.subscription = this.mensagensService.getMensagem().subscribe(message => { 
			this.message = message; 
			this.severidade = this.mensagensService.getSeveridade();
			
			if(this.severidade == "SUCESSO") {
				this.cor = "#388E3C";
			}
			if(this.severidade == "ERRO") {
				this.cor = "#F44336";
			}
			if(this.severidade == "INFO") {
				this.cor = "#607D8B";
			}
		});
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
	
	fechar() {
		this.mensagensService.limparMensagem();
	}
}
