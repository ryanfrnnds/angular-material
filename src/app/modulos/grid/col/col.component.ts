import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mdias-col',
  templateUrl: './col.component.html',
  styleUrls: ['./col.component.scss']
})
export class ColComponent implements OnInit {

  @Input() s: string;
  @Input() m: string;
  @Input() l: string;
  @Input() estilo: any;

  constructor() {
    this.s = this.s ? this.s : '12';
    this.m = this.m ? this.m : '6';
    this.l = this.l ? this.l : '3';
  }

  ngOnInit() {
  }

}
