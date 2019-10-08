import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
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

  constructor(private appService: AppService, private recipeService: RecipePageService, private store: Store<AppState>) {
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
    this.already();
    this.getRecipes();
  }

  addRecipeToState(recipes: any) {
    this.store.dispatch(new recipeActions.AddRecipe(recipes));
  }
  // tslint:disable-next-line: variable-name
  setUserState(username: string, access_token: string, loggedIn: boolean) {
    this.store.dispatch(new authActions.SetState({username, token_type: 'Bearer', access_token, loggedIn}));
  }
  getLocalStorage() {
    this.userStorage = JSON.parse(localStorage.getItem('user'));
  }

  already() {
    if (localStorage.getItem('user')) {
      this.getLocalStorage();
      this.setUserState(this.userStorage.username, this.userStorage.token.access_token, true);
      return;
    } else {
      return;
    }
  }

  getRecipes(): void {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.addRecipeToState(recipes);


    });
  }
}
