import { BaseModel } from '@crud';
// tslint:disable-next-line: max-line-length
import { PaymentTermsDiscountType, PaymentTermsNetPaymentNetPaymentTermsType, PaymentTermsPaymentTermsEvent, PaymentTermsPaymentTermsRelationTime } from '@enums/detallista.enums';

export class DetallistaPaymentTerms extends BaseModel {
  paymentTermsEvent: PaymentTermsPaymentTermsEvent;
  PaymentTermsRelationTime: PaymentTermsPaymentTermsRelationTime;
  discountPayment: {
    percentage: string;
    discountType: PaymentTermsDiscountType;
  };
  netPayment: {
    netPaymentTermsType: PaymentTermsNetPaymentNetPaymentTermsType;
    paymentTimePeriod: {
      timePeriodDue: {
        value: string;
        timePeriod: 'DAYS'
      };
    };
  };

  baseData() {
    this.paymentTermsEvent = PaymentTermsPaymentTermsEvent.DATE_OF_INVOICE;
    this.PaymentTermsRelationTime = PaymentTermsPaymentTermsRelationTime.REFERENCE_AFTER;
    this.discountPayment = {
      percentage: null,
      discountType: PaymentTermsDiscountType.ALLOWANCE_BY_PAYMENT_ON_TIME,
    };
    this.netPayment = {
      netPaymentTermsType: PaymentTermsNetPaymentNetPaymentTermsType.BASIC_DISCOUNT_OFFERED,
      paymentTimePeriod: {
        timePeriodDue: {
          value: null,
          timePeriod: 'DAYS'
        },
      },
    };
  }
}
