import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  constructor(private appService: AppService) { }

  recipes: any[] = [];
  currentRecipe = 0;
  isLoaded = false;

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes(): void {
    this.appService.getRecipes().subscribe(recipes => (this.recipes = recipes, this.isLoaded = true));
  }
}
