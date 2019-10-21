import { Component, OnInit } from '@angular/core';
import { RecipePageService } from './recipe-page/recipe-page.service';
import { UserState } from './models/userState.model';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.states';
import * as authActions from './store/actions/auth.actions';
import * as recipeActions from './store/actions/recipe.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

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
      this.stateRecipe = recipe[0];
    });

  }

  stateRecipe: any;
  stateUser: UserState;
  users: any = [];
  recipes: any = [];
  loggedIn = false;
  userStorage: any;


  ngOnInit() {
    this.checkLocalStorage();
    this.getRecipes();
  }

  /**
   * adds all recipes to the global state
   * @param recipes the recipe array
   */
  addRecipeToState(recipes: any) {
    this.store.dispatch(new recipeActions.AddRecipe(recipes));
  }
/**
 * Sets the userstate to logged in.
 * @param username The username of the logged in user
 * @param access_token The user's JWT
 * @param loggedIn A boolean that which is true fore logged in users
 */
  // tslint:disable-next-line: variable-name
  setUserState(username: string, access_token: string, loggedIn: boolean) {
    this.store.dispatch(new authActions.SetState({username, token_type: 'Bearer', access_token, loggedIn}));
  }
  /**
   * get the localStorage
   */
  getLocalStorage() {
    this.userStorage = JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Checks if there is a localStorage, if it is set userState
   */
  checkLocalStorage() {
    if (localStorage.getItem('user')) {
      this.getLocalStorage();
      this.setUserState(this.userStorage.username, this.userStorage.token.access_token, true);
      return;
    } else {
      return;
    }
  }

  /**
   * Get all recipes
   */
  getRecipes(): void {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.addRecipeToState(recipes);


    });
  }
}
