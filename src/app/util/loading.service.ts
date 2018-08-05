import { Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoadingService  {
	public mostrar: boolean = false;
	public porRequisicao: boolean = true;
	constructor() {}
}
