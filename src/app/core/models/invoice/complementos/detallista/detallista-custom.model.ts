import { BaseModel } from '@crud';

export class DetallistaCustom extends BaseModel {
  gln: string;

  baseData() {
    this.gln = null;
  }
}
