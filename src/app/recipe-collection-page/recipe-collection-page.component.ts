import { Component, OnInit } from '@angular/core';
import { RecipePageService } from '../recipe-page/recipe-page.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.states';
import { UserState } from '../models/userState.model';

@Component({
  selector: 'app-recipe-collection-page',
  templateUrl: './recipe-collection-page.component.html',
  styleUrls: ['./recipe-collection-page.component.css']
})
export class RecipeCollectionPageComponent implements OnInit {

  /**
   * The constructor fetch the data from the global state manager.
   * @param recipeService Injecting the RecipePageService into the constructor.
   * @param store Injecting the Store with the interface AppState into the constructor.
   */
  constructor(private recipeService: RecipePageService, private store: Store<AppState>) {

    store.select('userState').subscribe(data => {
      this.stateUser = data;
    });

    store.select('recipeState').subscribe(recipe => {
      this.recipes = recipe[0];
    });
  }

  stateUser: UserState;
  recipes: any[];
  isLoaded = false;
  /**
   * Checks if there is a recipe in the state if there is not call function get recipes.
   */
  ngOnInit() {
    if (typeof(this.recipes) === 'undefined') {
      this.getRecipes();
    } else {
      this.isLoaded = true;
    }
  }
  /**
   * checks if the user is logged in.
   */
  isLoggedIn() {
    if (typeof(this.stateUser[0]) === 'undefined') {
      return false;
    } else {
      return this.stateUser[0].loggedIn;
    }
  }

  /**
   * Calls the recipeService to fetch the all recipes
   */
  getRecipes(): void {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.isLoaded = true;
    },
    error => {
    }
    );
  }

}
