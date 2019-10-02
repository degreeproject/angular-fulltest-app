import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { userState } from './../../models/userState.model';

// Section 2
export const SET_STATE       = '[USERSTATE] set';
export const REMOVE_STATE    = '[USERSTATE] Remove';

// Section 3
export class SetState implements Action {
    readonly type = SET_STATE;

    constructor(public payload: userState) {}
}

export class RemoveState implements Action {
    readonly type = REMOVE_STATE;

    constructor(public payload: number) {}
}

export type Actions = SetState | RemoveState;
