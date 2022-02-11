import { BaseModel } from '../../_base/crud';

export class UserModel extends BaseModel {
  id: number;
  User: string;
  Password: string;
  Name: string;
  Rfc: string;
  Plan: number;
  CollectedAt: Date;
  SubscrId: string;
  Active: number;
  Email: string;
  Phone: string;
  Origin: string;
  PaidImage: string;
  PayDay: Date;
  LastPayment: Date;
  Person: string;
  Ip: string;
  Type: string;
  MultiRfc: number;
  Tour: number;
  AccessToken?: string;
  RefreshToken?: string;

  clear(): void {
    this.id = null;
    this.User = '';
    this.Password = '';
    this.Name = '';
    this.Rfc = '';
    this.Email = '';
    this.Plan = 2555;
    this.CollectedAt = null;
    this.SubscrId = null;
    this.Active = null;
    this.Email = '';
    this.Phone = '';
    this.Origin = '';
    this.PaidImage = '';
    this.PayDay = null;
    this.LastPayment = null;
    this.Person = '';
    this.Tour = null;
    this.Ip = '';
    this.AccessToken = '';
  }
}
