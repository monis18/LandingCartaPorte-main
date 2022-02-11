import { DiotOperation } from '@enums/diot-operation.enum';
import { DiotType } from '@enums/diot-type.enum';

export class InvoiceSenderProvidersTable {
  // tslint:disable-next-line: variable-name
  public static invoice_sender_providers: any[] = [
    {
      id: 1,
      Rfc: 'TZS316456HY5',
      Company: 'Tori Roskruge',
      DiotType: DiotType['Proovedor Nacional'],
      DiotOperation: DiotOperation['Prestación de Servicios Profesionales'],
    },
    {
      id: 2,
      Rfc: 'IJO231544QF1',
      Company: 'Adriana Mixhel',
      DiotType: null,
      DiotOperation: null,
    },
  ];
}
