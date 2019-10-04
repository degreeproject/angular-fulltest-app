import { Component, OnInit } from '@angular/core';
import { RecipePageService } from '../recipe-page/recipe-page.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.states';

@Component({
  selector: 'app-recipe-collection-page',
  templateUrl: './recipe-collection-page.component.html',
  styleUrls: ['./recipe-collection-page.component.css']
})
export class RecipeCollectionPageComponent implements OnInit {

  constructor(private recipeService: RecipePageService, private store: Store<AppState>) {

    store.select('recipeState').subscribe(recipe => {
      this.recipes = recipe[0];
    });
  }

  recipes: any[];
  isLoaded = false;
  ngOnInit() {
    if (typeof(this.recipes) === 'undefined') {
      this.getRecipes();
    } else {
      this.isLoaded = true;
    }
  }

  getRecipes(): void {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.isLoaded = true;
    },
    error => {
      console.log('You dont have access');
    }
    );
  }

}
