import { UserState } from './../models/userState.model';


export interface AppState {
  readonly userState: UserState;
  readonly recipeState: any;
}
