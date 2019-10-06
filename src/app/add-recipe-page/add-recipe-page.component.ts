import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RecipeModel } from './../models/recipe.model';
import { IngredientModel } from '../models/ingredient.model';
import { StepModel } from '../models/step.model';
import { RecipePageService } from '../recipe-page/recipe-page.service';

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

    constructor(private recipeService: RecipePageService) {}

   ngOnInit() {
     this.ingredientArray.push(this.ingredient);
     this.stepArray.push(this.step);
   }

   addIngredient() {
     this.ingredient = new IngredientModel();
     this.ingredientArray.push(this.ingredient);
   }
   removeIngredient(index: number) {
    this.ingredientArray.splice(index);
   }
   addStep() {
     this.step = new StepModel();
     this.stepArray.push(this.step);
   }
   removeStep(index: number) {
     this.stepArray.splice(index);
   }

  submitForm(value: any) {
    console.log(value);
    console.log(value.recipename);
    console.log(this.ingredientArray);
    console.log(this.stepArray);
    const recipe = {
      name: value.recipename,
      description: value.description,
      image: value.image,
      ingredient: this.ingredientArray,
      step: this.stepArray
    };
    const recipe2 = JSON.stringify(recipe);
    console.log(recipe);
    console.log(JSON.stringify(recipe));
    console.log(JSON.parse(recipe2));
    this.recipeService.postRecipe(recipe).subscribe(res => {
      console.log(res);
    },
    error => {
      console.log('error:' + error);
    }
    );
  }


}
