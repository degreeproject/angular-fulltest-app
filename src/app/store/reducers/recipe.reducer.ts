import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import * as RecipeStateActions from './../actions/recipe.actions';
import { environment } from '../../../environments/environment';

// tslint:disable-next-line: no-empty-interface
export interface State {}

/**
 * Sets and remove recipeState in the global state
 * @param state The default state (empty)
 * @param action The different actions
 */
export function recipeReducer(state: any[] = [], action: RecipeStateActions.Actions) {
  switch (action.type) {
    case RecipeStateActions.ADD_RECIPE:
      return [...state, action.payload];

    case RecipeStateActions.REMOVE_RECIPE:
      const index = action.payload;
      return [...state.slice(0, index), ...state.slice(index + 1)];

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<State> = {

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
