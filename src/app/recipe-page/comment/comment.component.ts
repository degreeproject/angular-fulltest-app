import { Component, OnInit, Input } from '@angular/core';
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
  }
  @Input() comments: any;
  @Input() user: UserState;


  ngOnInit() {
  }
  isLoggedIn() {
    if (typeof(this.user) === 'undefined') {
      return false;
    } else {
      return this.user[0].loggedIn;
    }
  }
  submitForm(value) {
    const comment = {
      commentator: this.user[0].username,
      comment: value.comment,
      recipe: this.comments.id
    };
    this.recipeService.postRecipeComment(comment).subscribe(res => {
      this.comments = this.comments.concat({
        commentator: this.user[0].username,
        comment: value.comment,
      });
    },
    error => {
    });
  }
}
