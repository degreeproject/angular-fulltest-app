import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

export const ADD_RECIPE       = '[RECIPESTATE] add';
export const REMOVE_RECIPE    = '[RECIPESTATE] Remove';

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;

    constructor(public payload: any) {}
}

export class RemoveRecipe implements Action {
    readonly type = REMOVE_RECIPE;

    constructor(public payload: number) {}
}

export type Actions = AddRecipe | RemoveRecipe;
