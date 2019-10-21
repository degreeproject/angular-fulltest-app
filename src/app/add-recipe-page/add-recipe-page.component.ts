import { Component, OnInit } from '@angular/core';
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

  /**
   * @param recipeService Injecting the RecipePageService into the constructor.
   * @param route Injecting the ActivatedRoute into the constructor.
   */
    constructor(private recipeService: RecipePageService, private router: Router) {}

   ngOnInit() {
     this.ingredientArray.push(this.ingredient);
     this.stepArray.push(this.step);
   }

   /**
    * adds an ingredient to the ingredientArray
    */
   addIngredient() {
     this.ingredient = new IngredientModel();
     this.ingredientArray.push(this.ingredient);
   }

   /**
    * Removes an ingredient from the ingredientArray
    */
   removeIngredient(index: number) {
    this.ingredientArray = this.ingredientArray.filter((value, i) => index !== i);
   }

   /**
    * adds a description step to the stepArray
    */
   addStep() {
     this.step = new StepModel();
     this.stepArray.push(this.step);
   }
   /**
    * Removes an description step from the stepArray
    */
   removeStep(index: number) {
     this.stepArray = this.stepArray.filter((value, i) => index !== i);
   }

   /**
    * Sends a recipe to postRecipe in recipeService
    * @param value The recipe from the from
    */
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
