import { Component, OnInit } from '@angular/core';
import { RecipePageService } from '../recipe-page.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { UserState } from 'src/app/models/userState.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

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
  isLoaded = false;

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
  isLoggedIn() {
    if (typeof(this.stateUser[0]) === 'undefined') {
      return false;
    } else {
      return this.stateUser[0].loggedIn;
    }
  }
  submitForm(value) {
    console.log(value);
    console.log(this.stateUser);
    const comment = {
      commentator: this.stateUser[0].username,
      comment: value.comment
    };
    this.recipeService.postRecipeComment(comment).subscribe(res => {
      console.log(res);
    },
    error => {
      console.log('error' + error);
    });
    console.log(comment);
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
