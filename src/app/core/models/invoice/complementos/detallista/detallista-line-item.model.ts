import { BaseModel } from '@crud';
// tslint:disable-next-line: max-line-length
import { LineItemAditionalQuantityQuantityType, LineItemAllowanceChargeAllowanceChargeType, LineItemAllowanceChargeSettlementType, LineItemAllowanceChargeSpecialServicesType, LineItemAllowanceChargeTradeItemTaxInformationTaxCategory, LineItemAllowanceChargeTradeItemTaxInformationTaxTypeDescription, LineItemAlternateTradeItemIdentificationType, LineItemLogisticUnitsSerialShippingContainerCodeType, LineItemPalletInformationDescriptionType, LineItemPalletInformationTransportMethodOfPayment, LineItemTradeItemDescriptionInformationLanguage } from '@enums/detallista.enums';

export class DetallistaLineItem extends BaseModel {
  type: string;
  number: number;
  tradeItemIdentification: {
    gtin: string;
  };
  alternateTradeItemIdentification: {
    type: LineItemAlternateTradeItemIdentificationType;
    text: string;
  };
  tradeItemDescriptionInformation: {
    longText: string;
    language: LineItemTradeItemDescriptionInformationLanguage;
  };
  invoicedQuantity: {
    unitOfMeasure: string;
    number: number;
  };
  aditionalQuantity: {
    QuantityType: LineItemAditionalQuantityQuantityType;
    number: number;
  };
  grossPrice: {
    Amount: number;
  };
  netPrice: {
    Amount: number;
  };
  AdditionalInformation: {
    referenceIdentification: {
      type: 'ON';
      text: string;
    };
  };
  Customs: {
    gln: string;
    ReferenceDate: Date;
    alternatePartyIdentification: {
      type: 'TN';
      text: string;
    };
    nameAndAddress: {
      name: string;
    };
  };
  LogisticUnits: {
    serialShippingContainerCode: {
      type: LineItemLogisticUnitsSerialShippingContainerCodeType;
      text: string;
    };
  };
  palletInformation: {
    palletQuantity: string;
    description: {
      type: LineItemPalletInformationDescriptionType;
      text: string;
    };
    transport: {
      methodOfPayment: LineItemPalletInformationTransportMethodOfPayment;
    };
  };
  extendedAttributes: {
    lotNumber: {
      productionDate: Date;
      text: string;
    };
  };
  allowanceCharge: {
    specialServicesType: LineItemAllowanceChargeSpecialServicesType;
    allowanceChargeType: LineItemAllowanceChargeAllowanceChargeType;
    settlementType: LineItemAllowanceChargeSettlementType;
    sequenceNumber: string;
    monetaryAmountOrPercentage: {
      percentagePerUnit: string;
      ratePerUnit: {
        amountPerUnit: string;
      };
    };
    tradeItemTaxInformation: {
      taxTypeDescription: LineItemAllowanceChargeTradeItemTaxInformationTaxTypeDescription;
      referenceNumber: string;
      taxCategory: LineItemAllowanceChargeTradeItemTaxInformationTaxCategory;
      tradeItemTaxAmount: {
        taxPercentage: number;
        taxAmount: number;
      };
    };
    totalLineAmount: {
      grossAmount: {
        Amount: number;
      };
      netAmount: {
        Amount: number;
      };
    };
  };

  baseData() {
    this.type = null;
    this.number = null;
    this.tradeItemIdentification = {
      gtin: null,
    };
    this.alternateTradeItemIdentification = {
      type: LineItemAlternateTradeItemIdentificationType.BUYER_ASSIGNED,
      text: null,
    };
    this.tradeItemDescriptionInformation = {
      longText: null,
      language: LineItemTradeItemDescriptionInformationLanguage.ES,
    };
    this.invoicedQuantity = {
      unitOfMeasure: null,
      number: null,
    };
    this.aditionalQuantity = {
      QuantityType: LineItemAditionalQuantityQuantityType.FREE_GOODS,
      number: null,
    };
    this.grossPrice = {
      Amount: null,
    };
    this.netPrice = {
      Amount: null,
    };
    this.AdditionalInformation = {
      referenceIdentification: {
        type: 'ON',
        text: null,
      },
    };
    this.Customs = {
      gln: null,
      ReferenceDate: null,
      alternatePartyIdentification: {
        type: 'TN',
        text: null,
      },
      nameAndAddress: {
        name: null,
      },
    };
    this.LogisticUnits = {
      serialShippingContainerCode: {
        type: LineItemLogisticUnitsSerialShippingContainerCodeType.BJ,
        text: null,
      },
    };
    this.palletInformation = {
      palletQuantity: null,
      description: {
        type: LineItemPalletInformationDescriptionType.BOX,
        text: null,
      },
      transport: {
        methodOfPayment: LineItemPalletInformationTransportMethodOfPayment.PAID_BY_BUYER,
      },
    };
    this.extendedAttributes = {
      lotNumber: {
        productionDate: null,
        text: null,
      },
    };
    this.allowanceCharge = {
      specialServicesType: LineItemAllowanceChargeSpecialServicesType.AA,
      allowanceChargeType: LineItemAllowanceChargeAllowanceChargeType.ALLOWANCE_GLOBAL,
      settlementType: LineItemAllowanceChargeSettlementType.CHARGE_TO_BE_PAID_BY_CUSTOMER,
      sequenceNumber: null,
      monetaryAmountOrPercentage: {
        percentagePerUnit: null,
        ratePerUnit: {
          amountPerUnit: null,
        },
      },
      tradeItemTaxInformation: {
        taxTypeDescription: LineItemAllowanceChargeTradeItemTaxInformationTaxTypeDescription.AAA,
        referenceNumber: null,
        taxCategory: LineItemAllowanceChargeTradeItemTaxInformationTaxCategory.RETENIDO,
        tradeItemTaxAmount: {
          taxPercentage: null,
          taxAmount: null,
        },
      },
      totalLineAmount: {
        grossAmount: {
          Amount: null,
        },
        netAmount: {
          Amount: null,
        },
      },
    };
  }
}
