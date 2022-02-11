import { BaseModel } from '@crud';
import { OrderIdentificationReferenceIdentificationType } from '@enums/detallista.enums';

export class DetallistaOrderIdentification extends BaseModel {
  ReferenceDate: Date;
  referenceIdentification: {
    type: OrderIdentificationReferenceIdentificationType;
    text: string;
  };

  baseData() {
    this.ReferenceDate = null;
    this.referenceIdentification = {
      type: OrderIdentificationReferenceIdentificationType.ON,
      text: null,
    };
  }
}
