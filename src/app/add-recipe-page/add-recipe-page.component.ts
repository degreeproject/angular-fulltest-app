import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RecipeModel } from './../models/recipe.model';
import { IngredientModel } from '../models/ingredient.model';
import { StepModel } from '../models/step.model';
import { RecipePageService } from '../recipe-page/recipe-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe-page',
  templateUrl: './add-recipe-page.component.html',
  styleUrls: ['./add-recipe-page.component.css']
})
export class AddRecipePageComponent implements OnInit {

  ingredient = new IngredientModel();
  step = new StepModel();

  ingredientArray = [];
  stepArray = [];

    constructor(private recipeService: RecipePageService, private router: Router) {}

   ngOnInit() {
     this.ingredientArray.push(this.ingredient);
     this.stepArray.push(this.step);
   }

   addIngredient() {
     this.ingredient = new IngredientModel();
     this.ingredientArray.push(this.ingredient);
   }
   removeIngredient(index: number) {
    this.ingredientArray = this.ingredientArray.filter((value, i) => index !== i);
   }
   addStep() {
     this.step = new StepModel();
     this.stepArray.push(this.step);
   }
   removeStep(index: number) {
     this.stepArray = this.stepArray.filter((value, i) => index !== i);
   }

  submitForm(value: any) {
    const recipe = {
      name: value.recipename,
      description: value.description,
      image: value.image,
      ingredient: this.ingredientArray,
      step: this.stepArray,
      notes: value.notes
    };
    const recipe2 = JSON.stringify(recipe);
    this.recipeService.postRecipe(recipe).subscribe(res => {
      this.router.navigate(['/login']);
    },
    error => {
    }
    );
  }


}
