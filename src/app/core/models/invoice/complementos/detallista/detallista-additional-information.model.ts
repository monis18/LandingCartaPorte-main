import { BaseModel } from '@crud';
import { AdditionalInformationReferenceIdentificationType } from '@enums/detallista.enums';

export class DetallistaAdditionalInformation extends BaseModel {
  referenceIdentification: {
    type: AdditionalInformationReferenceIdentificationType;
    text: string;
  };

  baseData() {
    this.referenceIdentification = {
      type: AdditionalInformationReferenceIdentificationType.AAE,
      text: null,
    };
  }
}
