import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipePageService {

  /**
   * @param http Injecting the HttpClient into the constructor.
   */
  constructor(private http: HttpClient) { }

  reqHeader = new HttpHeaders({'No-Auth': 'true'});

  /**
   * Get all recipes from the server api "api/recipe", the header means no login needed.
   */
  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>('api/recipe' , {headers: this.reqHeader});
  }

  /**
   * Get a specific recipe from the server api "api/recipe/id", the header means no login needed.
   * @param id The id of the requested recipe
   */
  getRecipe(id: any): Observable<any[]> {
    return this.http.get<any[]>('api/recipe/' + id  , {headers: this.reqHeader});
  }

  /**
   * Post a recipe to the server api "api/recipe".
   * @param recipe the recipe data that should be posted.
   */
  postRecipe(recipe: any): Observable<any> {
    return this.http.post<any>('api/recipe', recipe);
  }
  /**
   * Post a comment to the server api "api/recipe/comment".
   * @param comment The comment data that should be posted.
   */
  postRecipeComment(comment: any): Observable<any> {
    return this.http.post<any>('api/recipe/comment', comment);
  }
}
