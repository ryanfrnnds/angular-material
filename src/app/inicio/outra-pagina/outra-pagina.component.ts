import { MdbServico } from './../../modulos/servicos/mdb-servico';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

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
    , mdbServico: MdbServico) {
      this.formReuniao = formBuilder.group({
        equipe: [null, Validators.required],
      });

      mdbServico.get<Array<any>>('consulta/equipes').subscribe(equipes => {
        this.equipes = equipes;
      });

    }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && changes['item'].currentValue ) {
        this.item = changes['item'].currentValue;
        this.formReuniao.patchValue({equipe: this.item});
    }
  }

}
