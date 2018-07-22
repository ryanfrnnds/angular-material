import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaComponent } from './tarjeta.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [TarjetaComponent],
  exports:[TarjetaComponent]
})
export class TarjetaModule { }
