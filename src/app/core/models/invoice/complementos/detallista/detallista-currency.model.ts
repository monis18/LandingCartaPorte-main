import { BaseModel } from '@crud';
import { CurrencyCurrencyFunction, CurrencyCurrencyISOCode } from '@enums/detallista.enums';

export class DetallistaCurrency extends BaseModel {
  currencyFunction: CurrencyCurrencyFunction;
  rateOfChange: number;
  currencyISOCode: CurrencyCurrencyISOCode;

  baseData() {
    this.currencyFunction = CurrencyCurrencyFunction.BILLING_CURRENCY;
    this.rateOfChange = null;
    this.currencyISOCode = CurrencyCurrencyISOCode.MXN;
  }
}
