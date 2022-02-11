import { BaseModel } from '@crud';

export class DetallistaTotalAmount extends BaseModel {
  Amount: number;

  baseData() {
    this.Amount = null;
  }
}
