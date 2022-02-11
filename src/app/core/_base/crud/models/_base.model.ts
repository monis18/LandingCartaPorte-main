// tslint:disable: variable-name
export class BaseModel {
  // TODO: delete after clear metronic modules
  _createdDate?: string;
  _updatedDate?: string;

  constructor(baseData = false) {
    this.clear();
    if (baseData) {
      this.baseData();
    }
  }

  static clone(model) {
    // tslint:disable-next-line
    return !!model ? Object.assign(new (<any>this.constructor), model) : null;
  }

  clear() {

  }

  baseData() {

  }
}
