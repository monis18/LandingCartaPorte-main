export class InvoiceSendersTable {
  // tslint:disable-next-line: variable-name
  public static invoice_senders: any[] = [
    {
      id: 1,
      userId: 2,
      BusinessName: 'Tostadora S.A de C.V',
      Rfc: 'TST973008JUX',
      Regimen: '601',
      AdditionalRegimen: '608',
      Logo: 'loguito',
      Street: 'Jesus Demetrio',
      NumInt: '309',
      NumOut: '1',
      Zipcode: '20900',
      InvoiceLugarExpedicion: 'Aguascalientes',
      Location: 'Chicahuales',
      City: 'Aguascalientes',
      Municipality: 'Jesus Maria',
      CerCsd: '',
      KeyCsd: 'lola',
      CsdPass: '',
      ExpirationDateCsd: null, // 2020-05-20T12:16:33.229Z
      CerField: 'cerfield',
      KeyField: 'keyfield',
      FieldPass: 'fieldpass',
      ExpirationDateField: '2020-07-20T12:16:33.229Z', // 2020-07-20T12:16:33.229Z
      Manifiesto: false,
      ManifiestoFirma: '',
      Ciec: '',
      Curp: '',
      RegistroPatronal: '',
      RfcPatron: '',
      Email: 'tostadora@tostadora.com'
    },
    {
      id: 2,
      userId: 1,
      BusinessName: 'Visoor S.A de C.V',
      Rfc: 'YQB973008HU3',
      Regimen: '601',
      AdditionalRegimen: '608',
      // tslint:disable-next-line: max-line-length
      Logo: 'data:image/png;base64,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',
      Street: 'Jesus Demetrio',
      NumInt: '309',
      NumOut: '1',
      Zipcode: '20900',
      InvoiceLugarExpedicion: 'Aguascalientes',
      Location: 'Chicahuales',
      City: 'Aguascalientes',
      Municipality: 'Jesus Maria',
      CerCsd: '',
      KeyCsd: '',
      CsdPass: '',
      ExpirationDateCsd: null, // 2020-05-20T12:16:33.229Z
      CerField: '',
      KeyField: '',
      FieldPass: '',
      ExpirationDateField: null, // 2020-07-20T12:16:33.229Z
      Manifiesto: false,
      ManifiestoFirma: null,
      Ciec: '',
      Origin: 1,
      Curp: '',
      RegistroPatronal: '',
      RfcPatron: '',
      Email: 'visoor@visoor.com'
    },
    {
      id: 3,
      userId: 1,
      BusinessName: 'Tostadora S.A de C.V',
      Rfc: 'TST973008JUX',
      Regimen: '601',
      AdditionalRegimen: '608',
      Logo: 'loguito',
      Street: 'Jesus Demetrio',
      NumInt: '309',
      NumOut: '1',
      Zipcode: '20900',
      InvoiceLugarExpedicion: 'Aguascalientes',
      Location: 'Chicahuales',
      City: 'Aguascalientes',
      Municipality: 'Jesus Maria',
      CerCsd: '',
      KeyCsd: 'lola',
      CsdPass: '',
      ExpirationDateCsd: null, // 2020-05-20T12:16:33.229Z
      CerField: 'cerfield',
      KeyField: 'keyfield',
      FieldPass: 'fieldpass',
      ExpirationDateField: '2020-07-20T12:16:33.229Z', // 2020-07-20T12:16:33.229Z
      Manifiesto: false,
      ManifiestoFirma: '',
      Ciec: '',
      Curp: '',
      RegistroPatronal: '',
      RfcPatron: '',
      Email: 'tostadora@tostadora.com'
    },
    {
      id: 4,
      userId: 1,
      BusinessName: 'Visoor S.A de C.V',
      Rfc: 'RES973008HU3',
      Regimen: '601',
      AdditionalRegimen: '608',
      Logo: 'loguito',
      Street: 'Jesus Demetrio',
      NumInt: '309',
      NumOut: '1',
      Zipcode: '20900',
      InvoiceLugarExpedicion: 'Aguascalientes',
      Location: 'Chicahuales',
      City: 'Aguascalientes',
      Municipality: 'Jesus Maria',
      CerCsd: '',
      KeyCsd: '',
      CsdPass: '',
      ExpirationDateCsd: null, // 2020-05-20T12:16:33.229Z
      CerField: '',
      KeyField: '',
      FieldPass: '',
      ExpirationDateField: null, // 2020-07-20T12:16:33.229Z
      Manifiesto: false,
      ManifiestoFirma: null,
      Ciec: '',
      Curp: '',
      RegistroPatronal: '',
      RfcPatron: '',
      Email: 'visoor@visoor.com'
    },
    {
      id: 5,
      userId: 1,
      BusinessName: 'Visoor S.A de C.V',
      Rfc: 'UNM413008HU3',
      Regimen: '601',
      AdditionalRegimen: '608',
      Logo: 'loguito',
      Street: 'Jesus Demetrio',
      NumInt: '309',
      NumOut: '1',
      Zipcode: '20900',
      InvoiceLugarExpedicion: 'Aguascalientes',
      Location: 'Chicahuales',
      City: 'Aguascalientes',
      Municipality: 'Jesus Maria',
      CerCsd: '',
      KeyCsd: '',
      CsdPass: '',
      ExpirationDateCsd: null, // 2020-05-20T12:16:33.229Z
      CerField: '',
      KeyField: '',
      FieldPass: '',
      ExpirationDateField: null, // 2020-07-20T12:16:33.229Z
      Manifiesto: false,
      ManifiestoFirma: null,
      Ciec: '',
      Curp: '',
      RegistroPatronal: '',
      RfcPatron: '',
      Email: 'visoor@visoor.com'
    },
    {
      id: 6,
      userId: 1,
      BusinessName: 'Visoor S.A de C.V',
      Rfc: 'PQR123008HU3',
      Regimen: '601',
      AdditionalRegimen: '608',
      Logo: 'loguito',
      Street: 'Jesus Demetrio',
      NumInt: '309',
      NumOut: '1',
      Zipcode: '20900',
      InvoiceLugarExpedicion: 'Aguascalientes',
      Location: 'Chicahuales',
      City: 'Aguascalientes',
      Municipality: 'Jesus Maria',
      CerCsd: '',
      KeyCsd: '',
      CsdPass: '',
      ExpirationDateCsd: null, // 2020-05-20T12:16:33.229Z
      CerField: '',
      KeyField: '',
      FieldPass: '',
      ExpirationDateField: null, // 2020-07-20T12:16:33.229Z
      Manifiesto: false,
      ManifiestoFirma: null,
      Ciec: '',
      Curp: '',
      RegistroPatronal: '',
      RfcPatron: '',
      Email: 'visoor@visoor.com'
    },
    {
      id: 7,
      userId: 1,
      BusinessName: 'Visoor S.A de C.V',
      Rfc: 'LUS973008HU3',
      Regimen: '601',
      AdditionalRegimen: '608',
      Logo: 'loguito',
      Street: 'Jesus Demetrio',
      NumInt: '309',
      NumOut: '1',
      Zipcode: '20900',
      InvoiceLugarExpedicion: 'Aguascalientes',
      Location: 'Chicahuales',
      City: 'Aguascalientes',
      Municipality: 'Jesus Maria',
      CerCsd: '',
      KeyCsd: '',
      CsdPass: '',
      ExpirationDateCsd: null, // 2020-05-20T12:16:33.229Z
      CerField: '',
      KeyField: '',
      FieldPass: '',
      ExpirationDateField: null, // 2020-07-20T12:16:33.229Z
      Manifiesto: false,
      ManifiestoFirma: null,
      Ciec: '',
      Curp: '',
      RegistroPatronal: '',
      RfcPatron: '',
      Email: 'visoor@visoor.com'
    },
  ];
}
