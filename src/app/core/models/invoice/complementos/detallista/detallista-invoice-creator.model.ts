import { BaseModel } from '@crud';
import { InvoiceCreatorAlternatePartyIdentificationType } from '@enums/detallista.enums';

export class DetallistaInvoiceCreator extends BaseModel {
  gln: string;
  alternatePartyIdentification: {
    type: InvoiceCreatorAlternatePartyIdentificationType;
    text: string;
  };
  nameAndAddress: {
    name?: string;
    streetAddressOne?: string;
    city?: string;
    postalCode?: string;
  };

  baseData() {
    this.gln = null;
    this.alternatePartyIdentification = {
      type: InvoiceCreatorAlternatePartyIdentificationType.IA,
      text: null,
    };
    this.nameAndAddress = {
      name: null,
      streetAddressOne: null,
      city: null,
      postalCode: null,
    };
  }
}
