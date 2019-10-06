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
  recipe: any = [];
  currentRecipe;
  isLoaded = false;

  showState() {
    console.log(this.recipes);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (this.recipes) {
      this.recipe = this.recipes.find((ele) => {
        return ele.id === id;
      });
    }

    if (typeof(this.recipes) === 'undefined') {
      this.getRecipe(id);
    } else {
      this.isLoaded = true;
    }
  }

  getRecipe(id: string): void {
    this.recipeService.getRecipe(id).subscribe(recipes => {
      this.recipe = recipes;
      this.isLoaded = true;
    },
    error => {
      console.log('You dont have access');
    });
  }
}
