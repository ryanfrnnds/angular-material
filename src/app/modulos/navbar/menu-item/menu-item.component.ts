import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '../../../modelo';

@Component({
  selector: 'mdias-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input("menuItem") menuItem: MenuItem;

  constructor() { }

  ngOnInit() {
  }

}
