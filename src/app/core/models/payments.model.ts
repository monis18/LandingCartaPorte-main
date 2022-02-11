import { BaseModel } from '../_base/crud';

export class PaymentsModel extends BaseModel {
  id: number;
  Name: string;
  CreatedAt: Date;
  Plan: number;
  Amount: number;
  Card: string;
  ClientId: number;
  Status: number;
  Email: string;
  Invoiced: number;
  UserId: number;


  clear() {
    this.id = null;
    this.Name = '';
    this.CreatedAt = null;
    this.Plan = 2555;
    this.Amount = null;
    this.Card = '';
    this.ClientId = null;
    this.Status = null;
    this.Email = '';
    this.Invoiced = null;
    this.UserId = null;
  }
}
