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

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (this.recipes) {
      this.recipe = this.recipes.find((ele) => {
        return ele.id === id;
      });
    }
    if (typeof(this.recipes) === 'undefined') {
      this.getRecipe(id);
    }
  }

  getRecipe(id: string): void {
    this.recipeService.getRecipe(id).subscribe(recipes => {
      this.recipe = recipes;
    },
    error => {
    });
  }

}
