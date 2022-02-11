// NGRX
import { environment } from '@environments/environment';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, RootStoreConfig } from '@ngrx/store';

// tslint:disable-next-line:no-empty-interface
export interface AppState { }

export const reducers: ActionReducerMap<AppState> = { router: routerReducer };

export const metaReducers: RootStoreConfig<AppState> =
  !environment.production ? {
    runtimeChecks: {
      strictStateImmutability: false,
      strictActionImmutability: false,
    }
  } : {};
