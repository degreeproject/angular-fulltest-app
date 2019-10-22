import { Component, OnInit } from '@angular/core';
import { RecipePageService } from './recipe-page.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.states';
import { UserState } from '../models/userState.model';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {

  /**
   * The constructor fetch the data from the global state manager.
   * @param recipeService Injecting the RecipePageService into the constructor.
   * @param route Injecting the ActivatedRoute into the constructor.
   * @param store Injecting the Store with the interface AppState into the constructor.
   */
  constructor(private recipeService: RecipePageService, private route: ActivatedRoute, private store: Store<AppState>) {
    store.select('userState').subscribe(data => {
      this.stateUser = data;
    });
    store.select('recipeState').subscribe(recipe => {
      this.recipes = recipe[0];
    });
  }

  stateUser: UserState;
  recipes: any = [];
  recipe: any = [];
  comments: any = [];

  /**
   * Gets the recipe ID from the route url and then get the recipe from the variable holding the global state,
   * else it calls the method getRecipe with the ID
   */
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (this.recipes) {
      this.recipe = this.recipes.find((ele) => {
        return ele.id === id;
      });
      this.comments = this.recipe.comments;
    }
    if (typeof(this.recipes) === 'undefined') {
      this.getRecipe(id);
    }
  }
  /**
   * Calls the recipeService to fetch the a specific recipe
   * @param id The recipe id that should fetched
   */
  getRecipe(id: string): void {
    this.recipeService.getRecipe(id).subscribe(recipes => {
      this.recipe = recipes;
      this.comments = this.recipe.comments;
    },
    error => {
    });
  }

}
