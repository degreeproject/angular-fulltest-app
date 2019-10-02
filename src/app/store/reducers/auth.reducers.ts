import {ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from '@ngrx/store';
import * as UserStateActions from './../actions/auth.actions';
import { environment } from '../../../environments/environment';
import { userState } from './../../models/userState.model';

// tslint:disable-next-line: no-empty-interface
export interface State {}

const initialState: userState = {
  username: '',
  token: '',
  loggedIn: true
};

export function reducer(state: userState[] = [], action: UserStateActions.Actions) {
  switch (action.type) {
    case UserStateActions.SET_STATE:
      return [...state, action.payload];

    case UserStateActions.REMOVE_STATE:
      const index = action.payload;
      return [...state.slice(0, index), ...state.slice(index + 1)];

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<State> = {

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
