import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { UserState } from './../../models/userState.model';

export const SET_STATE       = '[USERSTATE] set';
export const REMOVE_STATE    = '[USERSTATE] Remove';

export class SetState implements Action {
    readonly type = SET_STATE;

    constructor(public payload: UserState) {}
}

export class RemoveState implements Action {
    readonly type = REMOVE_STATE;

    constructor(public payload: number) {}
}

export type Actions = SetState | RemoveState;
