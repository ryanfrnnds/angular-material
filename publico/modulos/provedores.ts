import { MAT_DATE_LOCALE, DateAdapter, NativeDateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from "@angular/material";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MdbHttpInterceptor } from "../../src/app/modulos/seguranca/interceptador/mdb-http-interceptor";

export const MDB_DATE_PICKER_BR = [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: DateAdapter, useClass: NativeDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS},
  ];

export const MDB_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: MdbHttpInterceptor,
  multi: true
};