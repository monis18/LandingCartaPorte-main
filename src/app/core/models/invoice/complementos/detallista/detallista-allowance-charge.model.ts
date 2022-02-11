import { BaseModel } from '@crud';
// tslint:disable-next-line: max-line-length
import { AllowanceChargeAllowanceChargeType, AllowanceChargeMonetaryAmountOrPercentageRateBase, AllowanceChargeSettlementType, AllowanceChargeSpecialServicesType } from '@enums/detallista.enums';

export class DetallistaAllowanceCharge extends BaseModel {
  specialServicesType: AllowanceChargeSpecialServicesType;
  allowanceChargeType: AllowanceChargeAllowanceChargeType;
  settlementType: AllowanceChargeSettlementType;
  sequenceNumber: string;
  monetaryAmountOrPercentage: {
    rate: {
      percentage: number;
      base: AllowanceChargeMonetaryAmountOrPercentageRateBase;
    };
  };

  baseData() {
    this.specialServicesType = AllowanceChargeSpecialServicesType.AA;
    this.allowanceChargeType = AllowanceChargeAllowanceChargeType.ALLOWANCE_GLOBAL;
    this.settlementType = AllowanceChargeSettlementType.BILL_BACK;
    this.sequenceNumber = null;
    this.monetaryAmountOrPercentage = {
      rate: {
        percentage: null,
        base: AllowanceChargeMonetaryAmountOrPercentageRateBase.INVOICE_VALUE,
      },
    };
  }
}
