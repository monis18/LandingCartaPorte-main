import { IBlackListRecord } from '@interfaces/black-list-record.interface';

export class InvoiceSenderBlackListTable {
  public static records: IBlackListRecord[] = [
    {
      id: 1,
      invoiceSenderId: 3,
      ConsultedDate: new Date('01/02/2020'),
      Rfc: 'GAGF500215TWA',
      Company: 'FRANCISCA GARCIA GUTIERREZ',
      Status: 'CANCELADOS',
      UpdateDate: new Date('01/11/2014'),
    },
    {
      id: 2,
      invoiceSenderId: 3,
      ConsultedDate: new Date('01/01/2020'),
      Rfc: 'GAGF530705UN0',
      Company: 'FERMIN CARMELO GALINDO GOMEZ',
      Status: 'CANCELADOS',
      UpdateDate: new Date('01/06/2016'),
    },
    {
      id: 3,
      invoiceSenderId: 3,
      ConsultedDate: new Date('01/03/2020'),
      Rfc: 'GAGF590911B53',
      Company: 'FEDERICO GARCIA GONZALEZ',
      Status: 'CANCELADOS',
      UpdateDate: new Date('01/02/2014'),
    },
  ];
}
