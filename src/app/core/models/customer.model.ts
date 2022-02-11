import { BaseModel } from '../_base/crud';

export class CustomersModel extends BaseModel {
  id: number;
  CustomerId: number;
  UserId: number;
  Token: string;
  Last4: string;

  clear() {
    this.id = null,
    this.CustomerId = null,
    this.UserId = null,
    this.Token = '',
    this.Last4 = '';
  }
}
