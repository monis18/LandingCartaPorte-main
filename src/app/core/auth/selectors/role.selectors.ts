// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// CRUD
import { HttpExtenstionsModel, QueryResultsModel } from '../../_base/crud';
import * as fromRole from '../reducers/role.reducers';
// State
import { RolesState } from '../reducers/role.reducers';
import { Role } from './../models/role.model';


export const selectRolesState = createFeatureSelector<RolesState>('roles');

export const selectRoleById = (roleId: number) => createSelector(
  selectRolesState,
  rolesState => rolesState.entities[roleId]
);

export const selectAllRoles = createSelector(
  selectRolesState,
  fromRole.selectAll
);

export const selectAllRolesIds = createSelector(
  selectRolesState,
  fromRole.selectIds
);

export const allRolesLoaded = createSelector(
  selectRolesState,
  rolesState => rolesState.isAllRolesLoaded
);


export const selectRolesPageLoading = createSelector(
  selectRolesState,
  rolesState => rolesState.listLoading
);

export const selectRolesActionLoading = createSelector(
  selectRolesState,
  rolesState => rolesState.actionsloading
);

export const selectLastCreatedRoleId = createSelector(
  selectRolesState,
  rolesState => rolesState.lastCreatedRoleId
);

export const selectRolesShowInitWaitingMessage = createSelector(
  selectRolesState,
  rolesState => rolesState.showInitWaitingMessage
);


export const selectQueryResult = createSelector(
  selectRolesState,
  rolesState => {
    const items: Role[] = Object.keys(rolesState.entities).map(key => rolesState.entities[key]);
    const httpExtension = new HttpExtenstionsModel();
    const result: Role[] = httpExtension.sortArray(items, rolesState.lastQuery.sortField, rolesState.lastQuery.sortOrder);

    return new QueryResultsModel(rolesState.queryResult, rolesState.queryRowsCount);
  }
);
