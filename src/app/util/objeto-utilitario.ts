import { HttpClient } from '@angular/common/http';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material';


export class ObjetoUtilitario {
    private static singleton: ObjetoUtilitario = null;

    private constructor() {}

    public static Instance(): ObjetoUtilitario {
        if (this.singleton == null) {
            this.singleton = new ObjetoUtilitario();
        }
        return this.singleton;
    }

    public buscarValor(item: any, atributo: any, retornoDefault = null) {
		if (item && atributo) {
			if (atributo.indexOf('.') === -1) {
				return item[atributo] ? item[atributo] : retornoDefault;
			} else {
				const fields: string[] = atributo.split('.');
				let value = item;
				for (let i = 0, len = fields.length; i < len; ++i) {
					if (value == null) {
						return retornoDefault;
					}
					value = value[fields[i]];
				}
				return value ? value : retornoDefault;
			}
		} else {
			return retornoDefault;
		}
	}
}
