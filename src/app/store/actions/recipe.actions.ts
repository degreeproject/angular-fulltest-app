import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

// Section 2
export const ADD_RECIPE       = '[RECIPESTATE] add';
export const REMOVE_RECIPE    = '[RECIPESTATE] Remove';

// Section 3
export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;

    constructor(public payload: any) {}
}

export class RemoveRecipe implements Action {
    readonly type = REMOVE_RECIPE;

    constructor(public payload: number) {}
}

export type Actions = AddRecipe | RemoveRecipe;
