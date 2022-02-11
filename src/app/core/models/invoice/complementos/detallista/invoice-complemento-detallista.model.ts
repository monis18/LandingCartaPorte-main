import { BaseModel } from '@crud';
import { DetallistaAdditionalInformation } from './detallista-additional-information.model';
import { DetallistaAllowanceCharge } from './detallista-allowance-charge.model';
import { DetallistaBuyer } from './detallista-buyer.model';
import { DetallistaCurrency } from './detallista-currency.model';
import { DetallistaCustom } from './detallista-custom.model';
import { DetallistaDeliveryNote } from './detallista-delivery-note.model';
import { DetallistaInvoiceCreator } from './detallista-invoice-creator.model';
import { DetallistaLineItem } from './detallista-line-item.model';
import { DetallistaOrderIdentification } from './detallista-order-identification.model';
import { DetallistaPaymentTerms } from './detallista-payment-terms.model';
import { DetallistaRequestForPaymentIdentification } from './detallista-request-for-payment-identification.model';
import { DetallistaSeller } from './detallista-seller.model';
import { DetallistaShipTo } from './detallista-ship-to.model';
import { DetallistaSpecialInstruction } from './detallista-special-instruction.model';
import { DetallistaTotalAllowanceCharge } from './detallista-total-allowance-charge.model';
import { DetallistaTotalAmount } from './detallista-total-amount.model';

export class InvoiceComplementoDetallistaModel extends BaseModel {
  contentVersion: '1.3.1';
  type: 'SimpleInvoiceType';
  documentStructureVersion: 'AMC8.1';
  documentStatus: 'ORIGINAL' | 'COPY' | 'REEMPLAZA' | 'DELETE';

  requestForPaymentIdentification?: DetallistaRequestForPaymentIdentification;
  specialInstruction?: DetallistaSpecialInstruction[];
  orderIdentification: DetallistaOrderIdentification;
  AdditionalInformation: DetallistaAdditionalInformation;
  DeliveryNote?: DetallistaDeliveryNote;
  buyer: DetallistaBuyer;
  seller?: DetallistaSeller;
  shipTo?: DetallistaShipTo;
  InvoiceCreator?: DetallistaInvoiceCreator;
  Customs?: DetallistaCustom[];
  currency?: DetallistaCurrency[];
  paymentTerms?: DetallistaPaymentTerms;
  shipmentDetail?: string;
  allowanceCharge?: DetallistaAllowanceCharge[];
  lineItem?: DetallistaLineItem[];
  totalAmount?: DetallistaTotalAmount;
  TotalAllowanceCharge?: DetallistaTotalAllowanceCharge[];

  public static clone(oldModel: InvoiceComplementoDetallistaModel): InvoiceComplementoDetallistaModel {
    return !!oldModel ? Object.assign(new InvoiceComplementoDetallistaModel(), oldModel) : null;
  }

  clear() {
    this.contentVersion = '1.3.1';
    this.type = 'SimpleInvoiceType';
    this.documentStructureVersion = 'AMC8.1';
  }

  baseData() {
    this.requestForPaymentIdentification = new DetallistaRequestForPaymentIdentification(true);
    this.orderIdentification = new DetallistaOrderIdentification(true);
    this.AdditionalInformation = new DetallistaAdditionalInformation(true);
    this.buyer = new DetallistaBuyer(true);
  }
}
