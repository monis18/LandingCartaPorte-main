import { InvoiceSenderModel } from '@models/invoice-sender/invoice-sender.model';
import { UserModel } from '@models/user/user.model';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  Login = '[Login Component] Login',
  LoginSuccess = '[Login Component] Login Success',
  LoginError = '[Login Component] Login Error',
  Logout = '[Login Component] Logout',
  UserOnServerPreregistered = '[Register Component] On Server Preregistered',
  UserOnServerRegistered = '[Register Component] On Server Registered',
  UserRegistered = '[Register Component] User Register',
  SendEmail = '[Register Component] Send Email',
  SaveUser = '[Register Component] User Saved',
  LoginSaveUser = '[ Login Component ] Save User And Token Login',
  LoadLocalData = '[App Component ] Save Local Data',
  SetLoggedIn = '[ App Component ] Set LoggedIn',
  UpdateUser = '[Register Component] User Updated',
  PasswordForgotten = '[Password Component] Recover Password',
  PasswordUpdated = '[Password Component] Password Updated',
  UserLoaded = '[Load User] Auth API',
  AuthActionToggleLoading = '[Auth Component] Profile Action Toggle Loading',
  UpdateTour = '[ Global ] Update Tour'
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: { user: UserModel }) { }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor(public payload: {
    user: UserModel,
    invoiceSenders: InvoiceSenderModel[],
    tokenInvoiceSender: string,
    tokenUser: string }) { }
}

export class LoginError implements Action {
  readonly type = AuthActionTypes.LoginError;
  constructor(public payload: { error }) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class UserOnServerPreregistered implements Action {
  readonly type = AuthActionTypes.UserOnServerPreregistered;
  constructor(public payload: { user: UserModel }) { }
}

export class UserOnServerRegistered implements Action {
  readonly type = AuthActionTypes.UserOnServerRegistered;
  constructor(public payload: { user: UserModel }) { }
}

export class UserRegistered implements Action {
  readonly type = AuthActionTypes.UserRegistered;
  constructor(public payload: { user: UserModel }) { }
}

export class SendEmail implements Action {
  readonly type = AuthActionTypes.SendEmail;
  constructor(public payload: { email: string }) { }
}

export class SaveUser implements Action {
  readonly type = AuthActionTypes.SaveUser;
  constructor(public payload: { user: UserModel }) { }
}

export class LoginSaveUser implements Action {
  readonly type = AuthActionTypes.LoginSaveUser;
  constructor(public payload: { user: UserModel, tokenUser: string }) { }
}

export class LoadLocalData implements Action {
  readonly type = AuthActionTypes.LoadLocalData;
}

export class SetLoggedIn implements Action {
  readonly type = AuthActionTypes.SetLoggedIn;
  constructor(public payload: { loggedIn: boolean }) { }
}

export class UpdateUser implements Action {
  readonly type = AuthActionTypes.UpdateUser;
  constructor(public payload: { user: UserModel }) { }
}

export class PasswordForgotten implements Action {
  readonly type = AuthActionTypes.PasswordForgotten;
  constructor(public payload: { rfc: string }) { }
}

export class PasswordUpdated implements Action {
  readonly type = AuthActionTypes.PasswordUpdated;
  constructor(public payload: { password: string, userId: number }) { }
}

export class UserLoaded implements Action {
  readonly type = AuthActionTypes.UserLoaded;
  constructor(public payload: { user: UserModel }) { }
}

export class AuthActionToggleLoading implements Action {
  readonly type = AuthActionTypes.AuthActionToggleLoading;
  constructor(public payload: { isLoading: boolean }) { }
}

export class UpdateTour implements Action {
  readonly type = AuthActionTypes.UpdateTour;
  constructor(public payload: { user: UserModel } ) { }
}

export type AuthActions = Login
  | LoginSuccess
  | LoginError
  | Logout
  | UserOnServerPreregistered
  | UserOnServerRegistered
  | SendEmail
  | UserRegistered
  | UserLoaded
  | SaveUser
  | LoginSaveUser
  | LoadLocalData
  | SetLoggedIn
  | UpdateUser
  | PasswordForgotten
  | PasswordUpdated
  | AuthActionToggleLoading
  | UpdateTour;
