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
  ngOnInit() {
    if (typeof(this.recipes) === 'undefined') {
      this.getRecipes();
    } else {
      this.isLoaded = true;
    }
  }
  isLoggedIn() {
    if (typeof(this.stateUser[0]) === 'undefined') {
      return false;
    } else {
      return this.stateUser[0].loggedIn;
    }
  }

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
