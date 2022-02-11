import { UsersTable } from './users.table';
import { PaymentsTable } from './payments.table';

export class UsersDataContext {
  public static users: any = UsersTable.users;
  public static payments: any = PaymentsTable.payments;
}
