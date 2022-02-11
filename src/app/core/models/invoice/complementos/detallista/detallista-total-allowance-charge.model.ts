import { BaseModel } from '@crud';
import { TotalAllowanceChargeAllowanceOrChargeType, TotalAllowanceChargeSpecialServicesType } from '@enums/detallista.enums';

export class DetallistaTotalAllowanceCharge extends BaseModel {
  specialServicesType: TotalAllowanceChargeSpecialServicesType;
  Amount: number;
  allowanceOrChargeType: TotalAllowanceChargeAllowanceOrChargeType;

  baseData() {
    this.specialServicesType = TotalAllowanceChargeSpecialServicesType.AA;
    this.Amount = null;
    this.allowanceOrChargeType = TotalAllowanceChargeAllowanceOrChargeType.ALLOWANCE;
  }
}
