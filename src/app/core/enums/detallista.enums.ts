export enum RequestForPaymentIdentificationEntityType {
  INVOICE = 'INVOICE',
  DEBIT_NOTE = 'DEBIT_NOTE',
  CREDIT_NOTE = 'CREDIT_NOTE',
  LEASE_RECEIPT = 'LEASE_RECEIPT',
  HONORARY_RECEIPT = 'HONORARY_RECEIPT',
  PARTIAL_INVOICE = 'PARTIAL_INVOICE',
  TRANSPORT_DOCUMENT = 'TRANSPORT_DOCUMENT',
  AUTO_INVOICE = 'AUTO_INVOICE',
}

export enum SpecialInstructionCode {
  AAB = 'AAB',
  DUT = 'DUT',
  PUR = 'PUR',
  ZZZ = 'ZZZ',
}

export enum OrderIdentificationReferenceIdentificationType {
  ON = 'ON',
}

export enum AdditionalInformationReferenceIdentificationType {
  AAE = 'AAE',
  CK = 'CK',
  ACE = 'ACE',
  ATZ = 'ATZ',
  DQ = 'DQ',
  IV = 'IV',
  ON = 'ON',
  AWR = 'AWR',
}

export enum SellerAlternatePartyIdentificationType {
  SELLER_ASSIGNED_IDENTIFIER_FOR_A_PARTY = 'SELLER_ASSIGNED_IDENTIFIER_FOR_A_PARTY',
  IEPS_REFERENCE = 'IEPS_REFERENCE',
}

export enum InvoiceCreatorAlternatePartyIdentificationType {
  VA = 'VA',
  IA = 'IA',
}

export enum CurrencyCurrencyFunction {
  BILLING_CURRENCY = 'BILLING_CURRENCY',
  PRICE_CURRENCY = 'PRICE_CURRENCY',
  PAYMENT_CURRENCY = 'PAYMENT_CURRENCY',
}

export enum CurrencyCurrencyISOCode {
  MXN = 'MXN',
  XEU = 'XEU',
  USD = 'USD',
}

export enum PaymentTermsNetPaymentNetPaymentTermsType {
  BASIC_NET = 'BASIC_NET',
  END_OF_MONTH = 'END_OF_MONTH',
  BASIC_DISCOUNT_OFFERED = 'BASIC_DISCOUNT_OFFERED',
}

export enum PaymentTermsDiscountType {
  ALLOWANCE_BY_PAYMENT_ON_TIME = 'ALLOWANCE_BY_PAYMENT_ON_TIME',
  SANCTION = 'SANCTION',
}

export enum PaymentTermsPaymentTermsEvent {
  DATE_OF_INVOICE = 'DATE_OF_INVOICE',
  EFFECTIVE_DATE = 'EFFECTIVE_DATE',
}

export enum PaymentTermsPaymentTermsRelationTime {
  REFERENCE_AFTER = 'REFERENCE_AFTER'
}

export enum AllowanceChargeSpecialServicesType {
  AA = 'AA',
  AJ = 'AJ',
  ADO = 'ADO',
  ADT = 'ADT',
  ADS = 'ADS',
  ABZ = 'ABZ',
  DA = 'DA',
  EAA = 'EAA',
  EAB = 'EAB',
  PI = 'PI',
  TAE = 'TAE',
  SAB = 'SAB',
  RAA = 'RAA',
  PAD = 'PAD',
  FG = 'FG',
  FA = 'FA',
  TD = 'TD',
  TS = 'TS',
  TX = 'TX',
  TZ = 'TZ',
  ZZZ = 'ZZZ',
  VAB = 'VAB',
  UM = 'UM',
  DI = 'DI',
  CAC = 'CAC',
  COD = 'COD',
  FC = 'FC',
  FI = 'FI',
  HD = 'HD',
  QD = 'QD',
}

export enum AllowanceChargeMonetaryAmountOrPercentageRateBase {
  INVOICE_VALUE = 'INVOICE_VALUE',
}

export enum AllowanceChargeAllowanceChargeType {
  ALLOWANCE_GLOBAL = 'ALLOWANCE_GLOBAL',
  CHARGE_GLOBAL = 'CHARGE_GLOBAL',
}

export enum AllowanceChargeSettlementType {
  BILL_BACK = 'BILL_BACK',
  OFF_INVOICE = 'OFF_INVOICE',
}

export enum LineItemAlternateTradeItemIdentificationType {
  BUYER_ASSIGNED = 'BUYER_ASSIGNED',
  SUPPLIER_ASSIGNED = 'SUPPLIER_ASSIGNED',
  SERIAL_NUMBER = 'SERIAL_NUMBER',
  GLOBAL_TRADE_ITEM_IDENTIFICATION = 'GLOBAL_TRADE_ITEM_IDENTIFICATION',
}

export enum LineItemTradeItemDescriptionInformationLanguage {
  ES = 'ES',
  EN = 'EN',
}

export enum LineItemAditionalQuantityQuantityType {
  NUM_CONSUMER_UNITS = 'NUM_CONSUMER_UNITS',
  FREE_GOODS = 'FREE_GOODS',
}

export enum LineItemLogisticUnitsSerialShippingContainerCodeType {
  BJ = 'BJ',
  SRV = 'SRV',
}

export enum LineItemPalletInformationDescriptionType {
  EXCHANGE_PALLETS = 'EXCHANGE_PALLETS',
  RETURN_PALLETS = 'RETURN_PALLETS',
  PALLET_80x100 = 'PALLET_80x100',
  CASE = 'CASE',
  BOX = 'BOX',
}

export enum LineItemPalletInformationTransportMethodOfPayment {
  PREPAID_BY_SELLER = 'PREPAID_BY_SELLER',
  PAID_BY_BUYER = 'PAID_BY_BUYER',
}

export enum LineItemAllowanceChargeSpecialServicesType {
  AA = 'AA',
  ADS = 'ADS',
  ADO = 'ADO',
  ABZ = 'ABZ',
  DA = 'DA',
  EAA = 'EAA',
  PI = 'PI',
  TAE = 'TAE',
  SAB = 'SAB',
  RAA = 'RAA',
  PAD = 'PAD',
  FG = 'FG',
  FA = 'FA',
  TD = 'TD',
  TS = 'TS',
  TX = 'TX',
  ZZZ = 'ZZZ',
  VAB = 'VAB',
  UM = 'UM',
  DI = 'DI',
  ADT = 'ADT',
  AJ = 'AJ',
  CAC = 'CAC',
  COD = 'COD',
  EAB = 'EAB',
  FC = 'FC',
  FI = 'FI',
  HD = 'HD',
  QD = 'QD',
}

export enum LineItemAllowanceChargeAllowanceChargeType {
  ALLOWANCE_GLOBAL = 'ALLOWANCE_GLOBAL',
  CHARGE_GLOBAL = 'CHARGE_GLOBAL',
}

export enum LineItemAllowanceChargeSettlementType {
  OFF_INVOICE = 'OFF_INVOICE',
  CHARGE_TO_BE_PAID_BY_VENDOR = 'CHARGE_TO_BE_PAID_BY_VENDOR',
  CHARGE_TO_BE_PAID_BY_CUSTOMER = 'CHARGE_TO_BE_PAID_BY_CUSTOMER',
}

export enum LineItemAllowanceChargeTradeItemTaxInformationTaxTypeDescription {
  GST = 'GST',
  VAT = 'VAT',
  LAC = 'LAC',
  AAA = 'AAA',
  ADD = 'ADD',
  FRE = 'FRE',
  LOC = 'LOC',
  STT = 'STT',
  OTH = 'OTH',
}

export enum LineItemAllowanceChargeTradeItemTaxInformationTaxCategory {
  TRANSFERIDO = 'TRANSFERIDO',
  RETENIDO = 'RETENIDO',
}

export enum TotalAllowanceChargeSpecialServicesType {
  AA = 'AA',
  ADS = 'ADS',
  ADO = 'ADO',
  ABZ = 'ABZ',
  DA = 'DA',
  EAA = 'EAA',
  PI = 'PI',
  TAE = 'TAE',
  SAB = 'SAB',
  RAA = 'RAA',
  PAD = 'PAD',
  FG = 'FG',
  FA = 'FA',
  TD = 'TD',
  TS = 'TS',
  TX = 'TX',
  ZZZ = 'ZZZ',
  VAB = 'VAB',
  UM = 'UM',
  DI = 'DI',
  ADT = 'ADT',
  AJ = 'AJ',
  CAC = 'CAC',
  COD = 'COD',
  EAB = 'EAB',
  FC = 'FC',
  FI = 'FI',
  HD = 'HD',
  QD = 'QD',
}

export enum TotalAllowanceChargeAllowanceOrChargeType {
  ALLOWANCE = 'ALLOWANCE',
  CHARGE = 'CHARGE',
}
