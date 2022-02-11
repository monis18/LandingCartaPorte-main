import { BaseModel } from '@crud';
import { SellerAlternatePartyIdentificationType } from '@enums/detallista.enums';

export class DetallistaSeller extends BaseModel {
  gln: string;
  alternatePartyIdentification: {
    type: SellerAlternatePartyIdentificationType;
    text: string;
  };

  baseData() {
    this.gln = null;
    this.alternatePartyIdentification = {
      type: SellerAlternatePartyIdentificationType.IEPS_REFERENCE,
      text: null,
    };
  }
}
