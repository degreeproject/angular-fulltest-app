import { Component, OnInit } from '@angular/core';
import { RecipePageService } from '../recipe-page.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {

  constructor(private recipeService: RecipePageService, private route: ActivatedRoute, private store: Store<AppState>) {

    store.select('recipeState').subscribe(recipe => {
      this.recipes = recipe[0];
    });
  }

  recipes: any = [];
  currentRecipe = 0;
  isLoaded = false;

  showState() {
    console.log(this.recipes);
  }

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
