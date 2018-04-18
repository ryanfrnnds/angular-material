import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mdias-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  
  logoFooter:string = "assets/img/logo-mdias-branca.png";
  @Input() anoReferencia:string;

  constructor() { }

  ngOnInit() {
  }

}
