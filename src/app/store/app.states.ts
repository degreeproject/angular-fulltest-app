import { userState } from './../models/userState.model';


export interface AppState {
  readonly userState: userState;
}
