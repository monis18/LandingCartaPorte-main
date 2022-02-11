import { DiotOperation } from '@enums/diot-operation.enum';
import { DiotType } from '@enums/diot-type.enum';

export class InvoiceSenderProviderModel {
  id: number;
  Company: string;
  Rfc: string;
  DiotType: DiotType;
  DiotOperation: DiotOperation;
}
