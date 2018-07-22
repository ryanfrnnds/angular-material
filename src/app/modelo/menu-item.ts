export class MenuItem {
	
	public titulo:string;
	public url:string;
	public menus:MenuItem[];

	constructor(init: Partial<MenuItem> = null) {
		if (init) {
            Object.assign(this,init);
        }
	}
}


