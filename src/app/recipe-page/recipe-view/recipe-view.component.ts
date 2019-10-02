import { Component, OnInit } from '@angular/core';
import { RecipePageService } from '../recipe-page.service';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {

  constructor(private recipeService: RecipePageService) { }

  recipes: any[] = [];
  currentRecipe = 0;
  isLoaded = false;

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.isLoaded = true;
      console.log(recipes);
    },
    error => {
      console.log(error);
    }
    );
  }
}
