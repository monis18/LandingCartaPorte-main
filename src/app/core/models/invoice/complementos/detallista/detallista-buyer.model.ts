import { BaseModel } from '@crud';

export class DetallistaBuyer extends BaseModel {
  gln: string;
  contactInformation: {
    personOrDepartmentName: {
      text: string;
    };
  };

  baseData() {
    this.gln = null;
    this.contactInformation = {
      personOrDepartmentName: {
        text: null,
      },
    };
  }
}
