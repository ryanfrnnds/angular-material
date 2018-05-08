import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MensagensService } from './mensagens.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'mdias-mensagens',
  templateUrl: './mensagens.component.html',
	styleUrls: ['./mensagens.component.scss'],
	animations: [
    trigger(
      'mdias-mensagem', [
        transition(':enter', [
          style({bottom: '-50px', opacity: 0}),
          animate('300ms', style({bottom: '0', opacity: 1}))
        ]),
        transition(':leave', [
          style({bottom: '0', opacity: 1}),
          animate('300ms', style({bottom: '30px', opacity: 0}))
        ])
      ]
    )
  ]
})
export class MensagensComponent implements OnInit {
	constructor(private mensagensService: MensagensService) {
	}

	ngOnInit() {
	}

	fechar() {
		this.mensagensService.limparMensagem();
	}

	public removerMensagem(index:number):void {
		this.mensagensService.removerMensagem(index);
	}
}
