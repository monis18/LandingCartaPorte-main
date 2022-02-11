// Actions
// Models
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { UserModel } from '../../models/user/user.model';
import { InvoiceSenderModel } from '../../../core/models/invoice-sender/invoice-sender.model';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { UsersTable } from '@server/users.table';

export interface AuthState extends EntityState<UserModel> {
  loggedIn: boolean;
  lastUserRegisteredId: number;
  isUserLoaded: boolean;
  tokenUser: string;
  actionsloading: boolean;
  userCode: number;
  user: UserModel;
}

export const adapter: EntityAdapter<UserModel> = createEntityAdapter<UserModel>();

export const initialAuthState: AuthState = adapter.getInitialState({
  loggedIn: false,
  lastUserRegisteredId: null,
  isUserLoaded: false,
  tokenUser: null,
  actionsloading: false,
  userCode: null,
  user: new UserModel(),
});

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.Login: return {
      ...state
    };
    case AuthActionTypes.LoginSuccess: return {
      ...state, loggedIn: true
    };
    case AuthActionTypes.LoginError: return {
      ...state
    };
    case AuthActionTypes.UserOnServerRegistered: return {
      ...state
    };
    case AuthActionTypes.UserRegistered: return adapter.addOne(action.payload.user, {
      ...state, lastUserRegisteredId: action.payload.user.id, user: action.payload.user
    });
    case AuthActionTypes.SaveUser: return adapter.addOne(action.payload.user, {
      ...state, user: action.payload.user
    });
    case AuthActionTypes.LoginSaveUser: return adapter.addOne(action.payload.user, {
      ...state, tokenUser: action.payload.tokenUser, user: action.payload.user
    });
    case AuthActionTypes.UpdateUser:
      const userState: UserModel = new UserModel();
      userState.clear();
      Object.assign(userState, {...state.user});
      return {
        ...state, user: userState
    };
    case AuthActionTypes.PasswordForgotten: return {
      ...state
    };
    case AuthActionTypes.PasswordUpdated:
      const newUserState: UserModel = new UserModel();
      newUserState.clear();
      Object.assign(newUserState, {...state.user});
      newUserState.Password = action.payload.password;
      return {
        ...state, user: newUserState
    };
    case AuthActionTypes.AuthActionToggleLoading: return {
      ...state, actionsloading: action.payload.isLoading
    };
    case AuthActionTypes.SetLoggedIn: return{
      ...state, loggedIn: action.payload.loggedIn
    };
    case AuthActionTypes.UpdateTour:
      const usersState: UserModel = new UserModel();
      usersState.clear();
      Object.assign(usersState, {...state.user});
      console.log(userState);
      usersState.Tour = action.payload.user.Tour;
      return {
        ...state, user: usersState
    };
    case AuthActionTypes.Logout:
      return initialAuthState;
    default:
      return state;
  }
}

export const AuthState = createFeatureSelector<UserModel>('users');

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
