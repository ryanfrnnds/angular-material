import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MdbMensagemServico } from '../../modulos/mensagens/mensagens.service';
import { Router } from '@angular/router';
import { MdiasAppComponent } from '../../modulos/mdias-app/mdias-app.component';
import { MdbAcsServico } from '../../modulos/acs/servico';

@Component({
  selector: 'mdias-outra-pagina',
  templateUrl: './outra-pagina.component.html',
  styleUrls: ['./outra-pagina.component.scss']
})
export class OutraPaginaComponent implements OnInit {

  public equipes: Array<any> = new Array<any>();

  public formReuniao: FormGroup;

  @Input() public item: any;

  constructor(formBuilder: FormBuilder
  , private mensageria: MdbMensagemServico
  , private acsServico: MdbAcsServico
  , private rota: Router) {
      this.formReuniao = formBuilder.group({
        equipe: [null, Validators.required],
      });
    }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && changes['item'].currentValue ) {
        this.item = changes['item'].currentValue;
        this.formReuniao.patchValue({equipe: this.item});
    }
  }

}
