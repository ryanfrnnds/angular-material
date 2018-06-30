import { MatPaginatorIntl } from "@angular/material";
import { I18n } from "../../i18n";

export class MdiasProvedorPaginacao extends MatPaginatorIntl {
	itemsPerPageLabel = I18n.Instance().traducao.mdbComponentes.autoComplete.itensPorPagina;
  nextPageLabel     = I18n.Instance().traducao.mdbComponentes.autoComplete.proximaPagina;
  previousPageLabel = I18n.Instance().traducao.mdbComponentes.autoComplete.paginaAnterior;
  de: string =  I18n.Instance().traducao.mdbComponentes.autoComplete.de;
  
  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 '+ this.de +' '+ length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' ' + this.de+ ' ' + length;
  };
}