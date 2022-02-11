export enum VWMTipoDocumentoFiscal {
  'Factura' = 'FA',
  'Nota de crédito' = 'CR',
  'Nota de débito' = 'CA',
  'Comprobante gastos (No fiscal)' = 'CG',
}

export enum VWMTipoDocumentoVWM {
  'Materiales todos los tipos' = 'PMT',
  'Todos los servicios' = 'PSV',
  'Seguros' = 'PSG',
  'Fletes' = 'PFL',
  'Material auxiliar en consignación, material no almacenable y material por ARIBA' = 'PCN',
  'Comprobación de gastos publicidad y aduanas (no fiscal)' = 'PGC',
}

export enum VWMDivision {
  VW = 'VW',
  INFODE = 'INFODE',
  VWSP = 'VWSP',
}

export enum VWMTipoMoneda {
  'Canadian Dollar' = 'CAD',
  'European Currency Unit' = 'EUR',
  'Japanese Yen' = 'JPY',
  'Mexican Peso at average rate' = 'MXP',
  'American Dollar' = 'USD',
  'Austrian Schilling' = 'ATS',
  'Australian Dollar' = 'AUD',
  'Belgian Franc' = 'BEF',
  'centenario' = 'CEN',
  'Swiss Franc' = 'CHF',
  'Corona Sueca' = 'CZK',
  'German Mark' = 'DEM',
  'German Mark for Project System' = 'DEM_P',
  'Danish Krone' = 'DKK',
  'European Bank Currency Unit' = 'ECU',
  'Spanish Peseta' = 'ESP',
  'Finnish Markka' = 'FIM',
  'French Franc' = 'FRF',
  'British Pound' = 'GBP',
  'Hong Kong Dollar' = 'HKD',
  'Hungarian Forint' = 'HUF',
  'Indeonesian Rupiah' = 'IDR',
  'Libra irlandesa' = 'IEP',
  'Italian Lira' = 'ITL',
  'Kuwaiti Dinar' = 'KWD',
  'Franco Luxemburgues' = 'LUF',
  'Lira Maltesa' = 'MTL',
  'Mexican Peso using selling exchange rate' = 'MXP1',
  'Mexican Peso using buying exchange rate' = 'MXP2',
  'Mexican Pesos for Project System' = 'MXP_P',
  'Malaysian Ringgit' = 'MYR',
  'Dutch Guilder' = 'NLG',
  'Norwegian Krone' = 'NOK',
  'onza troy plata' = 'ONZ',
  'Philippino Peso' = 'PHP',
  'Portuguese Escudo' = 'PTE',
  'Swedish Krona' = 'SEK',
  'Singapore Dollar' = 'SGD',
  'Corona Eslovaca' = 'SKK',
  'Russian Ruble' = 'SUR',
  'Thailand Baht' = 'THB',
  'Unidad de Inversión' = 'UDI',
  'European Community Currency' = 'XEU',
  'South African Rand' = 'ZAR',
}

export enum VWMCodigoImpuestoMateriales {
  // Materiales
  '0% Material proveedores extranjeros' = 'HZ',
  '0% Material Nacional' = 'V0',
  '16% Material Nacional de Serie' = '1D',
  '16% Otros Materiales Nacionales' = '1A',
}

export enum VWMCodigoImpuestoServicios {
  // Servicios
  'IVA 0% proveedores extranjeros' = 'HZ',
  'IVA 0% ' = 'V0',
  'IVA 15% Honorarios' = 'HE',
  'IVA 16%' = '1A',
}

export enum VWMCodigoImpuestoOtros {
  // Otros
  '15% POR COMPRAS MATERIAL PRODUCTIVO' = 'W5',
  '3.75% IVA POR BOLETOS DE AVION' = 'HO',
  // '3.75% IVA POR BOLETOS DE AVION' = 'W3',
}

export enum VWMCodigoImpuestoZonasFonterizas {
  // IVA en zonas fronterizas
  '10% IVA POR COMPRAS GRAVABLES' = 'F0',
  '10% IVA POR FLETES' = 'F3',
  '10% HONORARIOS' = 'FE',
  '10% SERVICIOS' = 'FC',
  '11% IVA POR OPERACIONES EN ZONA FRONTERIZA' = '1B',
}

export type VWMCodigoImpuesto =
  | VWMCodigoImpuestoMateriales
  | VWMCodigoImpuestoServicios
  | VWMCodigoImpuestoOtros
  | VWMCodigoImpuestoZonasFonterizas;

export enum VWMTipoProveedor {
  'Nacionales' = '6001',
  'Extranjeros' = '6002',
  'Afiliados' = '6003',
}

export enum VWMUnidadDeNegocios {
  INFODE = 'INFODE',
  VWSP = 'VWSP',
}
