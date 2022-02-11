import { DiotOperation } from '@enums/diot-operation.enum';
import { DiotType } from '@enums/diot-type.enum';

export class IDiotRecord {
  Type: DiotType | null;
  Operation: DiotOperation | null;
  Rfc: string;
  Company: string;
  Subtotal: number;
  Vat: number;
  Amount: number;
  Month: number;
  Year: number;
}
