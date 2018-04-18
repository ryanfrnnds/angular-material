import { I18n } from './../i18n/i18n';
import { FormControl } from '@angular/forms';

export class MDBComponente {
    private traducao: any;
    public ehCarregando: boolean = false;

    constructor() {
      this.traducao = I18n.Instance().traducao;
    }

    public traduzir(chave: string , parametros: any = null): string {
      if (chave) {
        let texto: string = this.safeEval(chave);
        if (parametros) {
          for (const key in parametros) {
            if (parametros.hasOwnProperty(key)) {
              const item = parametros[key];
              texto = texto.replace(new RegExp('{{' + key + '}}', 'g'), item);
            }
          }
        }
        return texto;
      }
      return '';
    }

    public resetar( formulario ) {
      for (const key in  formulario.controls) {
        if (formulario.controls.hasOwnProperty(key)) {
          const control: any = formulario.controls[key];
          if (control.controls) {
            this.resetar(control);
          } else {
            control.setValue(undefined);
            control.markAsUntouched();
          }
        }
      }
    }

    public marcarComoTocado( formulario ) {
      for (const key in  formulario.controls) {
        if (formulario.controls.hasOwnProperty(key)) {
          const control: any = formulario.controls[key];
          if (control.controls) {
            this.marcarComoTocado(control);
          } else {
            control.markAsTouched();
          }
        }
      }
    }

    public marcarComoNaoTocado( formulario ) {
      for (const key in  formulario.controls) {
        if (formulario.controls.hasOwnProperty(key)) {
          const control: any = formulario.controls[key];
          if (control.controls) {
            this.marcarComoNaoTocado(control);
          } else {
            control.markAsUntouched();
          }
        }
      }
    }

    private safeEval(field: any) {
      if (this.traducao && field) {
        if (field.indexOf('.') === -1) {
          return this.traducao[field];
        } else {
          const fields: string[] = field.split('.');
          let value = this.traducao;
          for (let i = 0, len = fields.length; i < len; ++i) {
            if (value == null) {
              return null;
            }
            value = value[fields[i]];
          }
          return value;
        }
      } else {
        return null;
      }
    }
}
