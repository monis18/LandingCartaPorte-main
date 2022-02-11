import { BaseModel } from '@crud';

export class DetallistaDeliveryNote extends BaseModel {
  referenceIdentification: string;
  ReferenceDate: Date;

  baseData() {
    this.referenceIdentification = null;
    this.ReferenceDate = null;
  }
}
