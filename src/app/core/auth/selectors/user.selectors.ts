import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HttpExtenstionsModel, QueryResultsModel } from '../../_base/crud';
import { User } from '../models/user.model';
import { UsersState } from '../reducers/user.reducers';


export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUserById = (userId: number) => createSelector(
  selectUsersState,
  usersState => usersState.entities[userId]
);

export const selectUsersPageLoading = createSelector(
  selectUsersState,
  usersState => {
    return usersState.listLoading;
  }
);

export const selectUsersActionLoading = createSelector(
  selectUsersState,
  usersState => usersState.actionsloading
);

export const selectLastCreatedUserId = createSelector(
  selectUsersState,
  usersState => usersState.lastCreatedUserId
);

export const selectUsersPageLastQuery = createSelector(
  selectUsersState,
  usersState => usersState.lastQuery
);

export const selectUsersInStore = createSelector(
  selectUsersState,
  usersState => {
    const items: User[] = Object.keys(usersState.entities).map(key => usersState.entities[key]);
    const httpExtension = new HttpExtenstionsModel();
    const result: User[] = httpExtension.sortArray(items, usersState.lastQuery.sortField, usersState.lastQuery.sortOrder);
    return new QueryResultsModel(result, usersState.totalCount, '');
  }
);

export const selectUsersShowInitWaitingMessage = createSelector(
  selectUsersState,
  usersState => usersState.showInitWaitingMessage
);

export const selectHasUsersInStore = createSelector(
  selectUsersState,
  queryResult => {
    if (!queryResult.totalCount) {
      return false;
    }

    return true;
  }
);
