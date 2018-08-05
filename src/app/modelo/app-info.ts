export class AppInfo {

    public version: string;
  
    constructor(init: Partial<AppInfo> = null) {
      Object.assign(this, init);
    }
  }
  