export class Pageable <T> {
    public content: Array<T> = [];
    public last: boolean = false;
    public totalPages: number = 0;
    public totalElements: number = 0;
    public first: boolean = false;
    public sort: string = '';
    public numberOfElements = 0;
    public size: number = 0 ;
    public number: number = 0;
    constructor(init: Partial<Pageable<T>> = null) {
      Object.assign(this, init);
    }
}