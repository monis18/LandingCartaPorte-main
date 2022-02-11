import { BaseModel } from '@crud';
import { RequestForPaymentIdentificationEntityType } from '@enums/detallista.enums';

export class DetallistaRequestForPaymentIdentification extends BaseModel {
  entityType: RequestForPaymentIdentificationEntityType;

  baseData() {
    this.entityType = RequestForPaymentIdentificationEntityType.INVOICE;
  }
}
