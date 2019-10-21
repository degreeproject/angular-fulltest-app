import { Component, OnInit, Input } from '@angular/core';
import { RecipePageService } from '../recipe-page.service';
import { UserState } from 'src/app/models/userState.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  /**
   * @param recipeService Injecting the RecipePageService into the constructor.
   */
  constructor(private recipeService: RecipePageService) {
  }

  /**
   * Passed variables from recipe-page component.
   * @comments The comments for the current recipe.
   * @user The data for the logged in user, undefined if user is not logged in.
   * @recipeId The id associated with the current recipe.
   */
  @Input() comments: any;
  @Input() user: UserState;
  @Input() recipeId: string;


  ngOnInit() {
  }
  /**
   * Checks if the user is logged in
   */
  isLoggedIn() {
    if (typeof(this.user) === 'undefined') {
      return false;
    } else {
      return this.user[0].loggedIn;
    }
  }

  /**
   * Creating a comment object and sends it to the recipeService.
   * The comment is then appended to the @comments array.
   * @param formInput The comment that the user entered.
   */
  submitForm(formInput) {
    const comment = {
      commentator: this.user[0].username,
      comment: formInput.comment,
      recipe: this.recipeId
    };
    this.recipeService.postRecipeComment(comment).subscribe(res => {
      this.comments = this.comments.concat({
        commentator: this.user[0].username,
        comment: formInput.comment,
      });
    },
    error => {
    });
  }
}
