import { BaseModel } from '@crud';

export class DetallistaShipTo extends BaseModel {
  gln: string;
  nameAndAddress: {
    name?: string;
    streetAddressOne?: string;
    city?: string;
    postalCode?: string;
  };

  baseData() {
    this.gln = null;
    this.nameAndAddress = {
      name: null,
      streetAddressOne: null,
      city: null,
      postalCode: null,
    };
  }
}
